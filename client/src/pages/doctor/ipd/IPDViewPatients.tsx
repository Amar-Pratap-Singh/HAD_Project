import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
} from "@ionic/react";
import { Route, useHistory, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import "./IPDViewPatients.css";

const IPDViewPatients: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const { wardNo } = useParams<{ wardNo: any }>();
  const history = useHistory();

  useEffect(() => {
    console.log(wardNo);
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
    location.reload();
  };

  const addEncounter = (patientId: any) => {
    // Navigate to the add encounter page
    history.push(`/doctor/ipd/add-encounter/` + patientId);
  };

  return (
    <div className="view-patients">
      <IonPage>
        <Header />

        <IonContent>
          <h1>Patients</h1>
          {/* <IonGrid className="table">
            <IonRow className="table-header">
              <IonCol>Patient ID</IonCol>
              <IonCol>Room No</IonCol>
              <IonCol>Ward No</IonCol>
              <IonCol></IonCol>
              <IonCol></IonCol>
            </IonRow> */}
            <div className="container-bed">
              {patients.map((patient, key) => (
                (patient.ward_no == wardNo) &&
                <div key={key} className={`block-bed`}>
                    PatientId: {patient.patientId}
                    <br></br>
                    Bed No: {patient.bed_no}
                   
                    <IonButton style={{'width':'100%'}} onClick={() => viewPatientDetails(patient.patientId)}>View Details</IonButton>
                    <IonButton style={{'width':'100%'}} onClick={() => addEncounter(patient.patientId)}>Add Encounter</IonButton>
                </div>
              ))}
            </div>
          {/* </div>
            {patients.map((patient) => (
              <IonRow key={patient.id}>
                <IonCol>{patient.patientId}</IonCol>
                <IonCol>{patient.bed_no}</IonCol>
                <IonCol>{patient.ward_no}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => viewPatientDetails(patient.patientId)}
                  >
                    View Details
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton onClick={() => addEncounter(patient.patientId)}>
                    Add Encounter
                  </IonButton>
                </IonCol>
              </IonRow>
            ))} */}
          {/* </IonGrid> */}
        </IonContent>
      </IonPage>
    </div>
  );
};

export default IPDViewPatients;