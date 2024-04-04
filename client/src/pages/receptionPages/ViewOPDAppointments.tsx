import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import TopToolbar from '../../components/TopToolbar';
import './styles.css';

const ViewOPDAppointments: React.FC = () => {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
		fetchData();
	}, []);

  const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8081/patient/get-opd-appointments');
			if (!response.ok) {
				throw new Error('Failed to fetch data');
			}
			const data = await response.json();
			setAppointments(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	

	return(
		<div className='view-opd-appts'>
			<IonPage>
        <TopToolbar/>
				<IonContent>
					<h1>OPD Appointments</h1>
          <IonGrid className='table'>
            <IonRow className='table-header'>
              <IonCol>Patient ID</IonCol>
              <IonCol>Name</IonCol>
              <IonCol>Appt Reason</IonCol>
              <IonCol>Appt Date</IonCol>
              <IonCol>Doctor</IonCol>
            </IonRow>
            {
              appointments.map(patient => (
                <IonRow key={patient.patientId}>
                  <IonCol>{patient.patientId}</IonCol>
                  <IonCol>{patient.name}</IonCol>
                  <IonCol>{patient.reason}</IonCol>
                  <IonCol>{patient.appt_date}</IonCol>
                  <IonCol>{patient.doctor}</IonCol>
                </IonRow>
              ))
					}
          </IonGrid>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default ViewOPDAppointments;