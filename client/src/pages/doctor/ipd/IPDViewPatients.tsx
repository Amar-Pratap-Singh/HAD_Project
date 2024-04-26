import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useHistory } from 'react-router-dom';
import Header from "../../../components/Header";
import "./IPDViewPatients.css";

const IPDViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const history = useHistory();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        // fetching data from reception service
      const response = await fetch(
        "http://localhost:8081/patient/get-ipd-appointments"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const viewPatientDetails = (patientId: any) => {
    // Navigate to the patient details page with the patient ID
    history.push(`/doctor/ipd/patient-details/` + patientId);
    location.reload()
  };

  const addEncounter = (patientId: any) => {
    // Navigate to the add encounter page
    history.push(`/doctor/ipd/add-encounter/`+ patientId);
  };

  return (
    <div className="view-patients">
      <IonPage>
        <Header />
        <IonContent>
          <h1>Patients</h1>
          <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Patient ID</IonCol>
              <IonCol>Room No</IonCol>
              <IonCol>Ward No</IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol> {/* Add an empty column for spacing */}
            </IonRow>
            {patients.map((patient) => (
              <IonRow key={patient.id}>
                <IonCol>{patient.patientId}</IonCol>
                <IonCol>{patient.bed_no}</IonCol>
                <IonCol>{patient.ward_no}</IonCol>
                <IonCol>
                  {/* Button to view patient details */}
                  <IonButton onClick={() => viewPatientDetails(patient.patientId)}>View Details</IonButton>
                </IonCol>
                <IonCol>
                  {/* Button to add encounter */}
                  <IonButton onClick={() => addEncounter(patient.patientId)}>Add Encounter</IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default IPDViewPatients;