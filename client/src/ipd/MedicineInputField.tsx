import React, { useState } from 'react';
import { IonCol, IonInput, IonRow } from '@ionic/react';

const MedicineInputField: React.FC = () => {

    const [medicineName, setMedicineName] = useState('');
    const [medicineQty, setMedicineQty] = useState('');
    const [medicineTiming, setMedicineTiming] = useState('');
    const [medicineDuration, setMedicineDuration] = useState('');
    
    return (
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
    );
};

export default MedicineInputField;