import { IonButton, IonContent, IonPage, IonSelect, IonSelectOption } from '@ionic/react'
import { Controller, set, useForm } from 'react-hook-form';
import { useState } from 'react';
import TextInput from '../../components/TextInput';
import Header from '../../components/Header';
import AudioRecord from '../../toolkit/AudioRecord';

function SignUp() {

  const { control, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {

    try{
      setError(false);
      setSuccess(false);
      const res = await fetch('http://localhost:8082/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resMsg = await res.json();
      if (resMsg.success === false) {
        setError(true);
        setSuccess(false);
        reset();
        return;
      }
      setSuccess(true);
      setError(false);
      reset();
    }
    catch(error) {
      setError(true);
      setSuccess(false);
      reset();
    }
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className='p-3 max-w-sm mx-auto'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <TextInput name='email' placeHolder='Enter email' label='Email' control={control}/>
            <TextInput name='password' placeHolder='Enter password' label='Password' control={control}/>
            {/* <TextInput name='role' placeHolder='Enter role' label='Role' control={control}/> */}
            <Controller
              control={control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <IonSelect value={value} placeholder= "ROLE" onIonChange={onChange}>
                  <IonSelectOption value="DOCTOR">Doctor</IonSelectOption>
                  <IonSelectOption value="CLINICAL_ASSISTANT">Clinical Assistant</IonSelectOption>
                  <IonSelectOption value="PHARMACIST">Pharmacist</IonSelectOption>
                  <IonSelectOption value="LAB_USER">Lab User</IonSelectOption>
                  <IonSelectOption value="RECEPTIONIST">Receptionist</IonSelectOption>
                  <IonSelectOption value="ADMIN">Admin</IonSelectOption>
                </IonSelect>
              )}
            />
            <IonButton type='submit'>Sign Up</IonButton>
          </form>    
          <p className='text-red-700 mt-5 text-center'>{error && 'Something went wrong!'}</p>
          <p className='text-green-600 mt-5 text-center'>{success && 'User added successfully!'}</p>
        </div>
      </IonContent>
      <AudioRecord />
    </IonPage>
  )
}

export default SignUp