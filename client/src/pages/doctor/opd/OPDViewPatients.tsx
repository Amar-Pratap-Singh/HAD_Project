import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";

const OPDViewPatients: React.FC = () => {

  const history = useHistory();
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
		} 
    catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	
  const viewPatientDetails = (patientId: any) => {
    //navigate to the patient details page
    history.push(`/doctor/opd/patient-details/` + patientId);
    location.reload()
  };

  const createPrescription = (patientId: any) => {
    //navigate to the add encounter page
    history.push(`/doctor/opd/create-prescription/`+ patientId);
  };

	return(
    <IonPage>
      <Header/>
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>OPD Appointments</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol size="1">Patient ID</IonCol>
            <IonCol size="2">Doctor</IonCol>
            <IonCol size="2">Reason</IonCol>
            <IonCol>View Details</IonCol>
            <IonCol>Add Prescription</IonCol>
            <IonCol>Refer to IPD</IonCol>
          </IonRow>
          {appointments.map(appt => (
            <IonRow key={appt.patientId}>
              <IonCol size="1">{appt.patientId}</IonCol>
              <IonCol size="2">{appt.doctor}</IonCol>
              <IonCol size="2">{appt.appt_date}</IonCol>
              <IonCol><IonButton size="small" onClick={() => viewPatientDetails(appt.patientId)}>View</IonButton></IonCol>
              <IonCol><IonButton size="small" onClick={() => createPrescription(appt.patientId)}>Add</IonButton></IonCol>
              <IonCol><IonButton size="small" onClick={() => console.log('refer')}>Refer</IonButton></IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
	);
};

export default OPDViewPatients;
