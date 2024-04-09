import React, { useEffect, useState } from "react";
import { useCart } from "../../components/cart/cart";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
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
} from "@ionic/react";
import "./cartPage.css";
import { BsArrowLeft } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { FcFullTrash } from "react-icons/fc";
import { productsType } from "../../Modals/products";

const CartPage: React.FC = () => {
  const {
    cart,
    addToCart,
    getCartData,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const totalPayment = (): number => {
    if (!cart || cart.length === 0) {
      return 0;
    }

    let ptotal = 0;
    cart.forEach((item) => {
      const price = parseFloat(item.product.price);
      if (!isNaN(price)) {
        ptotal = ptotal + price * item.quantity;
      }
    });
    return ptotal;
    setTotal(ptotal);
  };


useEffect(()=>{
  getCartData();
},[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            slot="start"
            href="/home"
            fill="clear"
            className="backArrow"
          >
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
                    <IonThumbnail slot="start">
                      <img
                        alt={item.product?.title || ""}
                        src={item.product?.imageCover || ""}
                      />
                    </IonThumbnail>
                    <IonLabel>{item.product?.title || ""}</IonLabel>
                    <div className="detailsCont">
                      <p className="priceCont">Price: {item.product?.price}</p>
                      <div className="quantityContainer">
                        <p>Quantity: </p>
                        <IonButton
                          className="quantBTN"
                          fill="clear"
                          onClick={() => {
                            incrementQuantity(item.product);
                          }}
                        >
                          +
                        </IonButton>
                        <span>{item.quantity}</span>

                        <IonButton
                          className="quantBTN"
                          fill="clear"
                          onClick={() => decrementQuantity(item.product)}
                        >
                          -
                        </IonButton>
                      </div>
                    </div>
                    <IonButton
                      className="trashBTN"
                      fill="clear"
                      onClick={() =>{ item.product && removeFromCart(item.product) }}
                    >
                      <FcFullTrash />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            )}
            
            <h2>Total Payement : {totalPayment()} DT</h2>
          <IonButton color="danger" className="DeleteCartBTN">Delete All Items</IonButton>
          
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
