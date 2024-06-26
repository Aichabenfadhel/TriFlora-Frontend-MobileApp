import React, { useEffect, useState } from "react";
import { useCart } from "../../provider/cart";
import {
  IonAlert,
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
import { AuthContextType, useAuth } from "../../provider/auth";
import { useHistory } from "react-router";
const CartPage: React.FC = () => {
  const {
    cart,
    totalCartPrice,
    addToCart,
    getCartData,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    deleteCartItems
  } = useCart();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const auth: AuthContextType = useAuth();
  const [user,setUser]=useState(auth?.user?._id)
  // const totalPayment = (): number => {
  //   if (!cart || cart.length === 0) {
  //     return 0;
  //   }

  //   let ptotal = 0;
  //   cart.forEach((item) => {
  //     const price = item.price;
  //     if (!isNaN(price)) {
  //       ptotal = ptotal + price * item.quantity;
  //     }
  //   });
    
  //   setTotal(ptotal);
  //   return ptotal;
  // };
  const history = useHistory();

useEffect(()=>{
  getCartData();
},[cart])
useEffect(()=>{
  const userId = auth?.user?._id
  setUser(userId)
},[auth?.user])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            slot="start"
            onClick={()=>history.push("/home")}
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
          <IonCardHeader >
            <div className="cartHeaderCard">

            <IonCardTitle>Shopping Cart</IonCardTitle>
            <IonButton color="danger" 
                    className="DeleteCartBTN" 
                    onClick={()=>setIsOpen(true)}
                    >
                      Delete All Items
                </IonButton>
                <IonAlert
    isOpen={isOpen}
    onDidDismiss={() => setIsOpen(false)}
    header={'Delete All Items'}
    message={'Are you sure you want to delete all items from your cart?'}
    buttons={[
        {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
                console.log('Cancelled');
            }
        },
        {
            text: 'Delete',
            handler: () => {
                
                deleteCartItems();
            }
        }
    ]}
/>
</div>
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
                        alt={item.title || ""}
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item.product}`}
                      />
                    </IonThumbnail>
                    <IonLabel>{item?.title}</IonLabel>
                    <div className="detailsCont">
                      <p className="priceCont">Price: {item?.price}</p>
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
            
            <h2>Total Payement : {totalCartPrice} DT</h2>
             

          </IonCardContent>
        </IonCard>
          <button className="button-50" role="button">Pay Now</button>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
