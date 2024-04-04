import { IonButton, IonPage } from '@ionic/react'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import TextInput from '../../components/TextInput'
import { useForm } from 'react-hook-form';

function SignIn() {

  const { control, handleSubmit, reset } = useForm();
  const history = useHistory();
  const [error, setError] = useState(false);

  const onSubmit = async (data: any) => {
    try{
      setError(false);
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok === false) {
        setError(true);
        reset();
        return;
      }
      const resMsg = await res.text();
      console.log(resMsg);
      history.push('/register-patient');
    }
    catch(error) {
      console.log(error);
      setError(true);
      reset();
    }
  };
    
  return (
    <IonPage>
      <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <TextInput name='email' placeHolder='Enter email' label='Email' control={control}/>
          <TextInput name='password' placeHolder='Enter password' label='Password' control={control}/>
          <IonButton type='submit'>Sign In</IonButton>
        </form>    
        <div className='flex gap-2 mt-5'>
          <p>Dont have an account?</p>
          <Link to='/sign-up'>
            <span className='text-blue-500'>Sign Up</span>
          </Link>
        </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
    </IonPage>
  )
}

export default SignIn