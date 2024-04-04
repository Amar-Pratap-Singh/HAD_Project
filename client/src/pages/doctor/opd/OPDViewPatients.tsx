import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import Header from "../../../components/Header";
import "./OPDViewPatients.css";

const OPDViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/patient/get-all-patients"
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

  return (
    <div className="view-patients">
      <IonPage>
        <Header />
        <IonContent>
          <h1>Patients</h1>
          <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Patient ID</IonCol>
              <IonCol>Name</IonCol>
              <IonCol>Age</IonCol>
              <IonCol>Gender</IonCol>
              <IonCol>Blood Group</IonCol>
              <IonCol>Phone No</IonCol>
              <IonCol>Address</IonCol>
            </IonRow>
            {patients.map((patient) => (
              <IonRow key={patient.id}>
                <IonCol>{patient.id}</IonCol>
                <IonCol>{patient.name}</IonCol>
                <IonCol>{patient.age}</IonCol>
                <IonCol>{patient.gender}</IonCol>
                <IonCol>{patient.bloodGroup}</IonCol>
                <IonCol>{patient.phoneNo}</IonCol>
                <IonCol>{patient.address}</IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default OPDViewPatients;
