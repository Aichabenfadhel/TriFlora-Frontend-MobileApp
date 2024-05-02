import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { productsType } from "../Modals/products";
import { Storage } from '@capacitor/storage';




interface FavoritesContextType {
  favorites: productsType[];
  addToFavorites: (product: productsType) => void;
  removeFromFavorites:(product: productsType) => void;
  removeAllFavorites:()=>void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addToFavorites: () => { throw new Error('addToFavorites must be implemented'); },
  removeFromFavorites: () => { throw new Error('REMOVEfROMFAV must be implemented'); },
  removeAllFavorites:()=>{ throw new Error('RemoveAllFavorites must be implemented'); }
});

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<productsType[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const { value } = await Storage.get({ key: 'favorites' });
      if (value) {
        setFavorites(JSON.parse(value));
      }
    };
    loadFavorites();
  }, []);

  
  useEffect(() => {
    const saveFavorites = async () => {
      await Storage.set({ key: 'favorites', value: JSON.stringify(favorites) });
    };
    saveFavorites();
  }, [favorites]);

  const addToFavorites = (product: productsType) => {
    const existingItem = favorites.find(item => item._id === product._id);
    if (!existingItem) {
      setFavorites([...favorites, product]);
    }
    
  };

  const removeFromFavorites = (product: productsType) => {
   
    const updatedFavorites = favorites.filter((item) => item._id !== product._id);
    setFavorites(updatedFavorites);
    
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeAllFavorites = () => {
    setFavorites([]);
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    removeAllFavorites
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
