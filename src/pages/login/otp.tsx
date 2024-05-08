import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonNote, IonTitle } from '@ionic/react';
import axios from 'axios';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from 'react-router';

const Otp: React.FC = () => {
    const [resetCode, setResetCode] = useState('');
    const [error, setError] = useState<string | null>('');
    const history = useHistory();

    const handleVerifyResetCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/v1/auth/verifyResetCode', {
                resetCode: resetCode
            });

            if (response && response.data.token) {
                localStorage.setItem('resetToken', response.data.token); 
                history.push("/resetPwd"); 
            }
        } catch (error: any) {
            setError('Reset code invalid or expired');
        }
    };

    return (
        <div className="loginCont">
            <div className='headerContainer'>
                <IonTitle className='titleCont'> <PiPlantFill className='logo' />TriFlora</IonTitle>
            </div>
            <IonTitle className="loginName">Verify Reset Code</IonTitle>
            <form onSubmit={handleVerifyResetCode}>
                <IonItem fill='solid' className='formItem'>
                    <IonInput
                        maxlength={6}
                        type="text"
                        placeholder="Enter reset code"
                        value={resetCode}
                        onIonChange={(e) => setResetCode(e.detail.value!)}
                    ></IonInput>
                </IonItem>
                <IonButton expand="block" type="submit" className='formButtom'>
                    Verify Code
                </IonButton>
            </form>
        </div>
    );
};

export default Otp;