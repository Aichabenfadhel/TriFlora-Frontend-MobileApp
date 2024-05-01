import React, { useEffect, useRef } from "react";
import { PiPlantFill } from "react-icons/pi";
import { BsArrowLeft } from "react-icons/bs";
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContextType, useAuth } from "../../../provider/auth";
import { useHistory } from "react-router-dom";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import profilePic from '../../../assets/images/profilePic.png';
import "./adminProfile.css";
import Login from "../../login/login";

const AdminProfile: React.FC = () => {
  const auth: AuthContextType = useAuth();
  const history = useHistory();

  const modal = useRef<HTMLIonModalElement>(null);
  const inputName = useRef<HTMLIonInputElement>(null);
  const inputEmail = useRef<HTMLIonInputElement>(null);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/users/${auth?.user?._id}`,
        { name: inputName.current?.value, email: inputEmail.current?.value }
      );
      if (data?.error) {
        console.log(data?.error);
      } else {
        auth.setAuth({ ...auth, user: data?.data});
        const lsString = localStorage.getItem("auth");
        if (lsString) {
          const ls = JSON.parse(lsString);
          ls.user = data?.data;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
        modal.current?.dismiss()
        history.push('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    try {
      auth.setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      localStorage.removeItem("cart");
      history.push('/');
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  useEffect(()=>{
    const email = auth?.user?.email
    const name= auth?.user?.name
  },[auth?.user])

  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButton slot="start" href="/home" fill="clear" className="backArrow">
          <BsArrowLeft className="backArrow" />
        </IonButton>
        <IonTitle className="logo">
          <PiPlantFill />
          TriFlora
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {auth.token ? (
        <div className="globalProfileCont">
          <div className="profileContainer">
            <div className="logOutItemDiv">
              <FontAwesomeIcon
                className="logOutItem"
                icon={faRightFromBracket}
                size="2xl"
                style={{ color: "#633345" }}
                onClick={handleLogout}
              />
            </div>
            <div className="profileHeader">
              <div className="profileImgCont">
                <img src={profilePic} alt="profilePic" />
              </div>
              <h2>Welcome </h2>
              <div className="settingsCont">
                <FontAwesomeIcon
                  icon={faGear}
                  spinPulse
                  size="2xl"
                  style={{ color: "#633345" }}
                />
              </div>
            </div>
            <div className="profileDetailsCont">
              <h4>
                <span>Admin Name :</span> {auth?.user?.name}{" "}
              </h4>
              <h4>
                <span>Admin Email :</span> {auth?.user?.email}
              </h4>
            </div>
          </div>
          <IonButton id="open-modal" fill="clear" className="EditProfileBTN">
            Edit Profile
          </IonButton>
          <IonModal ref={modal} trigger="open-modal" >
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonTitle>Edit Profile</IonTitle>
               
              </IonToolbar>
            </IonHeader>
            <IonContent className="modalContainer">
               <div className="modalContainer">
              <IonItem className="modalItem">
               
                <IonInput
                  label="Update your name"
                  labelPlacement="stacked"
                  ref={inputName}
                  type="text"
                  value={auth?.user?.name}
                />
               
              </IonItem>
              <IonItem className="modalItem">
                 <IonInput
                  label="Your email"
                  labelPlacement="stacked"
                  ref={inputEmail}
                  type="text"
                  disabled
                  value={auth?.user?.email}
                />
              </IonItem>
              <IonButton className="EditProfileBTN" fill="clear" onClick={() => handleSubmit()}>
                Confirm
              </IonButton>
              </div>
            </IonContent>
          </IonModal>
        </div>
      ) : (
        <Login />
      )}
    </IonContent>
  </IonPage>
  
  );
};

export default AdminProfile;
