import React, { useEffect, useState } from "react";
import { PiPlantFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import profilePic from '../../../assets/images/profilePic.png';

import "./adminProfile.css"
import axios from "axios";
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { BsArrowLeft } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";





const AdminProfile: React.FC = () => {

 


  

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
        <div className="globalProfileCont">
        <div className="profileContainer">
            <div className="logOutItemDiv">
        <FontAwesomeIcon className="logOutItem" icon={faRightFromBracket} size="2xl" style={{color: "#633345",}} />
        </div>
            <div className="profileHeader">
                 <div className="profileImgCont">
                    <img src={profilePic}
                     alt="profilePic" />
                </div>
                     <h2>Welcome Foulen Fouleni</h2>
                <div className="settingsCont">
                <FontAwesomeIcon icon={faGear} spinPulse size="2xl" style={{color: "#633345",}} />
                </div>
            </div>
            <div className="profileDetailsCont">
            <h4><span>Admin Name :</span> Foulen Fouleni </h4>
           <h4><span>Admin Email :</span> foulen @gmail.com</h4>
           <h4><span>Admin Contact :</span> 44455 </h4>
            </div>
        </div>
        <IonButton id="present-alert" fill="clear" className="EditProfileBTN">
                Edit Profile
              </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminProfile;
