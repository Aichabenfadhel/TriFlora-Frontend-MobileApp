import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sellersRequestType } from '../../../Modals/sellersRequestModal';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsArrowLeft } from 'react-icons/bs';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from "react-router";
const SellerRequestManagement: React.FC = () => {
  const [sellerRequests, setSellerRequests] = useState<sellersRequestType[]>([]);
  const history = useHistory();
  useEffect(() => {
    fetchSellerRequests();
  }, []);

  console.log(sellerRequests);
  
  const fetchSellerRequests = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/sellersRequest/allSellersRequests`);
      console.log("/allSellersRequests",response.data);
      
      setSellerRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching seller requests:', error);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/api/v1/sellersRequest/approve/${id}`);
      fetchSellerRequests();
    } catch (error) {
      console.error('Error approving seller request:', error);
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/sellersRequest/reject/${id}`);
      fetchSellerRequests();
    } catch (error) {
      console.error('Error rejecting seller request:', error);
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
    <div className="sellerRequestContainer">
    <IonList>
    <h3>List of Sellers</h3>
          {sellerRequests.map((request, index) => (
            <IonItem key={index}>
               
              <IonLabel>Name : {request.user.name}</IonLabel>
              <IonLabel>Status: {request.status}</IonLabel>
             
              <IonButton className="favListTrashBTN" fill="clear" 
              onClick={() => approveRequest(request._id)}
              >
                <FontAwesomeIcon icon={faCircleCheck}  className="icon" onClick={() => approveRequest(request.user._id)}/>
              </IonButton>
              <IonButton className="favListTrashBTN" fill="clear" 
              onClick={() => rejectRequest(request._id)}
              >
                <FontAwesomeIcon icon={faCircleXmark}  className="icon" onClick={() => rejectRequest(request.user._id)}/>
              </IonButton>
            </IonItem>
          ))}
        </IonList>



    
</div>
</IonContent>
    </IonPage>
  );

};

export default SellerRequestManagement;
