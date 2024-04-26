import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { productsType} from "../../Modals/products";
import axios from 'axios';

interface CartItem {
    price:number;
    product: string;
    quantity: number;
    title:string;
    imageCover:string;
    
}

interface CartContextType {
    cart: CartItem[];
    totalCartPrice: number;
    addToCart: (product: string,price:number,title:string,imageCover:string) => void;
    removeFromCart: (product: string) => void;
    incrementQuantity: (product: string) => void;
    decrementQuantity: (product: string) => void;
    getCartData: () => Promise<void>;
    deleteCartItems:()=>Promise<void>;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    totalCartPrice: 0,
    addToCart: (product: string , price:number,title:string,imageCover:string) => { throw new Error('addToCart must be implemented'); } ,
    removeFromCart: (product: string) => { throw new Error('removeFromCart must be implemented'); },
    incrementQuantity: (product: string) => { throw new Error('incrementQuantity must be implemented'); },
    decrementQuantity: (product: string) => { throw new Error('decrementQuantity must be implemented'); },
    getCartData: () => { throw new Error('getCartData must be implemented'); },
    deleteCartItems: () => { throw new Error('deleteCartItems must be implemented'); },
});


const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  

  const updateTotalCartPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    setTotalCartPrice(totalPrice);
};

// useEffect to update total cart price whenever cart changes
useEffect(() => {
    updateTotalCartPrice();
}, [cart]);

    const addToCart = async(product: string,price:number,title:string,imageCover:string) => {
        const existingItem = await cart.find(item => item.product === product);
        if (existingItem) {
            setCart(cart.map(item =>
                item.product === product ? { ...item, quantity: item.quantity + 1 } : item
            ));
             
        } else {
            setCart([...cart, { title,imageCover,price,product, quantity: 1 }]);
             
        }
        
    };

    const removeFromCart = async (product: string) => {
        
        try {
         
          
          const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/cart/${product}`)
          
          const updatedCart = cart.filter(item => item.product !== product);
          
          
        setCart(updatedCart);
         
        } catch (error) {
          console.error(error)
        }
    };

    const incrementQuantity =async (product:string) => {
      try {
        let newQuantity=1
        const updatedCart = cart.map(item => {
          if (item.product === product) {
            newQuantity=item.quantity+1;
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/cart/${product}`, { quantity: newQuantity });
        setCart(updatedCart);
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
        
         
      };

      const decrementQuantity = async(product:string) => {
        try {
          let newQuantity=1
          const updatedCart = cart.map(item => {
            if (item.product === product) {
              newQuantity = item.quantity - 1;
              if (newQuantity <= 0) {
                item.quantity=0;
                
              } else {
                return { ...item, quantity: newQuantity };
              }
            }
            
            return item;
          }).filter(Boolean); 
          setCart(updatedCart)
          const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/cart/${product}`, { quantity: newQuantity});
        } catch (error) {
          console.error('Error updating item quantity:', error);
        }
       
        
      };

      const getCartData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/cart/`);
            const cartData = response?.data.data;
    
            
            const populatedCartItems = await Promise.all(cartData.cartItems.map(async (item:any) => {
                const productResponse = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/${item.product}`);
                const productName = productResponse.data.data.title; 
                const productImage = productResponse.data.data.imageCover; 
                return { ...item, title: productName,imageCover:productImage };
            }));
            
    
            setCart(populatedCartItems);
            setTotalCartPrice(cartData.totalCartPrice)
            
            
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    
    const deleteCartItems=async()=>{
      try {
       
          const response = await axios.delete(`${process.env.REACT_APP_API}/api/v1/cart/`);
          setCart([]);
          setTotalCartPrice(0);
        
      } catch (error) {
        console.error('Error deleting all data items:', error);
      }
    }
 


    return (
        <CartContext.Provider value={{ cart,totalCartPrice, addToCart,removeFromCart,incrementQuantity,decrementQuantity,getCartData,deleteCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
