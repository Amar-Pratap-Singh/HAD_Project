import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import Header from "../../../components/Header";
import { useParams } from "react-router";
import DrawingImage from "../../../toolkit/DrawingImage";
import AudioPlayback from "../../../toolkit/AudioPlayback";

interface PatientDetails {
  name: string;
  patientId: string;
  age: number;
  reasonForAdmit: string;
}

interface Encounter {
  patientId: number;
  doctorId: number;
  prescriptionId: number;
}


const PatientDetails: React.FC = () => {

  const { patientId } = useParams<{ patientId: string }>();
  console.log(patientId);
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [encounters, setEncounters] = useState<Encounter[]>([]);

  useEffect(() => {
    fetchPatientDetails();
    fetchEncounters();
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


  const fetchEncounters = async () => {
    try {
      const response = await fetch(`http://localhost:8085/ipd/get-doctor-encounter-by-patient-id?patientId=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch encounters');
      }
      const data = await response.json();
      setEncounters(data);

    } catch (error) {
      console.error('Error fetching encounters:', error);
    }
  };





  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>Patient ID: {patientDetails.patientId}</IonCardSubtitle>
          <IonCardTitle>{patientDetails.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Age: {patientDetails.age}</p>
          <p>Reason for Admit: {patientDetails.reasonForAdmit}</p>
        </IonCardContent>
      </IonCard>

      {encounters.map((encounter, index) => (
        <IonCard key={index}>
          <IonCardHeader>
            <IonCardTitle>Encounter {index + 1}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {/* <p>Notes: {encounter.patientId}</p>
            <p>Nurse Instructions: {encounter.doctorId}</p>
            <p>Medicines:{encounter.prescriptionId}</p> */}
            <PrescriptionData prescriptionId={encounter.prescriptionId} />
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};


interface PrescriptionDataProps {
  prescriptionId: any;
}

const PrescriptionData: React.FC<PrescriptionDataProps> = ({ prescriptionId }) => {
  const [prescriptionData, setPrescriptionData] = useState<any | null>(null);
  // const [medicationIds, setMedicationIds] = useState<any[]>([]);
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
    <div>
      <>
        <h1>Advice</h1>
        <p>Notes: {prescriptionData.notes}</p>
        <DrawingImage imageData={prescriptionData.scribbleNotes}/>
        <AudioPlayback audioData={prescriptionData.audioNotes}/>

        <p>Instructions: {prescriptionData.instructions}</p>
        <DrawingImage imageData={prescriptionData.scribbleInstructions}/>
        <AudioPlayback audioData={prescriptionData.audioInstructions}/>

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
    </div>
  );
};

export default PatientDetails;
