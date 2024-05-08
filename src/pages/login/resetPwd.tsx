import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonNote, IonTitle } from '@ionic/react';
import axios from 'axios';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from 'react-router';

const ResetPasswordForm: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState<string | null>(''); 

    const history = useHistory();

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('resetToken'); 
            if (!token) {
                throw new Error('Reset token not found in localStorage');
            }

            const response = await axios.post('http://localhost:8000/api/v1/auth/resetPassword', {
                token: token,
                newPassword: newPassword
            });

            if (response && response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                history.push("/acceuil"); 
            }
        } catch (error: any) {
            setError(`Error resetting password: ${error.message}`);
        }
    };

    return (
        <div className="loginCont">
            <div className='headerContainer'>
                <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
            </div>
            <IonTitle className="loginName">Reset Password</IonTitle>
            <form onSubmit={handleResetPassword}>
                <IonItem className='formItem'>
                    <IonInput
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onIonChange={(e) => setNewPassword(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                {/* {error && <IonNote color="danger">{error}</IonNote>} */}
                <IonButton className='formButtom' expand="block" type="submit">
                    Submit
                </IonButton>
            </form>
        </div>
    );
};

export default ResetPasswordForm;