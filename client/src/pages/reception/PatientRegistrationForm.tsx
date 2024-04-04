import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from "../../components/TextInput";
import Header from '../../components/Header';

type FormInputs = {
  name: string,
  age: string,
  bloodGroup: string,
  gender: string,
  phoneNo: string,
  address: string
}

const PatientRegistrationForm: React.FC = () => {

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    
    try{
      const response = await fetch("http://localhost:8081/patient/add-patient", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to register patient');
      }

      // Clear the form after successful submission
      reset();

      console.log('Patient registered successfully');

    } catch(error){
      console.error('Error registering patient:', error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto mt-12'>
          <h1 className='text-center text-xl font-semibold'>Register Patient</h1>
          <TextInput name='name' placeHolder='Enter patient name' label='Patient Name' control={control}/>     
          <TextInput name='age' placeHolder='Enter patient age' label='Age' control={control}/> 
          <TextInput name='bloodGroup' placeHolder='Enter patient blood group' label='Blood Group' control={control}/>  
          <IonItem className='border-2 border-solid border-black my-3'>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <IonRadioGroup value={field.value} onIonChange={e => field.onChange(e.detail.value)}>
                  <IonRadio value="male">Male</IonRadio>
                  <IonRadio value="female">Female</IonRadio>
                  <IonRadio value="other">Other</IonRadio>
                </IonRadioGroup>
              )}
            />
          </IonItem>
          <TextInput name='phoneNo' placeHolder='Enter patient phone number' label='Phone Number' control={control}/>
          <TextInput name='address' placeHolder='Enter patient address' label='Address' control={control}/>
          <IonButton type='submit' shape='round'>Register</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default PatientRegistrationForm;
