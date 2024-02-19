import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './AdmitPatientIPD.css';

const AdmitPatientIPD: React.FC = () => {

  const [patientId, setPatientId] = useState('');
  const [dept, setDept] = useState('');
  const [wardNo, setWardNo] = useState('');
  const [bedNo, setBedNo] = useState('');

  const handleFormSubmit = () => {
    console.log('Form submitted:', { patientId, dept, wardNo, bedNo });
  };

  return (
    <div className='admit-patient-ipd'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Admit Patient to IPD</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={patientId} onIonChange={(e) => setPatientId(e.detail.value!)} label="Patient ID:" labelPlacement='floating' placeholder="Enter patient ID"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={dept} onIonChange={(e) => setDept(e.detail.value!)} label="Department:" labelPlacement='floating' placeholder="Enter admission department"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={wardNo} onIonChange={(e) => setWardNo(e.detail.value!)} label="Ward No:" labelPlacement='floating' placeholder="Enter ward number"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={bedNo} onIonChange={(e) => setBedNo(e.detail.value!)} label="Bed No:" labelPlacement='floating' placeholder="Enter bed number"></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className='button-container'>
            <IonButton onClick={handleFormSubmit} shape='round'>Admit Patient</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AdmitPatientIPD;
