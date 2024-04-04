import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import Header from '../../components/Header';

type FormInputs = {
  patiendId: string,
  dept: string,
  ward_no: number,
  bed_no: number
}

const IPDAdmissionForm: React.FC = () => {

  const { control, handleSubmit,reset } = useForm();
  
  const onSubmit = async (data: any) => {
    
    try{
      const response = await fetch("http://localhost:8081/patient/ipdappointment", {
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

      console.log('Patient registetered to IPD successfully');

    } catch(error){
      console.error('Error registering patient:', error);
    }
  };

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto mt-12'>
          <h1 className='text-center text-xl font-semibold'>Admit Patient to IPD</h1>
          <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>
          <TextInput name='Department' placeHolder='Enter admission department' label='Department' control={control}/>
          <TextInput name='ward_no' placeHolder='Enter ward number' label='Ward No' control={control}/>
          <TextInput name='bed_no' placeHolder='Enter bed number' label='Bed No' control={control}/>
          <IonButton type='submit' shape='round'>Admit Patient</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default IPDAdmissionForm;
