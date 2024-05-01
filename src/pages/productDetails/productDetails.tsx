import React, { useEffect, useState } from "react";
import { PiPlantFill } from "react-icons/pi";

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router";
import {  productsType } from "../../Modals/products";
import "./productDetails.css"
import { BsArrowLeft } from "react-icons/bs";
import { useCart } from "../../provider/cart";
import axios from "axios";




const ProductDetails: React.FC = () => {

  const  {id}: { id: string } = useParams();
  const { cart,addToCart } = useCart();
  const [ quant,setQuant]=useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [product,setProduct]=useState<productsType>()


  const getProduct=async()=>{
    try {
      
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/products/${id}`
        );
        
        
       setProduct(data?.data)
          
      } catch (error) {
        console.log(error);
      }
}
  
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
useEffect(() => {
     getProduct();
  }, []);

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
          <img 
          src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}  alt={product.title} className="image" />
        </div>
        <div className="detailsContainer">
          
          <p><span className="spanContainer">Description :</span> {product.description}</p>
         <p><span className="spanContainer">Price :</span> {product.price} DT</p>
         <div className="quantityContainer">
         <h6>Quantity: </h6>
         <div className="btn-group">
      <button className="increment-btn" onClick={handleIncrementQuantity}>
        <span className="material-symbols-outlined">+</span>
      </button>
      <p>{quant}</p>
      <button className="decrement-btn" onClick={handleDecrementQuantity}>
        <span className="material-symbols-outlined">-</span>
      </button>
    </div>
         </div>
         <div className="btnContainer">
              <IonButton id="present-alert" fill="clear" className="favBTN">
                Add To Favorites
              </IonButton>
              <IonButton id="present-alert" className="cardBTN" onClick={() => {addToCart(product._id,product.price,product.title,product.imageCover);
              localStorage.setItem('cart',JSON.stringify([...cart,product])); setIsOpen(true)}} >Add To Cart</IonButton>
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
      </div>
    </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetails;
