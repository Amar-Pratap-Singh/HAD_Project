import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from "@ionic/react";
import Header from "../../../components/Header";
import "./OPDGetPatientDetails.css";
import { useParams } from "react-router";

interface PatientDetails {
  name: string;
  patientId: number;
  age: number;
}

interface PatientRecord{
  patientComplaints: string;
  weight: number;
  height: number;
  temperature: number;
  lowBP: number;
  highBP: number;
  prescriptionId: number;
  // medicines: {
  //   medicineName: string;
  //   count: number;
  //   time: string;
  //   duration: number;
  // }[];
  // notes:string;
  // advice: string;
  followUp: string;
};


const OPDGetPatientDetails: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [patientRecords , setPatientRecords] = useState<PatientRecord[]>([]); 

  useEffect(() => {
    fetchPatientDetails();
    fetchPatientRecords();
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

  const fetchPatientRecords = async () => {
    try {
      const response = await fetch(`http://localhost:8083/opd/get-patient-records-patient-id?id=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch patient records');
      }
      const data = await response.json();
      setPatientRecords(data);

    } catch (error) {
      console.error('Error fetching patient records:', error);
    }
  };

  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="get-patient-details">
      <IonPage>
        <Header />
        <IonContent>
          <h1>Patient Details</h1>
          <IonGrid className="table">
            <IonRow>
              <IonCol>Patient Name</IonCol>
              <IonCol>{patientDetails.name}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Patient Age</IonCol>
              <IonCol>{patientDetails.age}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Patient ID</IonCol>
              <IonCol>{patientId}</IonCol>
            </IonRow>

            {patientRecords.map((record,index) => (
                <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>Record {index + 1}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonRow>
                    <IonCol>Complaint:</IonCol>
                    <IonCol>{record.patientComplaints}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Weight:{record.weight}</IonCol>
                    <IonCol>Height:{record.height}</IonCol>
                    <IonCol>Temperature:{record.temperature} F</IonCol>
                    <IonCol>Blood Pressure:{record.highBP}/{record.lowBP} mmHg</IonCol>
                  </IonRow>

             
                  <PrescriptionData prescriptionId={record.prescriptionId} />
                  {/* <IonRow class='table-header'>
                    <IonCol>Medicines:</IonCol>
                  </IonRow> */}
                  {/* <IonRow>
                    <IonCol>Medicine Name</IonCol>
                    <IonCol>Quantity</IonCol>
                    <IonCol>Time</IonCol>
                    <IonCol>Duration</IonCol>
                  </IonRow>
                  {
                    record.medicines.map((medicine,index) => (
                      <IonRow key={index}>
                        <IonCol>{medicine.medicineName}</IonCol>
                        <IonCol>{medicine.count}</IonCol>
                        <IonCol>{medicine.time}</IonCol>
                        <IonCol>{medicine.duration}</IonCol>
                      </IonRow>
                    ))
                  } */}
                  {/* <IonRow>
                    <IonCol>Notes:</IonCol>
                    <IonCol>{record.notes}</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Advice:</IonCol>
                    <IonCol>{record.advice}</IonCol>
                  </IonRow> */}
                  <IonRow>
                    <IonCol>Follow-up:</IonCol>
                    <IonCol>{record.followUp}</IonCol>
                  </IonRow>
                </IonCardContent>
              </IonCard>
              ))
            }
          </IonGrid>
        </IonContent>
      </IonPage>
    </div>
  );
};



interface PrescriptionDataProps {
  prescriptionId: any;
}

const PrescriptionData: React.FC<PrescriptionDataProps> = ({ prescriptionId }) => {
  const [prescriptionData, setPrescriptionData] = useState<any | null>(null);
  const [medicationData, setMedicationData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prescriptionResponse = await fetch(`http://localhost:8085/ipd/get-prescription?prescriptionId=${prescriptionId}`);
        if (!prescriptionResponse.ok) {
          throw new Error('Failed to fetch prescription');
        }
        const prescriptionData = await prescriptionResponse.json();
        setPrescriptionData(prescriptionData);
  

        const medicationDataResponse = await fetch(`http://localhost:8085/ipd/get-medication-by-prescription-id?prescriptionId=${prescriptionId}`);
        if (!medicationDataResponse.ok) {
          throw new Error('Failed to fetch medication IDs');
        }
        const medicationData = await medicationDataResponse.json();
        setMedicationData(medicationData);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [prescriptionId]);

  if (!prescriptionData) {
    return <p>Loading prescription data...</p>;
  }

  return (
    <>
      <br></br>
      <p>Notes: {prescriptionData.notes}</p>
      <p>Advice: {prescriptionData.instructions}</p>
      <br></br>
      <h1> Medication </h1>
      <ul>
        {medicationData.map((medication) => (
          <li key={medication.medicationId}>
            <p>Name: {medication.medicineName}</p>
            <p>Quantity: {medication.quantity}</p>
            <p>Time: {medication.time}</p>
            <p>Duration: {medication.duration}</p>
            <br></br>
          </li>
        ))}

      </ul>
    </>
  );
};

export default OPDGetPatientDetails;
