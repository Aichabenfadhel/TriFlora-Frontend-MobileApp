import React, { useEffect, useState } from "react";
import { useCart } from "../../provider/cart";
import { AuthContextType, useAuth } from "../../provider/auth";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BsArrowLeft } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { FcFullTrash } from "react-icons/fc";
import { productsType } from "../../Modals/products";
import "../cartPage/cartPage.css";
import { useHistory } from "react-router";

const FavouritePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const [user, setUser] = useState(auth?.user?._id);
  const [favList, setFavList] = useState<productsType[]>([]);
  const history = useHistory();
  

  useEffect(() => {
    
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavList(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites = (productId: string) => {
   
    const updatedFavorites = favList.filter((item) => item._id !== productId);
    setFavList(updatedFavorites);
    
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const userId = auth?.user?._id;
    setUser(userId);
  }, [auth?.user]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start"  fill="clear" className="backArrow" onClick={()=>history.push('/home')}>
            <BsArrowLeft className="backArrow" />
          </IonButton>
          <IonTitle className="logo">
            <PiPlantFill /> TriFlora
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <div className="cartHeaderCard">
              <IonCardTitle>Favorites List</IonCardTitle>
              <IonButton color="danger" className="DeleteCartBTN" onClick={() => setIsOpen(true)}>
                Delete All Items
              </IonButton>
              <IonAlert
                isOpen={isOpen}
                onDidDismiss={() => setIsOpen(false)}
                header={"Delete All Items"}
                message={"Are you sure you want to delete all items from your favorite List?"}
                buttons={[
                  {
                    text: "Cancel",
                    role: "cancel",
                    handler: () => {
                      console.log("Cancelled");
                    },
                  },
                  {
                    text: "Delete",
                    handler: () => {
                      // Handle delete
                    },
                  },
                ]}
              />
            </div>
          </IonCardHeader>
          <IonCardContent>
            {favList.length === 0 ? (
              <p>Your wishList is empty.</p>
            ) : (
              <IonList>
                {favList.map((item, index) => (
                  <IonItem key={index}>
                    <img slot="start" src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item._id}`} />
                    <IonLabel>{item?.title}</IonLabel>
                    <div className="detailsCont">
                      <p className="priceCont">Price: {item?.price}</p>
                    </div>
                    <IonButton className="trashBTN" fill="clear" 
                    onClick={() => (item && removeFromFavorites (item._id))}
                    >
                      <FcFullTrash />
                    </IonButton>
                  </IonItem>
                ))}
              </IonList>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default FavouritePage;
