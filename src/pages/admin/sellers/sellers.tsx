import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './sellers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BsArrowLeft } from 'react-icons/bs';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from "react-router";
interface Seller {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

const AdminSellers: React.FC = () => {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [newSeller, setNewSeller] = useState<Seller>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingSeller, setUpdatingSeller] = useState<Seller | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/sellers');
      setSellers(response.data.data);
    } catch (error) {
      console.error('Error fetching sellers:', error);
    }
  };

  const handleCreateSeller = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/sellers', newSeller);
      setNewSeller({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      fetchSellers();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const handleDeleteSeller = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/sellers/${id}`);
      fetchSellers();
    } catch (error) {
      console.error('Error deleting seller:', error);
    }
  };

  const handleUpdateSeller = (seller: Seller) => {
    setUpdatingSeller(seller);
  };

  const handleSaveUpdateSeller = async () => {
    try {
      if (updatingSeller) {
        await axios.put(`http://localhost:8000/api/v1/sellers/${updatingSeller._id}`, updatingSeller);
        fetchSellers();
        setUpdatingSeller(null);
      }
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  };

  
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
    <div className="container">
      <h2>Manage Sellers</h2>
      <div>
            <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => setIsCreating(true)}/>
            Create New Seller
            </div>
      <div>
        {isCreating ? (
          <div className="form-group">
            <h3>Add New Seller</h3>
            <input
              className="input-field"
              type="text"
              placeholder="First Name"
              value={newSeller.firstName}
              onChange={(e) => setNewSeller({ ...newSeller, firstName: e.target.value })}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Last Name"
              value={newSeller.lastName}
              onChange={(e) => setNewSeller({ ...newSeller, lastName: e.target.value })}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={newSeller.email}
              onChange={(e) => setNewSeller({ ...newSeller, email: e.target.value })}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={newSeller.password}
              onChange={(e) => setNewSeller({ ...newSeller, password: e.target.value })}
            />
           
            <div className="adminBtnContainer">
            <IonButton className="detailsBTN" onClick={handleCreateSeller}>Create Seller</IonButton>
            <IonButton className="cancel-button" onClick={() => setIsCreating(false)}>Cancel</IonButton>
            </div>
          </div>
        ) : (
         <br />
        )}
      </div>
        {updatingSeller ? (
          <div className="form-group">
            <h3>Edit Seller</h3>
            <input
              className="input-field"
              type="text"
              placeholder="First Name"
              value={updatingSeller.firstName}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, firstName: e.target.value })}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Last Name"
              value={updatingSeller.lastName}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, lastName: e.target.value })}
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={updatingSeller.email}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, email: e.target.value })}
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password"
              value={updatingSeller.password}
              onChange={(e) => setUpdatingSeller({ ...updatingSeller, password: e.target.value })}
            />
            <IonButton className="detailsBTN" onClick={handleSaveUpdateSeller}>Save</IonButton>
            <IonButton className="cancel-button" onClick={() => setUpdatingSeller(null)}>Cancel</IonButton>
          </div>
        ) : (

        <IonList>
        <h3>List of Sellers</h3>
              {sellers.map((item, index) => (
                <IonItem key={index}>
                   
                  <IonLabel>{item.firstName}</IonLabel>
                  <IonLabel>{item.lastName}</IonLabel>
                 
                  <IonButton className="favListTrashBTN" fill="clear" 
                  onClick={() => item._id && handleDeleteSeller(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => item._id && handleDeleteSeller(item._id)}/>
                  </IonButton>
                  <IonButton className="favListTrashBTN" fill="clear" 
                  onClick={() => item._id && handleUpdateSeller(item)}
                  >
                    <FontAwesomeIcon icon={faPen} className="icon" onClick={() => item._id && handleUpdateSeller(item)}/>
                  </IonButton>
                </IonItem>
              ))}
            </IonList>


        )}
       
      </div>
      </IonContent>
      </IonPage>
  );
};

export default AdminSellers;
