import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './OPDGetPatientDetails.css';

const OPDGetPatientDetails: React.FC = () => {

	const [patient, setPatient] = useState({id:0,name:""});
    const [history, setHistory] = useState<any[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setPatient({id:14,name:"Veenu"})
        setHistory([{id:1,numb:1},{id:32,numb:2}])
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
					{
						history.map(hist => (
							<IonRow key={hist.id}>
								<IonCol>Record #{hist.numb}</IonCol>
							</IonRow>
						))
					}
				</IonGrid>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default OPDGetPatientDetails;