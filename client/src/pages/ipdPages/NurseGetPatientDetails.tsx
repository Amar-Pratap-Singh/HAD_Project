import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import TopToolbar from '../../components/TopToolbar';
import './NurseGetPatientDetails.css';

const NurseGetPaitentDetails: React.FC = () => {

	const [patient, setPatient] = useState({id:0,name:""});
    const [instructions, setInstructions] = useState<any[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setPatient({id:14,name:"Veenu"})
        setInstructions([{id:1,textt:"Testing 1"},{id:32,textt:"Testing 2"}])
	};

	return(
		<div className='get-patient-details'>
			<IonPage>
				<TopToolbar/>
				<IonContent>
				<h1>Patients</h1>
				<IonGrid className='table'>
					<IonRow className='table-header'>
						<IonCol>Patient ID</IonCol>
						<IonCol>Name</IonCol>
					</IonRow>
                    <IonRow>
                        <IonCol>{patient.id}</IonCol>
                        <IonCol>{patient.name}</IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid className='table'>
					<IonRow className='table-header'>
						<IonCol>Patient Instructions</IonCol>
					</IonRow>
					{
						instructions.map(instruction => (
							<IonRow key={instruction.id}>
								<IonCol>{instruction.textt}</IonCol>
							</IonRow>
						))
					}
					
				</IonGrid>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default NurseGetPaitentDetails;