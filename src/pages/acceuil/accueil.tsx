import React from 'react';
import './acceuil.css';
import {  IonButton,  IonTitle } from '@ionic/react';
import { BsArrowRight, BsPersonFill } from "react-icons/bs";
import { PiPlantFill } from "react-icons/pi";


const Acceuil: React.FC = () => {
  return (
   
    <div  className='homeContent' >
    
      <div className='headerContainer'>
        <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
        <IonButton className='profilIcon' href='/login'>
        <BsPersonFill  />
        </IonButton>
        
        </div>
      <div className='contentDiv'>
        <div className='paragDiv'>
            Embrace the beauty of your own paradise
        </div>
        
        <IonButton  className='homeBTN' href='/home' >
          Go Shopping
          <BsArrowRight className='homeArrow'/>
        </IonButton>
        
        
      </div>
      
    </div>
    
  
  );
};

export default Acceuil;
