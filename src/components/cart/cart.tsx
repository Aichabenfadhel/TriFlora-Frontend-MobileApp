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
    addToCart: () => {} 
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: productsType) => {
        const existingItem = cart.find(item => item.product.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
        }
    };

    useEffect(() => {
        const existingCartItem = localStorage.getItem('cart');
        if (existingCartItem) {
            setCart(JSON.parse(existingCartItem));
        }
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
