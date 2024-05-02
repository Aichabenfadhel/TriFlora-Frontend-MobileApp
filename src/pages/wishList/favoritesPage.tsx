import React, { useEffect, useState } from "react";

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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BsArrowLeft } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { FcFullTrash } from "react-icons/fc";
import { useHistory } from "react-router";
import { useFavorites } from "../../provider/favorite";
import "./favorites.css"

const FavouritePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {favorites,removeFromFavorites,removeAllFavorites} = useFavorites()
  const history = useHistory();
  


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
            <div className="favListHeaderCard">
              <IonCardTitle>Favorites List</IonCardTitle>
              <IonButton color="danger" className="DeletefavListBTN" onClick={() => setIsOpen(true)}>
                Delete All Items
              </IonButton>
              <IonAlert
                isOpen={isOpen}
                onDidDismiss={() => setIsOpen(false)}
                header={"Delete All Items"}
                message={"Are you sure you want to delete all items from your wish-List?"}
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
                      removeAllFavorites();
                    },
                  },
                ]}
              />
            </div>
          </IonCardHeader>
          <IonCardContent>
            {favorites.length === 0 ? (
              <p>Your wishList is empty.</p>
            ) : (
              <IonList>
                {favorites.map((item, index) => (
                  <IonItem key={index}>
                     <IonThumbnail slot="start">
                      <img
                        alt={item.title || ""}
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item._id}`}
                      />
                    </IonThumbnail>
                    <IonLabel>{item.title}</IonLabel>
                    <div className="favListdetailsCont">
                      <p className="favListpriceCont">Price: {item.price}</p>
                    </div>
                    <IonButton className="favListTrashBTN" fill="clear" 
                    onClick={() => (item && removeFromFavorites (item))}
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
