import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';

const RegisterPatient: React.FC = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('male');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');

  const handleFormSubmit = async () => {
    try{

      const response = await fetch("http://localhost:8081/patient/add-patient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, bloodGroup, gender, phoneNo, address }),
      });

      if (!response.ok) {
        throw new Error('Failed to register patient');
      }

      // Clear the form after successful submission
      setName('');
      setAge('');
      setBloodGroup('');
      setGender('male');
      setPhoneNo('');
      setAddress('');

      console.log('Patient registered successfully');

    } catch(error){
      console.error('Error registering patient:', error);
    }
  };

  return (
    <div className='register-patient'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Register Patient</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} label="Name:" labelPlacement='floating' placeholder="Enter patient name"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={age} onIonChange={(e) => setAge(e.detail.value!)} label="Age:" labelPlacement='floating' placeholder="Enter patient age"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={bloodGroup} onIonChange={(e) => setBloodGroup(e.detail.value!)} label="Blood Group:" labelPlacement='floating' placeholder="Enter patient blodd group"></IonInput>
              </IonCol>
              <IonCol>
                <IonRadioGroup value={gender} onIonChange={(e) => setGender(e.detail.value)}>
                  <IonRadio value="male">Male</IonRadio>
                  <IonRadio value="female">Female</IonRadio>
                  <IonRadio value="other">Other</IonRadio>
                </IonRadioGroup>
              </IonCol>
              <IonCol>
                <IonInput value={phoneNo} onIonChange={(e) => setPhoneNo(e.detail.value!)} label="Phone:" labelPlacement='floating' placeholder="Enter patient phone number"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={address} onIonChange={(e) => setAddress(e.detail.value!)} label="Address:" labelPlacement='floating' placeholder="Enter patient address"></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className='button-container'>
            <IonButton onClick={handleFormSubmit} shape='round'>Register</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default RegisterPatient;
