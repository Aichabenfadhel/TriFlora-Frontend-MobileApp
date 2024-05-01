import React, { useEffect, useState } from "react";
import { IonAlert, IonContent, IonPage } from "@ionic/react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import axios from "axios";
import Header from "../components/header/header";
import { productsType } from "../Modals/products";

import "./Home.css";
import { useHistory } from "react-router";
import { useCart } from "../provider/cart";
import { Link } from "react-router-dom";
import { AuthContextType, useAuth } from "../provider/auth";
import { useFavorites } from "../provider/favorite";


const Home: React.FC = () => {

  const history = useHistory();
  const { cart,addToCart,getCartData } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [loading,setLoading]=useState(false)
  const [products, setProducts] = useState<productsType[]>([]);
  const auth: AuthContextType = useAuth();
  const {favorites,addToFavorites}=useFavorites();

  

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/`
      );
      setLoading(false)
      
      setProducts(data.data);
    } catch (error) {
      setLoading(false)
      console.log(error);
      // toast.error("Something went wrong");
    }
  };


  


  const addItemToCart = async (p:productsType,productId:string,quantity:any,price:number,title:string,imageCover:string) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/cart/${auth?.user?._id}`,{
            productId,
            quantity,
            price,
            title,
            imageCover
        }
      );
      
      
      if (data?.success) {
        console.log("item added successfully");
        addToCart(p._id,p.price,p.title,p.imageCover);
        // localStorage.setItem('cart',JSON.stringify([...cart,p])) ;
         setIsOpen(true);
      } else {
        console.log("Error in creating cart");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    
      getAllProducts();
    
  }, []);
  useEffect(() => {
    
    getCartData()
  
}, [cart]);

  return (
    <IonPage>
      <Header></Header>
      <IonContent >
      
      <h1>All Products</h1>
      <div className="cont">
        {products?.map((p) => (
          <IonCard className="card" key={p._id}>
            <div className="enteteContainer">
              <div className="imgContainer">
                <img className="card-img-top" alt={p.title} 
                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`} 
                />
              </div>
             
            </div>
            <div className="cardDetails">
            <IonCardHeader>
              <IonCardTitle className="titleContainer">{p.title}</IonCardTitle>
             
              <IonCardSubtitle className="priceContainer">
                Price : {p.price}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{p.description.substring(0,30)}...
              
              <IonButton  size="small" fill="clear" className="detailsBTN" 
               onClick={()=>{history.push(`/product-details/${p._id}`
               ) 
               }}>
                More DeTails
                </IonButton>
              
            </IonCardContent>
            <div className="btnContainer">
              <IonButton fill="clear" className="favBTN" onClick={()=>addToFavorites}>
                Add To Favorites
              </IonButton>
              <IonButton id="present-alert" className="cardBTN" onClick={() => addItemToCart(p,p._id,p.quantity,p.price,p.title,p.imageCover)}>Add To Cart</IonButton>
               <IonAlert
                    trigger="present-alert"
                    isOpen={isOpen}
                    header="Product Added Successfully"
                    message="Check your shopping list and add more."
                    buttons={['Ok']}
                    onDidDismiss={() => setIsOpen(false)}
                ></IonAlert>
            </div>
            </div>
          </IonCard>
          
         
        ))}
          
      </div>
      
      </IonContent>
     
    </IonPage>
  );
};

export default Home;
