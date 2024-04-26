import { IonButton, IonContent, IonPage } from '@ionic/react'
import { Controller, set, useForm } from 'react-hook-form';
import { useState } from 'react';
import TextInput from '../../components/TextInput';
import Header from '../../components/Header';
import AudioRecord from '../../toolkit/AudioRecord';

function SignUp() {

  const { control, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: any) => {

    try{
      setError(false);
      setErrorMsg("");
      setSuccess(false);
      const res = await fetch('http://localhost:8082/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok === false) {
        setError(true);
        setErrorMsg(await res.text());
        setSuccess(false);
        reset();
        return;
      }
      setSuccess(true);
      setError(false);
      setErrorMsg("");
      reset();
    }
    catch(error) {
      setError(true);
      setErrorMsg('Network error');
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
            <TextInput name='role' placeHolder='Enter role' label='Role' control={control}/>
            <IonButton type='submit'>Sign Up</IonButton>
          </form>    
          <p className='text-red-700 mt-5 text-center'>{error && errorMsg}</p>
          <p className='text-green-600 mt-5 text-center'>{success && 'User added successfully!'}</p>
        </div>
      </IonContent>
      <AudioRecord />
    </IonPage>
  )
}

export default SignUp