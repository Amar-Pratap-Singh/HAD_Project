import React from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from "../../components/TextInput";
import TopToolbar from '../../components/TopToolbar';
import './styles.css';

type FormInputs = {
  name: string,
  age: string,
  bloodGroup: string,
  gender: string,
  phoneNo: string,
  address: string
}

const RegisterPatient: React.FC = () => {

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
    <div className='register-patient'>
      <IonPage>
        <TopToolbar/>
        <IonContent className="ion-padding">
          <h1>Register Patient</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput name='name' placeHolder='Enter patient name' label='Patient Name' control={control}/>         
                </IonCol>
                <IonCol>
                  <TextInput name='age' placeHolder='Enter patient age' label='Age' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='bloodGroup' placeHolder='Enter patient blood group' label='Blood Group' control={control}/>                 
                </IonCol>
                <IonCol>
                  <IonItem>
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
                </IonCol>
                <IonCol>
                  <TextInput name='phoneNo' placeHolder='Enter patient phone number' label='Phone Number' control={control}/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput name='address' placeHolder='Enter patient address' label='Address' control={control}/>
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className='button-container'>
              <IonButton type='submit' shape='round'>Register</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default RegisterPatient;
