import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { productsType } from "../../Modals/products";
import axios from 'axios';

interface CartItem {
    product: productsType;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: productsType) => void;
    removeFromCart: (product: productsType) => void;
    incrementQuantity: (product: productsType) => void;
    decrementQuantity: (product: productsType) => void;
    getCartData: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: (product: productsType) => { throw new Error('addToCart must be implemented'); } ,
    removeFromCart: (product: productsType) => { throw new Error('removeFromCart must be implemented'); },
    incrementQuantity: (product: productsType) => { throw new Error('incrementQuantity must be implemented'); },
    decrementQuantity: (product: productsType) => { throw new Error('decrementQuantity must be implemented'); },
    getCartData: () => { throw new Error('getCartData must be implemented'); },
});

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = async(product: productsType) => {
        const existingItem = await cart.find(item => item.product._id === product._id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { product, quantity: 1 }]);
            
        }
        
    };

    const removeFromCart = async (product: productsType) => {
        
        try {
         
          
          const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/cart/${product}`)
          
          const updatedCart = cart.filter(item => item.product._id !== product._id);
          
          
        setCart(updatedCart);
        } catch (error) {
          console.error(error)
        }
    };

    const incrementQuantity = (product:productsType) => {
        const updatedCart = cart.map(item => {
          if (item.product._id === product._id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updatedCart);
      };

      const decrementQuantity = (product:productsType) => {
        const updatedCart = cart.map(item => {
          if (item.product._id === product._id) {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) {
                item.quantity=0;
                
            } else {
              return { ...item, quantity: newQuantity };
            }
          }
          
          return item;
        }).filter(Boolean); 
        setCart(updatedCart)
      };

      const getCartData = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/cart/`);
          
          
          const cartData = response?.data.data; 
          console.log(cartData.cartItems);
          
          setCart(cartData.cartItems);
        } catch (error) {
          console.error('Error fetching cart data:', error);
          
        }
      };


    return (
        <CartContext.Provider value={{ cart, addToCart,removeFromCart,incrementQuantity,decrementQuantity,getCartData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
