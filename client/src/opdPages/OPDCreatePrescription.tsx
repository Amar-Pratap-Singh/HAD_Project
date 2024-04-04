import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton,IonInput } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './OPDCreatePrescription.css';
import { useForm } from 'react-hook-form';
import TextInput from "../components/TextInput";

type FormInputs = {
	complaint: string,
	vitals: string,
	diagnosis: string,
	medicines: string,
	advice: string,
	followup: string
}

const OPDCreatePrescription: React.FC = () => {

	const { control,handleSubmit,reset } = useForm()

	const handleFormSubmit = (data:any) => {
		console.log('Form submitted:', { data });
		reset();
	};

	return(
		<div className='create-prescription'>
			<IonPage>
				<TopToolbar/>
				<IonContent className="ion-padding">
				<h1>Create Prescription</h1>
				<form onSubmit={handleSubmit(handleFormSubmit)}>
				<IonGrid>
					<IonRow>
					<IonCol>
						<TextInput name='complaint' placeHolder='Enter complaint' label='Complaint:' control={control}/>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<TextInput name='vitals' placeHolder='Enter vitals' label='Vitals:' control={control}/>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<TextInput name='diagnosis' placeHolder='Enter Diagnosis' label='Diagnosis:' control={control}/>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<TextInput name='medicines' placeHolder='Enter Medicines' label='Medicines:' control={control}/>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<TextInput name='advice' placeHolder='Enter advice' label='Advice:' control={control}/>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<TextInput name='followup' placeHolder='Enter followup' label='Follow Up:' control={control}/>
					</IonCol>
					</IonRow>
				</IonGrid>
				<div className='button-container'>
					<IonButton type='submit' shape='round'>Create Prescription</IonButton>
				</div>
				</form>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default OPDCreatePrescription;