import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";
import "./OPDViewPatients.css";

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
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
	

  const viewPatientDetails = (patientId: any) => {
    // Navigate to the patient details page with the patient ID
    history.push(`/doctor/opd/patient-details/` + patientId);
    location.reload()
  };

  const createPrescription = (patientId: any) => {
    // Navigate to the add encounter page
    history.push(`/doctor/opd/create-prescription/`+ patientId);
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
            <IonCol>Appt Date</IonCol>
            <IonCol></IonCol>
            <IonCol></IonCol>
          </IonRow>
          {
            appointments.map(patient => (
              <IonRow key={patient.patientId}>
                <IonCol>{patient.patientId}</IonCol>
                <IonCol>{patient.name}</IonCol>
                <IonCol>{patient.appt_date}</IonCol>
                <IonCol>
                  {/* Button to view patient details */}
                  <IonButton onClick={() => viewPatientDetails(patient.patientId)}>View Details</IonButton>
                </IonCol>
                <IonCol>
                  {/* Button to view patient details */}
                  <IonButton onClick={() => createPrescription(patient.patientId)}>Create Prescription</IonButton>
                </IonCol>
              </IonRow>
            ))
        }
        </IonGrid>
      </IonContent>
    </IonPage>
	);
};

export default OPDViewPatients;
