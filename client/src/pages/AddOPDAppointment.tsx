import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';

type FormInputs = {
  patiendId: string,
  apptDate: string,
  doctorName: string
}

const AddOPDAppointment: React.FC = () => {

  const { control, handleSubmit, reset } = useForm();

  // const onSubmit = (data: any) => console.log(data);
  const onSubmit = async (data: any) => {
    
    try{
      const response = await fetch("http://localhost:8081/patient/opdappointment", {
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
    <div className='add-opd-appt'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Add OPD Appointment</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>           
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='apptDate' placeHolder='Enter appointment date' label='Appointment Date' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='doctor' placeHolder='Enter doctor name' label='Doctor Name' control={control}/>
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className='button-container'>
              <IonButton type='submit' shape='round'>Add Appointment</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default AddOPDAppointment;
