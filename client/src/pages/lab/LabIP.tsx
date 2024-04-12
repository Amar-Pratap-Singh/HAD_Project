import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import Header from "../../components/Header";
import "./LabStyle.css";
import { useHistory, useParams } from "react-router";

interface DiagnosticDetails{
  patientId: number;
  doctorId: number;
  reportLink: string;
}

interface PatientDetails {
  name: string;
  patientId: string;
  age: number;
}

const LabIP: React.FC = () => {
  const { patientId } = useParams<{patientId:string}>()
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [diagnosticDetails, setDiagnosticDetails] = useState<DiagnosticDetails[]>([]);
  const history = useHistory();

  useEffect(() => {
    fetchPatientDetails();
    fetchLink();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8081/patient/get-demographics?id=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
  };

  const fetchLink = async () => {
    try {
      const response = await fetch(`http://localhost:8083/diagnosis/get-diagnosis-report?id=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }
      const data = await response.json();
      setDiagnosticDetails(data);
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }  
  };

  const addPatientDiag = (patientId:any) => {
    history.push(`/lab/add-diag/`+ patientId);
  }

  if(!patientDetails){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="view-bill">
      <IonPage>
        <Header />
        <IonContent>
          <h1>Patients</h1>
          <IonGrid>
            <IonRow>
              <IonCol>Name:{patientDetails.name}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Age:{patientDetails.age}</IonCol>
            </IonRow>
            <IonRow>  
              <IonCol>Patient ID:{patientId}</IonCol>
            </IonRow>
            {diagnosticDetails.map((diagnosis,index) => (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>Diagnosis {index + 1}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>  
                    <IonCol>Doctor ID:{diagnosis.doctorId}</IonCol>
                  </IonRow>
                  {/*Abhi bas ye dekhna hai ki link clickable hai ki nhi*/}
                  <IonRow>  
                    <IonCol>Diagnostics Image Link: <a href={'http://localhost:8087/'+ diagnosis.reportLink}>{diagnosis.reportLink}</a></IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
              ))
            }
            <div className="button-container">
                <IonButton onClick={() => addPatientDiag(patientId)}>Add Patient Diagnosis</IonButton>
            </div>
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabIP;
