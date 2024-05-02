import { IonAlert, IonButton, IonInput, IonItem, IonNote, IonRadio, IonRadioGroup, IonTitle } from "@ionic/react";
import React ,{ useState } from "react";
import { PiPlantFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import './login.css'
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Signin: React.FC =() =>{
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPwd]= useState('');
    const [role, setRole] = useState('user');
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/signup`,
            { name, email, password,role }
          );
          if (res && res.data.success) {
            console.log("les valeurs :",res);
            setName('')
            setEmail('')
            setPwd('')
            setRole('user')
            history.push("/login");
          } 
        } catch (error) {
            console.log("Something went wrong !");
        }
      };
    
    
    return(
        
    <div className='loginCont'>

        <div className='headerContainer'>
            <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
        </div>            
        <IonTitle className='loginName'>SignUp</IonTitle>
                
        <form onSubmit={handleSubmit} >
        <IonTitle className='label'>Name  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='text' placeholder='Enter your Name' value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
             </IonItem>

             <IonTitle className='label'>Email  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='email' placeholder='Enter your email' value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Email is invalid</IonNote>
             </IonItem>
                     
             <IonTitle className='label'>Password  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='password' placeholder='Enter your password' value={password} onIonChange={e => setPwd(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Password needs to be 6 characters</IonNote>
             </IonItem>

             <IonTitle className='label'>Confirm Password  :</IonTitle>
             <IonItem fill='solid' className='formItem'>
                 <IonInput type='password' placeholder='Confirm your password' value={password} onIonChange={e => setPwd(e.detail.value!)}></IonInput>
                 <IonNote slot='error' >Password needs to be 6 characters</IonNote>
             </IonItem>
             <IonTitle className='label'> Sign up as :</IonTitle>
             <IonRadioGroup value={role} onIonChange={e => setRole(e.detail.value)}>
                 <IonRadio value="user" aria-label="Custom checkbox that is checked">Customer</IonRadio>
                <IonRadio value="seller" aria-label="Custom checkbox">Seller</IonRadio>
             </IonRadioGroup>
             <Link className='formLink' to="/login">login</Link><br/>
             <IonButton id="signupAlert"  className='formButtom' type='submit' expand='block' >SignUp</IonButton>
             <IonAlert
                    trigger="signupAlert"
                    isOpen={isOpen}
                    header="You have been registred Successfully"
                    message="Go Now and login to your account."
                    buttons={[{
                        text: 'Login',
                        handler: () => {
                            setIsOpen(false);
                            history.push("/login"); 
                        }
                    }]}
                    onDidDismiss={() => setIsOpen(false)}
                ></IonAlert>
        </form>
        </div>
    );

}




export default Signin;