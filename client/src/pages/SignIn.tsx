import { IonButton, IonPage } from '@ionic/react'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import TextInput from '../components/TextInput'
import { authSuccess } from '../redux/user/userSlice';

function SignIn() {

  const { control, handleSubmit, reset } = useForm();
  const history = useHistory();
  const [error, setError] = useState(false);
  const dispath = useDispatch();

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
      const token = await res.text(); // this is the jwt token
      const user = jwtDecode(token) as {sub: string, role: string};
      dispath(authSuccess({jwt: token, user}));
      console.log(user)
      switch(user.role) {
        case 'DOCTOR':
          history.push('/doctor/ipd/add-encounter');
          break;
        case 'CLINICAL_ASSISTANT':
          history.push('/nurse/patient-list');
          break;
        case 'PHARMACIST':
          history.push('/pharma/search');
          break;
        case 'LAB_USER':
          history.push('/lab/search');
          break;
        case 'RECEPTIONIST':
          history.push('/reception/register-patient');
          break;
        case 'ADMIN':
          history.push('/admin/sign-up');
          break;
      }
    }
    catch(error) {
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
        <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      </div>
    </IonPage>
  )
}

export default SignIn