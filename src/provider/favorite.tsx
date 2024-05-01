import React, { ReactNode, createContext, useContext, useState } from "react";
import { productsType } from "../Modals/products";



interface FavoritesContextType {
  favorites: productsType[];
  addToFavorites: (product: productsType) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);


export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};


export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children })  => {
  const [favorites, setFavorites] = useState<productsType[]>([]);

  
  const addToFavorites =async (product: productsType) => {
   
 
    const existingItem = await favorites.find(item => item._id === product._id);
    if (existingItem) {
        setFavorites(favorites.map(item =>
            item._id === product._id ? { ...item } : item
        ));
         
    } else {
        setFavorites([...favorites,product]);
         
    }
  };

  const contextValue: FavoritesContextType = {
    favorites,
    addToFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
