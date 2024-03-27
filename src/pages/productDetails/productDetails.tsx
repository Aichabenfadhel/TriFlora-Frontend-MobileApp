import React from "react";

import {
  IonContent,
} from "@ionic/react";
import { useParams } from "react-router";
import { products } from "../../Modals/products";




const ProductDetails: React.FC = () => {

  const  {id}: { id: string } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <>
      <IonContent>
      <div>
      <h1>{product.title}</h1>
      <img src={product.imageURL} alt={product.title} />
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
      </IonContent>
    </>
  );
};

export default ProductDetails;
