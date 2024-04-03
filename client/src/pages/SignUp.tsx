import { IonButton, IonPage } from '@ionic/react'
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../components/TextInput';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

function SignUp() {

  const { control, handleSubmit, reset } = useForm();
  const history = useHistory();
  const [error, setError] = useState(false);

  const onSubmit = async (data: any) => {

    try{
      setError(false);
      const res = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resMsg = await res.json();
      if (resMsg.success === false) {
        setError(true);
        reset();
        return;
      }
      history.push('/sign-in');
    }
    catch(error) {
      setError(true);
      reset();
    }
  };

  return (
    <IonPage>
        <div className='p-3 max-w-4xl mx-auto'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
          <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <TextInput name='email' placeHolder='Enter email' label='Email' control={control}/>
            <TextInput name='password' placeHolder='Enter password' label='Password' control={control}/>
            <TextInput name='role' placeHolder='Enter role' label='Role' control={control}/>
            <IonButton type='submit'>Sign Up</IonButton>
          </form>    
          <div className='flex gap-2 mt-5'>
            <p>Have an account?</p>
            <Link to='/sign-in'>
              <span className='text-blue-500'>Sign in</span>
            </Link>
          </div>
          <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
        </div>
    </IonPage>
  )
}

export default SignUp