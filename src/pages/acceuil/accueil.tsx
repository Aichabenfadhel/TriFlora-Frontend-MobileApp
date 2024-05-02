import React from 'react';
import './acceuil.css';
import {  IonButton,  IonTitle } from '@ionic/react';
import { BsArrowRight, BsPersonFill } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";
import { useHistory } from "react-router";

const Acceuil: React.FC = () => {

  const history = useHistory();
  return (
   
    <div  className='homeContent' >
    
      <div className='headerContainer'>
        <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
        <IonButton className='profilIcon' onClick={()=>history.push("/login")}>
        <BsPersonFill  />
        </IonButton>
        
        </div>
      <div className='contentDiv'>
        <div className='paragDiv'>
            Embrace the beauty of your own paradise
        </div>
        
        <IonButton  className='homeBTN' onClick={()=>history.push("/home")} >
          Go Shopping
          <BsArrowRight className='homeArrow'/>
        </IonButton>
        
        
      </div>
      
    </div>
    
  
  );
};

export default Acceuil;
