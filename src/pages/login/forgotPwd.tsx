import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonNote, IonTitle } from '@ionic/react';
import axios from 'axios';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from 'react-router';

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const history=useHistory();
    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/forgotPassword', {
                email: email
            });
            history.push("/otp");

            setSuccessMessage(response.data.message);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError('User not found with this email');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="loginCont">
            <div className='headerContainer'>
                <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
            </div>
            <IonTitle className="loginName">Forgot Password</IonTitle>
            <form onSubmit={handleForgotPassword}>
                <IonItem fill='solid' className='formItem'>
                    <IonInput
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                {/* {error && <IonNote color="danger">{error}</IonNote>} */}
                {successMessage && <IonNote color="success">{successMessage}</IonNote>}
                <IonButton expand="block" type="submit" className='formButtom'>
                    Submit
                </IonButton>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;