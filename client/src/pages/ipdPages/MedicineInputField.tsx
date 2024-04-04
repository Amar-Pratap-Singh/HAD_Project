import React, { useState } from 'react';
import { IonButton, IonCol, IonInput, IonRow } from '@ionic/react';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';

type FormInputs = {
    medicineName: string,
    medicineQty: string,
    medicineTiming: string,
    medicineDuration: string
}

const MedicineInputField: React.FC = () => {

    const {control}=useForm()
    
    return (
        <IonRow>
              <IonCol>
                <TextInput name='medicineName' placeHolder='' label='Medicine Name' control={control}/>
              </IonCol>
              <IonCol>
                <TextInput name='medicineQty' placeHolder='' label='Quantity' control={control}/>
              </IonCol>
              <IonCol>
                <TextInput name='medicineTiming' placeHolder='' label='Medicine Timing' control={control}/>
              </IonCol>
              <IonCol>
                <TextInput name='medicineDuration' placeHolder='' label='Medicine Duration' control={control}/>
              </IonCol>
              <IonCol>
                <div className='button-container'>
                    <IonButton shape='round'>Delete</IonButton>
                </div>
              </IonCol>
        </IonRow>
    );
    
};

export default MedicineInputField;