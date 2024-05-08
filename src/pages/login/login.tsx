import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonNote,  IonTitle } from '@ionic/react';
import './login.css';
import { PiPlantFill } from 'react-icons/pi';
import { Link, useLocation } from 'react-router-dom';
import {  useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../provider/auth';
import { Storage } from '@capacitor/storage';


const Login: React.FC = () =>{
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const auth= useAuth();
    

    const history = useHistory();
    const location = useLocation();
    


    const handleLogin =async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        try {
            console.log("email",email);
            console.log("pwd",password);
            
             const res = await axios.post(`http://localhost:8000/api/v1/auth/login`, {
                     email,
                     password,
              });

              
              
             
      if (res && res.data.success) {
       auth.setAuth({
        ...auth,
        user : res.data.user,
        token : res.data.token,
       })
       
       await Storage.set({ key: 'user', value: JSON.stringify(res.data.user) });
        await Storage.set({ key: 'token', value:res.data.token });
       
        
        
        history.push('/home');
      } 
    } catch (error) {
      console.log(error);
      
    }
          
    }

    return(

    <div className='loginCont'>

        <div className='headerContainer'>
            <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
        </div>            
        <IonTitle className='loginName'>Login</IonTitle>
                
        <form onSubmit={handleLogin} >
             <IonTitle className='label'>Email  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='email' placeholder='Enter your email' value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Email is invalid</IonNote>
             </IonItem>
                     
             <IonTitle className='label'>Password  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='password' placeholder='Enter your password' value={password} onIonChange={e =>{ setPassword(e.detail.value!);}}></IonInput>
                 <IonNote slot='error' >Password needs to be 6 characters</IonNote>
             </IonItem>
             
             <Link className='formLink' to="/signin">Don&apos;t have an account? Sign In</Link><br/>
             <Link className='formLink' to="/forgotPwd">Forgot Password?</Link>
             <IonButton  className='formButtom' type='submit' expand='block' > Log In</IonButton>
        </form>
        </div>
    )
}
export default Login;