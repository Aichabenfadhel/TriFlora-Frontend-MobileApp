import React from "react";
import { useCart } from "../../components/cart/cart";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
  } from '@ionic/react';
  import "./cartPage.css"
import { BsArrowLeft } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { FcFullTrash } from "react-icons/fc";

const CartPage: React.FC = () => {
  const { cart, addToCart } = useCart();

  const handleRemoveFromCart = (productId: string) => {
    // Implement removing item from cart
  };

  const handleIncrementQuantity = (productId: string) => {
    const quant=1;
  };

  const handleDecrementQuantity = (productId: string) => {
    // Implement decrementing item quantity
  };
  console.log("this is ther cart", cart);
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
        <IonButton slot="start" href="/home" fill="clear" className="backArrow">
        <BsArrowLeft className="backArrow" />
        </IonButton>
        <IonTitle className="logo">
        {" "}
        <PiPlantFill />
        TriFlora
      </IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Shopping Cart</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <IonList>
                {cart.map((item, index) => (
                  <IonItem key={index}>
                    <IonThumbnail slot="start" >
                      <img alt={item.product?.title || ''} src={item.product?.imageURL || ''} />
                    </IonThumbnail>
                    <IonLabel>{item.product?.title || ''}</IonLabel>
                    <div className="detailsCont">
                    <p className="priceCont">Price: {item.product?.price}</p>
                    <div className="quantityContainer">
                    <p>Quantity: </p>
                    <IonButton className="quantBTN" fill="clear"  onClick={() => handleIncrementQuantity(item.product?.id)}>+</IonButton>
                      <span>{item.quantity}</span>
        
                    <IonButton className="quantBTN" fill="clear" onClick={() => handleDecrementQuantity(item.product?.id)}>-</IonButton>
                    </div>
                    </div>
                    <IonButton className="trashBTN" fill="clear" onClick={() => handleRemoveFromCart(item.product?.id)}>
                    <FcFullTrash />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            )}
            <IonButton>Checkout</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
