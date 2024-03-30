import React, { useState } from "react";
import { PiPlantFill } from "react-icons/pi";

import {
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import { products } from "../../Modals/products";
import "./productDetails.css"
import { BsArrowLeft } from "react-icons/bs";
import { useCart } from "../../components/cart/cart";




const ProductDetails: React.FC = () => {

  const  {id}: { id: string } = useParams();
  const { cart,addToCart } = useCart();
  const [ quant,setQuant]=useState(1);

  const product = products.find((p) => p.id === id);
  
  const handleIncrementQuantity = ()=>{
      const quantity=quant+1;
      setQuant(quantity);
  }
  const handleDecrementQuantity = ()=>{
      if(quant>1){
        const quantity=quant-1;
        setQuant(quantity);
      }else if(quant==1){
        setQuant(1);
      }
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

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
      <div className="productDetailsContainer">
      <h1 className="title">{product.title}</h1>
      <div className="container">
        <div className="imageContainer">
          <img src={product.imageURL} alt={product.title} className="image" />
        </div>
        <div className="detailsContainer">
          
          <p><span className="spanContainer">Description :</span> {product.description}</p>
         <p><span className="spanContainer">Price :</span> {product.price}</p>
         <div className="quantityContainer">
         <h6>Quantity: </h6>
         <IonButton fill="clear" className="quantBTN" onClick={handleDecrementQuantity}>-</IonButton>
         <span>{quant}</span>
         <IonButton fill="clear" className="quantBTN" onClick={handleIncrementQuantity}>+</IonButton>
         </div>
         <div className="btnContainer">
              <IonButton fill="clear" className="favBTN">
                Add To Favorites
              </IonButton>
              <IonButton className="cardBTN" onClick={() => {addToCart(product);
              localStorage.setItem('cart',JSON.stringify([...cart,product]))}} >Add To Cart</IonButton>
            </div>
        </div>
      </div>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetails;
