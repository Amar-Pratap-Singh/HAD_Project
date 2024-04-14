import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from "@ionic/react";
import { useHistory } from 'react-router-dom';
import Header from "../../../components/Header";

const IPDViewPatients: React.FC = () => {

  const [patients, setPatients] = useState<any[]>([]);
  const history = useHistory();
  
  const dummyPatients = [
    { patientId: 1, bed_no: "B001", ward_no: "W001" },
    { patientId: 2, bed_no: "B002", ward_no: "W002" },
    { patientId: 3, bed_no: "B003", ward_no: "W003" },
    { patientId: 4, bed_no: "B004", ward_no: "W004" },
    { patientId: 5, bed_no: "B005", ward_no: "W005" },
    { patientId: 6, bed_no: "B006", ward_no: "W006" },
    { patientId: 7, bed_no: "B007", ward_no: "W007" },
    { patientId: 8, bed_no: "B008", ward_no: "W008" },
    { patientId: 9, bed_no: "B009", ward_no: "W009" },
    { patientId: 10, bed_no: "B010", ward_no: "W010" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //fetching data from reception service
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
  }

  const viewPatientDetails = (patientId: any) => {
    //navigate to the patient details page with the patient ID
    history.push(`/doctor/ipd/patient-details/` + patientId);
    location.reload()
  }

  const addEncounter = (patientId: any) => {
    //navigate to the add encounter page
    history.push(`/doctor/ipd/add-encounter/`+ patientId);
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <h1 className='text-center text-xl font-semibold my-5'>IPD Patients</h1>
        <IonGrid className="border-2 border-solid border-black mx-20 mb-5">
          <IonRow className="border-b-2 border-solid border-black font-semibold">
            <IonCol>Patient ID</IonCol>
            <IonCol>Room No</IonCol>
            <IonCol>Ward No</IonCol>
            <IonCol>View Details</IonCol>
            <IonCol>Add Encounter</IonCol>
          </IonRow>
          {dummyPatients.map((patient) => (
            <IonRow key={patient.patientId} className="flex flex-row items-center">
              <IonCol>{patient.patientId}</IonCol>
              <IonCol>{patient.bed_no}</IonCol>
              <IonCol>{patient.ward_no}</IonCol>
              <IonCol><IonButton onClick={() => viewPatientDetails(patient.patientId)}>View Details</IonButton></IonCol>
              <IonCol><IonButton onClick={() => addEncounter(patient.patientId)}>Add Encounter</IonButton></IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default IPDViewPatients;
