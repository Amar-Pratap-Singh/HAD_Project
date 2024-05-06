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
import { useHistory, useParams } from "react-router";

interface PatientDetails {
  id: number;
  name: string;
  age: number;
  bloodGroup: string;
  gender: string;
}

interface PatientRecord{
  doctorId: number;
  patientComplaints: string;
  weight: number;
  height: number;
  temperature: number;
  lowBP: number;
  highBP: number;
  prescriptionId: number;
  followUp: string;
};

interface Prescription {
  prescriptionId: number;
  notes: string;
  instructions: string;
  scribbleNotes: string;
  scribbleInstructions: string;
  audioNotes: string;
  audioInstructions: string;
}

interface Medication {
  medicationId: number;
  prescriptionId: number;
  medicineName: string;
  quantity: number;
  time: string;
  duration: string;
}

interface EncounterWrapper {
  patientRecord: PatientRecord;
  prescription: Prescription;
  medications: Medication[];
}

const OPDGetPatientDetails: React.FC = () => {

  const { patientId } = useParams<{ patientId: string }>();
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [encounters, setEncounters] = useState<EncounterWrapper[]>([]);
  const history = useHistory();

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
    } 
    catch (error) {
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

      const encountersData = await Promise.all(data.map(async (item: any) => {

        const prescriptionResponse = await fetch(`http://localhost:8085/ipd/get-prescription?prescriptionId=${item.prescriptionId}`);
        if (!prescriptionResponse.ok) {
          throw new Error('Failed to fetch prescription');
        }
        const prescriptionData = await prescriptionResponse.json();

        const medicationResponse = await fetch(`http://localhost:8085/ipd/get-medication-by-prescription-id?prescriptionId=${item.prescriptionId}`);
        if (!medicationResponse.ok) {
          throw new Error('Failed to fetch medication');
        }
        const medicationData = await medicationResponse.json();

        return {
          encounter: item,
          prescription: prescriptionData,
          medications: medicationData
        }
      }))

      setEncounters(encountersData);
    }
     catch (error) {
      console.error('Error fetching patient records:', error);
    }
  };

  const viewDiagnosisReport = () => {
    history.push(`/doctor/diagnosis-report/` + patientId);
  }



  return (
    <IonPage>
      <Header/>
      <IonContent>

        <div className="border-2 border-solid border-black mx-10 my-5 p-3">
          <p>Patient ID: {patientDetails?.id}</p>
          <p>Name: {patientDetails?.name}</p>
          <p>Age: {patientDetails?.age}</p>
          <p>Gender: {patientDetails?.gender}</p>
          <p>Blood Group: {patientDetails?.bloodGroup}</p>
        </div>

        <IonButton onClick={viewDiagnosisReport}> Diagnosis Report </IonButton>

        {encounters.map((encounter, index) => (
          <div key={index} className="border-2 border-solid border-black mx-10 my-5 p-3 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Encounter {index + 1}</h1>
            
            <p>Doctor Id: {encounter.patientRecord?.doctorId}</p>

            <p>Patient Complaint: {encounter.patientRecord?.patientComplaints}</p>
            <p>Weight: {encounter.patientRecord?.weight} kg</p>
            <p>Height: {encounter.patientRecord?.height} cm</p>
            <p>Temperature: {encounter.patientRecord?.temperature}</p>
            <p>Blood Pressure: {encounter.patientRecord?.highBP}/{encounter.patientRecord?.lowBP} mmHg</p>

            <p>Notes: {encounter.prescription?.notes}</p>
            <p>Advice: {encounter.prescription?.instructions}</p>

            <h2 className="text-xl font-semibold">Medicines</h2>
            <ul className="flex flex-col gap-4">
              {encounter.medications.map((medication,index) => (
                <li key={index}>
                  <h3 className="text-lg font-semibold">Medicine {index + 1}</h3>
                  <p>Name: {medication.medicineName}</p>
                  <p>Quantity: {medication.quantity}</p>
                  <p>Time: {medication.time}</p>
                  <p>Duration: {medication.duration}</p>
                </li>
              ))}
            </ul>

            <p>Follow up:{encounter.patientRecord?.followUp}</p>
          </div>
        ))}  
      </IonContent>
    </IonPage>
  );
};

export default OPDGetPatientDetails;
