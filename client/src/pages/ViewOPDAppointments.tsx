import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';

const ViewOPDAppointments: React.FC = () => {

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setAppointments([{id:13,name:"Veenu",appt_reason:"Test",appt_date:"11th Sep 2001",doctor:"Amar Pratap Singh"},{id:13,name:"Sujit",appt_reason:"Test",appt_date:"11th Sep 2001",doctor:"Amar Pratap Singh"}])
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
                <IonRow key={patient.id}>
                  <IonCol>{patient.id}</IonCol>
                  <IonCol>{patient.name}</IonCol>
                  <IonCol>{patient.appt_reason}</IonCol>
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