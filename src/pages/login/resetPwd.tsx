import { IonButton, IonInput, IonItem, IonNote, IonTitle } from "@ionic/react";
import React,{ useState } from "react";
import { PiPlantFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import './login.css'


const ResetPwd: React.FC =() =>{
    const [pwd,setPwd]= useState('');

    return(
        <div className='loginCont'>

        <div className='headerContainer'>
            <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
        </div>            
        <IonTitle className='loginName'>Reset Password</IonTitle>
                
        <form onSubmit={ResetPwd} >

             <IonTitle className='label'>Password  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='password' placeholder='Enter your password' value={pwd} onIonChange={e => setPwd(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Password needs to be 6 characters</IonNote>
             </IonItem>

             <IonTitle className='label'>Confirm Password  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='password' placeholder='Confirm your password' value={pwd} onIonChange={e => setPwd(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Password needs to be 6 characters</IonNote>
             </IonItem>
             <IonButton  className='formButtom' type='submit' expand='block' >Submit</IonButton>
        </form>
        </div>
    );

}




export default ResetPwd;