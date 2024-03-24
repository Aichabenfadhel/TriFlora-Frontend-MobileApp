import React from "react";
import "./cards.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { RiHeartAddLine } from "react-icons/ri";
import productImg from "../../assets/images/lavender.jpg"

const Cards: React.FC = () => {
  return (
    <>
      <IonCard className="card">
        <div className="enteteContainer">
          <div className="imgContainer">
          <img
            alt="plant name"
            src={productImg}
          />
          </div>
          <div className="iconContainer">
            <RiHeartAddLine className="icon" />
            
          </div>
        </div>
        <IonCardHeader>
          <IonCardSubtitle className="priceContainer">
            Price : 35 DT
          </IonCardSubtitle>
          <IonCardTitle className="titleContainer">Lavender Plant</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>Here is a small text description for the card content...</IonCardContent>
        <div className="btnContainer">
        <IonButton fill="clear" className="favBTN">Add To Favorites</IonButton>
        <IonButton className="cardBTN">Add To Cart</IonButton>
        </div>
      </IonCard>
    </>
  );
};

export default Cards;
