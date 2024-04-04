import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import TopToolbar from '../../components/TopToolbar';
import './styles.css';

type FormInputs = {
  patiendId: string,
  dept: string,
  ward_no: number,
  bed_no: number
}

const AdmitPatientIPD: React.FC = () => {

  const { control, handleSubmit,reset } = useForm();
  
  // const onSubmit = (data: any) => console.log(data);
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
    <div className='admit-patient-ipd'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Admit Patient to IPD</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='Department' placeHolder='Enter admission department' label='Department' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='ward_no' placeHolder='Enter ward number' label='Ward No' control={control}/>
                </IonCol>
                <IonCol>
                  <TextInput name='bed_no' placeHolder='Enter bed number' label='Bed No' control={control}/>
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className='button-container'>
              <IonButton type='submit' shape='round'>Admit Patient</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AdmitPatientIPD;
