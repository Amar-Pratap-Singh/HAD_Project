import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton,IonInput } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './OPDCreatePrescription.css';

const OPDCreatePrescription: React.FC = () => {

	const [complaint,setComplaint]=useState('')
	const [vitals,setVitals]=useState('')
	const [diagnosis,setDiagnosis]=useState('')
	const [medicines,setMedicines]=useState('')
	const [advice,setAdvice]=useState('')
	const [followup,setFollowup]=useState('')

	const handleFormSubmit = () => {
		console.log('Form submitted:', { complaint,vitals,diagnosis,medicines,advice,followup });
		setComplaint('')
		setVitals('')
		setDiagnosis('')
		setMedicines('')
		setAdvice('')
		setFollowup('')
	};

	return(
		<div className='create-prescription'>
			<IonPage>
				<TopToolbar/>
				<IonContent className="ion-padding">
				<h1>Create Prescription</h1>
				<IonGrid>
					<IonRow>
					<IonCol>
						<IonInput value={complaint} onIonChange={(e) => setComplaint(e.detail.value!)} label="Complaint:" labelPlacement='floating' placeholder="Enter complaint"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={vitals} onIonChange={(e) => setVitals(e.detail.value!)} label="Vitals:" labelPlacement='floating' placeholder="Enter vitals"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={diagnosis} onIonChange={(e) => setDiagnosis(e.detail.value!)} label="Diagnosis:" labelPlacement='floating' placeholder="Enter diagnosis"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={medicines} onIonChange={(e) => setMedicines(e.detail.value!)} label="Medicines:" labelPlacement='floating' placeholder="Enter medicines"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={advice} onIonChange={(e) => setAdvice(e.detail.value!)} label="Advice/Notes:" labelPlacement='floating' placeholder="Enter notes"></IonInput>
					</IonCol>
					</IonRow>
					<IonRow>
					<IonCol>
						<IonInput value={followup} onIonChange={(e) => setComplaint(e.detail.value!)} label="Follow Up:" labelPlacement='floating' placeholder="Enter follow up"></IonInput>
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

export default OPDCreatePrescription;