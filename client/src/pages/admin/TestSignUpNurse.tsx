import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import Header from '../../components/Header';
import './TestSignUpNurse.css';

const TestSignUpNurse: React.FC = () => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [special, setSpecial] = useState('');
  const [gender, setGender] = useState('male');
  const [phoneNo, setPhoneNo] = useState('');

  const handleFormSubmit = async () => {
    try{

      console.log({name,age,special,gender,phoneNo})

      // Clear the form after successful submission
      setName('');
      setAge('');
      setSpecial('');
      setGender('male');
      setPhoneNo('');

      console.log('Staff registered successfully');

    } catch(error){
      console.error('Error registering staff:', error);
    }
  };

  return (
    <div className='register-nurse'>
      <IonPage>
        <Header/>
        <IonContent className="ion-padding">
          <h1>Register Nurse</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} label="Name:" labelPlacement='floating' placeholder="Enter staff name"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={age} onIonChange={(e) => setAge(e.detail.value!)} label="Age:" labelPlacement='floating' placeholder="Enter staff age"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonSelect value={special} onIonChange={(e) => setSpecial(e.detail.value)}>
                  <IonSelectOption value="emt">EMT</IonSelectOption>
                  <IonSelectOption value="gastro">Gastrologist</IonSelectOption>
                  <IonSelectOption value="cardio">Cardiologist</IonSelectOption>
                </IonSelect>
              </IonCol>
              <IonCol>
                <IonRadioGroup value={gender} onIonChange={(e) => setGender(e.detail.value)}>
                  <IonRadio value="male">Male</IonRadio>
                  <IonRadio value="female">Female</IonRadio>
                  <IonRadio value="other">Other</IonRadio>
                </IonRadioGroup>
              </IonCol>
              <IonCol>
                <IonInput value={phoneNo} onIonChange={(e) => setPhoneNo(e.detail.value!)} label="Phone:" labelPlacement='floating' placeholder="Enter staff phone number"></IonInput>
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

export default TestSignUpNurse;
