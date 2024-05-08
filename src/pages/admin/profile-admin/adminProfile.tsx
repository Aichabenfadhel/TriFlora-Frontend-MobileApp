import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { Storage } from '@capacitor/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { FaTrashCan } from "react-icons/fa6";

const sellerRequestStatusColors: { [key: string]: string } = {
  pending: 'yellow',
  approved: 'green',
  rejected: 'red'
};
const AdminProfile: React.FC = () => {
  const auth: AuthContextType = useAuth();
  const history = useHistory();
  const [photo, setPhoto] = useState<File|null>(null);
  const [photoCam, setPhotoCam] = useState<Photo|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', auth?.user?.name || '');
      formData.append('email', auth?.user?.email || '');
      
      
      if (photo instanceof File) {
        formData.append('photo', photo);
      }
      
      else if (photoCam && photoCam.path) {
        formData.append('photo', photoCam.path);
      }
  
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/users/${auth?.user?._id}`,
        formData
      );
      if (data?.error) {
        console.log(data?.error);
      } else {
        auth.setAuth({ ...auth, user: data?.data });
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
  
console.log("photo cam path ",photoCam?.path);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera 
      });

      setPhotoCam(image);
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };
 
  
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFile = () => {
    setPhoto(null);
    setPhotoCam(null); 
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleLogout = async () => {
    try {
      auth.setAuth({
        ...auth,
        user: null,
        token: "",
      });
      await Storage.remove({ key: 'user' });
      await Storage.remove({ key: 'token' });
      history.push('/');
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" onClick={() => history.push("/home")} fill="clear" className="backArrow">
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
                  <img src={`${process.env.REACT_APP_API}/api/v1/users/user-photo/${auth?.user?._id}`||profilePic} alt="profilePic" />
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
                {auth?.user?.role === 'seller' && (
                  <h4 style={{ color: sellerRequestStatusColors[auth?.user?.sellerRequestStatus ?? 'black'] }}>
                    <span>Request Status :</span> {auth?.user?.sellerRequestStatus ?? 'N/A'}
                  </h4>
                )}

                <h4>
                  <span>Admin Name :</span> {auth?.user?.name}
                </h4>
                <h4>
                  <span>Admin Email :</span> {auth?.user?.email}
                </h4>
              </div>

              <IonButton id="open-modal" fill="clear" className="EditProfileBTN">
                Edit Profile
              </IonButton>
              <IonModal ref={modal} trigger="open-modal">
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
                        type="text"
                        value={auth?.user?.name}
                      />
                    </IonItem>
                    <IonItem className="modalItem">
                      <IonInput
                        label="Your email"
                        labelPlacement="stacked"
                        type="text"
                        disabled
                        value={auth?.user?.email}
                      />
                    </IonItem>

                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        <input
                          type="file"
                          ref={inputRef}
                          className='importPhotoInput'
                          name="photo"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          style={{ display: "none" }}
                          hidden
                        />
                      </label>
                    </div>
                    <button className="file-btn" onClick={onChooseFile} style={{ display: photo ? 'none' : 'flex' }}>
                      <span className="material-symbols-rounded">Upload</span> Upload Picture
                    </button>
                    <IonButton className="detailsBTN" onClick={takePhoto}>Take Photo</IonButton>
                    <div className="mb-3">
 
  {(photo || photoCam) && (
    <div className="text-center">
     
      <img
        src={photo ? URL.createObjectURL(photo) : photoCam?.path}
        alt="product_photo"
        height={"200px"}
        className="img img-responsive"
      />
      <div className="selected-file">
        
        <p>{photo?.name || "Photo"}</p>
        
        {photo && (
          <button onClick={removeFile}>
            <span className="material-symbols-rounded">
              <FaTrashCan />
            </span>
          </button>
        )}
      </div> 
    </div>
  )}
</div>


                    <IonButton className="EditProfileBTN" fill="clear" onClick={handleSubmit}>
                      Confirm
                    </IonButton>
                  </div>
                </IonContent>
              </IonModal>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AdminProfile;

