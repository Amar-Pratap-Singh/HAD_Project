import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useHistory } from 'react-router-dom';
import Header from "../../../components/Header";

const IPDViewPatients: React.FC = () => {

  const [patients, setPatients] = useState<any[]>([]);
  const history = useHistory();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/patient/get-ipd-appointments"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPatients(data);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const viewPatientDetails = (patientId: any) => {
    //navigate to the patient details page
    history.push(`/doctor/ipd/patient-details/` + patientId);
    location.reload()
  };

  const addEncounter = (patientId: any) => {
    //navigate to the add encounter page
    history.push(`/doctor/ipd/add-encounter/`+ patientId);
  };

  return (
    <IonPage>
      <Header />
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>IPD Patients</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol size="1">Patient ID</IonCol>
            <IonCol size="1">Ward No</IonCol>
            <IonCol size="1">Bed No</IonCol>
            <IonCol>Dept</IonCol>
            <IonCol>Doctor</IonCol>
            <IonCol>Details</IonCol>
            <IonCol>Add Encounter</IonCol>
            <IonCol>Discharge</IonCol>
          </IonRow>
          {
            patients.map(patient => (
              <IonRow key={patient.patientId}>
                <IonCol size="1">{patient.patientId}</IonCol>
                <IonCol size="1">{patient.wardNo}</IonCol>
                <IonCol size="1">{patient.bedNo}</IonCol>
                <IonCol>{patient.department}</IonCol>
                <IonCol>{patient.doctorName}</IonCol>
                <IonCol><IonButton size="small" onClick={() => viewPatientDetails(patient.patientId)}>View</IonButton></IonCol>
                <IonCol><IonButton size="small" onClick={() => addEncounter(patient.patientId)}>Add</IonButton></IonCol>
                <IonCol><IonButton size="small" onClick={() => console.log('discharge')}>Discharge</IonButton></IonCol>
              </IonRow>
            ))
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IPDViewPatients;