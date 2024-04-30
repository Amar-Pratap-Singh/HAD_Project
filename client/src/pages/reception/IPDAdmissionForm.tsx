import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonItem, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../components/TextInput';
import Header from '../../components/Header';

type FormInputs = {
  patiendId: string,
  department: string,
  wardNo: number,
  bedNo: number
}

const IPDAdmissionForm: React.FC = () => {

  const { control, handleSubmit, reset, setValue, watch } = useForm<FormInputs>();

  const [wardNoOptions, setWardNoOptions] = useState<number[]>([]);
  const [bedNoOptions, setBedNoOptions] = useState<number[]>([]);
  const wardNo = watch('wardNo');
  const bedNo = watch('bedNo');

  useEffect(() => {
    fetchWardNumbers();
  }, []);

  const fetchWardNumbers = async () => {
    try {
      //Fetch ward numbers from backend
      const response = await fetch("http://localhost:8081/patient/get-all-wards");
      if (!response.ok) {
        throw new Error('Failed to fetch ward numbers');
      }
      const data = await response.json();
      setWardNoOptions(data);
    } 
    catch (error) {
      console.error('Error fetching ward numbers:', error);
    }
  }

  const handleWardNoChange = async (selectedValue: number) => {
    try {
      //Fetch available bed numbers for the selected ward from backend
      const response = await fetch(`http://localhost:8081/patient/get-available-bedNo-by-wardNo?wardNo=${selectedValue}`);
      if (!response.ok) {
        throw new Error('Failed to fetch available beds');
      }
      const data = await response.json();
      const bedNoArray = data.map((bed: any) => bed.bedNo);
      setBedNoOptions(bedNoArray);
    } 
    catch (error) {
      console.error('Error fetching available beds:', error);
    }
  }
  
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
      reset();
      console.log('Patient registetered to IPD successfully');
    } 
    catch(error){
      console.error('Error registering patient:', error);
    }
  }

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)} className='max-w-lg mx-auto mt-12'>
          <h1 className='text-center text-xl font-semibold'>Admit Patient to IPD</h1>

          <TextInput name='patientId' placeHolder='Enter patient ID' label='Patient ID' control={control}/>
          
          <TextInput name='department' placeHolder='Enter admission department' label='Department' control={control}/>
          
          <IonItem className='border-2 border-solid border-black my-3'>
            <Controller
              name="wardNo"
              control={control}
              render={({ field }) => (
                <IonSelect value={wardNo} placeholder='Select ward number' onIonChange={e => { field.onChange(e.detail.value); handleWardNoChange(parseInt(e.detail.value, 10)); }}>
                  {wardNoOptions.map((wardNo) => (
                    <IonSelectOption key={wardNo} value={wardNo}>
                      {wardNo}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
            />
          </IonItem>

          <IonItem className='border-2 border-solid border-black my-3'>
            <Controller
              name="bedNo"
              control={control}
              render={({ field }) => (
                <IonSelect value={bedNo} placeholder='Select bed number' onIonChange={e => field.onChange(e.detail.value)}>
                  {bedNoOptions.map((bedNo) => (
                    <IonSelectOption key={bedNo} value={bedNo}>
                      {bedNo}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              )}
            />
          </IonItem>
          
          <IonButton type='submit' shape='round'>Admit Patient</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default IPDAdmissionForm;
