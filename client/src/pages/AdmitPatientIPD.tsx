import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';

type FormInputs = {
  patiendId: string,
  dept: string,
  wardNo: string
}

const AdmitPatientIPD: React.FC = () => {

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => console.log(data);

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
                  <TextInput name='dept' placeHolder='Enter admission department' label='Department' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='wardNo' placeHolder='Enter ward number' label='Ward No' control={control}/>
                </IonCol>
                <IonCol>
                  <TextInput name='bedNo' placeHolder='Enter bed number' label='Bed No' control={control}/>
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
