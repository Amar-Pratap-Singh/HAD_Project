import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';
import MedicineInputField from './MedicineInputField';
import { useForm } from 'react-hook-form';
import TextInput from "../components/TextInput";

type FormInputs = {
  notes: string,
  instructions: string,
  medicineName: string,
  medicineQty: string,
  medicineTiming: string,
  medicineDuration: string,
  medicineFields: number[]
}

/*Bug: Showing only 1 medicine info instead of all*/

const AddEncounter: React.FC = () => {

  const { control, handleSubmit } = useForm();

  const [medicineFields, setMedicineFields] = useState([0]);

  const addMedicineField = () => {
    setMedicineFields([...medicineFields, medicineFields.length]);
  };


  const handleFormSubmit = (data:any) => {
    console.log('Form submitted:', {data});
  };

  return (
    <div className='add-encounter'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Add IPD Encounter</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <IonGrid>
            <IonRow>
              <IonCol>
                <TextInput name='notes' placeHolder='Enter notes' label='Notes' control={control}/>     
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <TextInput name='instructions' placeHolder='Enter instructions' label='Instructions' control={control}/>
              </IonCol>
            </IonRow>
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
            {medicineFields.map((_, index) => (
                <MedicineInputField key={index} />
            ))}
            <div className='button-container'>
                <IonButton onClick={addMedicineField} shape='round'>+</IonButton>
            </div>
          </IonGrid>
          <div className='button-container'>
            <IonButton type='submit' shape='round'>Add Encounter</IonButton>
          </div>
        </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AddEncounter;
