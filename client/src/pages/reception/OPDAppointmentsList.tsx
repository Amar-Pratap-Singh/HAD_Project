import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

const OPDAppointmentsList: React.FC = () => {

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
    <IonPage>
      <Header/>
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>OPD Appointments</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
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
	);
}

export default OPDAppointmentsList;