import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { productsType } from "../../Modals/products";

interface CartItem {
    product: productsType;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: productsType) => void;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: (product: productsType) => { throw new Error('addToCart must be implemented'); } 
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async(product: productsType) => {
        const existingItem = await cart.find(item => item.product.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
            
        }
        
    };

  

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
