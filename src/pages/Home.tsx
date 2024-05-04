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

import { AuthContextType, useAuth } from "../provider/auth";
import { useFavorites } from "../provider/favorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";


const Home: React.FC = () => {

  const history = useHistory();
  const { cart,addToCart,getCartData } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFav, setIsOpenFav] = useState(false);
  const [loading,setLoading]=useState(false)
  const [products, setProducts] = useState<productsType[]>([]);
  const auth: AuthContextType = useAuth();
  const {addToFavorites}=useFavorites();



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


  const addItemToFavoritesList = async(product:productsType)=>{
    try {
      await addToFavorites(product)
      setIsOpenFav(true)
    } catch (error) {
      console.log(error);
      
    }
  }

  


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
  
}, []);

  return (
    <IonPage>
      <Header></Header>
      <IonContent >
      
      <h1>All Products</h1>
      <div className="cont">
        {products?.map((p) => (
          <IonCard className="card" key={p._id}  onClick={()=>{history.push(`/product-details/${p._id}`
        ) 
        }} >
            <div className="enteteContainer">
            
            <IonAlert
                    trigger="FavAlert"
                    isOpen={isOpenFav}
                    header="Product Added Successfully"
                    message="Check your wish-list and add more."
                    buttons={['Ok']}
                    onDidDismiss={() => setIsOpenFav(false)}
                ></IonAlert>
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
            <div className="cardFooter">
              
              {/* <IonButton  size="small" fill="clear" className="detailsBTN" 
               onClick={()=>{history.push(`/product-details/${p._id}`
               ) 
               }}>
                More DeTails
                </IonButton> */}
                <div className="iconsContainer">
                <FontAwesomeIcon className="iconCard" icon={faCartPlus} size="xl" onClick={() => addItemToCart(p,p._id,p.quantity,p.price,p.title,p.imageCover)}/>
                <FontAwesomeIcon id="FavAlert" className="iconCard" size="xl" icon={faHeart} onClick={()=>addItemToFavoritesList(p)} />
              </div>
              
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
