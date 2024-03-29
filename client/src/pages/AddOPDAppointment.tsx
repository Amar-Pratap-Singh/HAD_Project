import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';

const AddOPDAppointment: React.FC = () => {

  const [patientId, setPatientId] = useState('');
  const [apptReason, setApptReason] = useState('');
  const [doctor, setDoctor] = useState('');

  const handleFormSubmit = () => {
    console.log('Form submitted:', { patientId, apptReason, doctor });
  };

  return (
    <div className='add-opd-appt'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Add OPD Appointment</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={patientId} onIonChange={(e) => setPatientId(e.detail.value!)} label="Patient ID:" labelPlacement='floating' placeholder="Enter patient ID"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={apptReason} onIonChange={(e) => setApptReason(e.detail.value!)} label="Appointment Reason:" labelPlacement='floating' placeholder="Enter appointment reason"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={doctor} onIonChange={(e) => setDoctor(e.detail.value!)} label="Doctor:" labelPlacement='floating' placeholder="Enter doctor"></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className='button-container'>
            <IonButton onClick={handleFormSubmit} shape='round'>Add Appointment</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AddOPDAppointment;
