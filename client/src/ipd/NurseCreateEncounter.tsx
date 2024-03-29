import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton,IonInput } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './NurseCreateEncounter.css';

const NurseCreateEncounter: React.FC = () => {

	const [bp,setBP] = useState('')
	const [bpm,setBPM] = useState('')
	const [temp,setTemp] = useState('')
	const [o2,setO2] = useState('')

	const handleFormSubmit = () => {
		console.log('Form submitted:', {bp,bpm,temp,o2} );
		setBP('');
		setBPM('');
		setTemp('');
		setO2('');
	};

	return(
		<div className='create-prescription'>
			<IonPage>
				<TopToolbar/>
				<IonContent className="ion-padding">
				<h1>Create Encounter</h1>
				<IonGrid>
					<IonRow>
					<IonCol>
						<IonInput value={bp} onIonChange={(e) => setBP(e.detail.value!)} label="Blood Pressure:" labelPlacement='floating' placeholder="Enter Blood Pressure"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={bpm} onIonChange={(e) => setBPM(e.detail.value!)} label="Heart Rate(bpm):" labelPlacement='floating' placeholder="Enter Heart Rate"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={temp} onIonChange={(e) => setTemp(e.detail.value!)} label="Temperature(F):" labelPlacement='floating' placeholder="Enter Temperature"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={o2} onIonChange={(e) => setO2(e.detail.value!)} label="Oxygen:" labelPlacement='floating' placeholder="Enter Oxygen"></IonInput>
					</IonCol>
					</IonRow>
				</IonGrid>
				<div className='button-container'>
					<IonButton onClick={handleFormSubmit} shape='round'>Create Prescription</IonButton>
				</div>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default NurseCreateEncounter;