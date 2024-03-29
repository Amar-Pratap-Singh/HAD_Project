import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';

const AddEncounter: React.FC = () => {

  const [notes, setNotes] = useState('');
  const [instructions, setInstructions] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [medicineQty, setMedicineQty] = useState('');
  const [medicineTiming, setMedicineTiming] = useState('');
  const [medicineDuration, setMedicineDuration] = useState('');

  const handleFormSubmit = () => {
    console.log('Form submitted:', { notes, instructions, medicine });
  };

  return (
    <div className='add-encounter'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Add IPD Encounter</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput value={notes} onIonChange={(e) => setNotes(e.detail.value!)} label="Notes:" labelPlacement='floating' placeholder="Enter notes"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={instructions} onIonChange={(e) => setInstructions(e.detail.value!)} label="Instructions:" labelPlacement='floating' placeholder="Enter instructions"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonInput value={medicineName} onIonChange={(e) => setMedicineName(e.detail.value!)} label="Medicine Name:" labelPlacement='floating' placeholder="paracetamol"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={medicineQty} onIonChange={(e) => setMedicineQty(e.detail.value!)} label="Qty:" labelPlacement='floating' placeholder="1"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={medicineTiming} onIonChange={(e) => setMedicineTiming(e.detail.value!)} label="When:" labelPlacement='floating' placeholder="morning"></IonInput>
              </IonCol>
              <IonCol>
                <IonInput value={medicineDuration} onIonChange={(e) => setMedicineDuration(e.detail.value!)} label="Duration:" labelPlacement='floating' placeholder="3 days"></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className='button-container'>
            <IonButton onClick={handleFormSubmit} shape='round'>Add Encounter</IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AddEncounter;
