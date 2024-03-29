import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './TestLogin.css';

const TestLogin: React.FC = () => {

  const [uuid, setUUID] = useState('');
  const [passw, setPassw] = useState('');

  const handleFormSubmit = async () => {
    try{

      console.log({uuid,passw})

      // Clear the form after successful submission
      setUUID('');
      setPassw('');

      console.log('Staff signin successfully');

    } catch(error){
      console.error('Error registering staff:', error);
    }
  };

  return (
    <div className='test-login'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Login</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={uuid} onIonChange={(e) => setUUID(e.detail.value!)} label="UUID:" labelPlacement='floating' placeholder="Enter UUID"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={passw} onIonChange={(e) => setPassw(e.detail.value!)} label="Password:" labelPlacement='floating' placeholder="Enter password"></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className='button-container'>
            <IonButton onClick={handleFormSubmit} shape='round'>Login</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default TestLogin;