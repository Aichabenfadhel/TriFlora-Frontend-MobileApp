import React from "react";
import "./footer.css";
import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { BsBasket2Fill, BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

const Footer: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" className="btn">
        <AiFillHome className="icons" />
        <IonLabel className="btn">Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="basket" href="" className="btn">
        <BsBasket2Fill className="icons" />
        <IonLabel className="btn">Basket</IonLabel>
      </IonTabButton>
      <IonTabButton tab="favorite" href="" className="btn">
        <MdFavorite className="icons" />
        <IonLabel className="btn">Favorite</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="" className="btn">
        <BsPersonFill className="icons" />
        <IonLabel className="btn">Profile</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Footer;
