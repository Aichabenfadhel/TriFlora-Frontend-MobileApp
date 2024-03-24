import React from "react";
import { IonContent, IonItem, IonLabel, IonList, IonThumbnail } from "@ionic/react";
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

import { RiHeartAddLine } from "react-icons/ri";

const Home: React.FC = () => {
  return (
    <>
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
              <div className="iconContainer">
                <RiHeartAddLine className="icon" />
              </div>
            </div>
            <div className="cardDetails">
            <IonCardHeader>
              <IonCardTitle className="titleContainer">{p.title}</IonCardTitle>
              <IonCardSubtitle className="priceContainer">
                Price : {p.price}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{p.description.substring(0,30)}...</IonCardContent>
            <div className="btnContainer">
              <IonButton fill="clear" className="favBTN">
                Add To Favorites
              </IonButton>
              <IonButton className="cardBTN">Add To Cart</IonButton>
            </div>
            </div>
          </IonCard>
          
         
        ))}
          
      </div>
      
      </IonContent>
     
    </>
  );
};

export default Home;
