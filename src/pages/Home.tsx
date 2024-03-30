import React from "react";
import { IonContent, IonPage } from "@ionic/react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import Header from "../components/header/header";
import { products } from "../Modals/products";

import "./Home.css";
import { useHistory } from "react-router";
import { useCart } from "../components/cart/cart";

const Home: React.FC = () => {

  const history = useHistory();
  const { cart,addToCart } = useCart();

  function goToProductDetails(): void {
    history.push("/product-details/:id");
  }

  return (
    <IonPage>
      <Header></Header>
      <IonContent >
      
      <h1>All Products</h1>
      <div className="cont">
        {products?.map((p) => (
          <IonCard className="card" key={p.id}>
            <div className="enteteContainer">
              <div className="imgContainer">
                <img className="card-img-top" alt={p.title} src={p.imageURL} />
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
              <IonButton size="small" fill="clear" className="detailsBTN" 
               onClick={()=>history.push(`/product-details/${p.id}`)}>
                More DeTails
                </IonButton>
            </IonCardContent>
            <div className="btnContainer">
              <IonButton fill="clear" className="favBTN">
                Add To Favorites
              </IonButton>
              <IonButton className="cardBTN" onClick={() => {addToCart(p);
              localStorage.setItem('cart',JSON.stringify([...cart,p]))}}>Add To Cart</IonButton>
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
