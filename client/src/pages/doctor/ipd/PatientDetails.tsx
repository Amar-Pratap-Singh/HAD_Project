// import React from "react";
// import {
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardSubtitle,
//   IonCardTitle,
// } from "@ionic/react";
// import Header from "../../../components/Header";

// interface PatientDetails {
//   name: string;
//   patientId: string;
//   age: number;
//   reasonForAdmit: string;
// }

// const patientDetails: PatientDetails = {
//     name: "Veenu",
//     patientId: "14",
//     age: 25,
//     reasonForAdmit: "Fever",
// }

// interface Encounter {
//   notes: string;
//   nurseInstructions: string;
//   medicines: string[];
// }

// const encounters: Encounter[] = [
//   {
//     notes: "Patient has fever and cough",
//     nurseInstructions: "Administer medication every 6 hours",
//     medicines: ["Paracetamol", "Cough syrup"],
//   },
//   {
//     notes: "Patient complains of stomach pain",
//     nurseInstructions: "Give medication after meals",
//     medicines: ["Antacid", "Painkiller"],
//   },
// ];

// const PatientDetails: React.FC = () => {
//   return (
//     <>
//       <Header />
//       <IonCard>
//         <IonCardHeader>
//           <IonCardSubtitle>Patient ID: {patientDetails.patientId}</IonCardSubtitle>
//           <IonCardTitle>{patientDetails.name}</IonCardTitle>
//         </IonCardHeader>
//         <IonCardContent>
//           <p>Age: {patientDetails.age}</p>
//           <p>Reason for Admit: {patientDetails.reasonForAdmit}</p>
//         </IonCardContent>
//       </IonCard>

//       {encounters.map((encounter, index) => (
//         <IonCard key={index}>
//           <IonCardHeader>
//             <IonCardTitle>Encounter {index + 1}</IonCardTitle>
//           </IonCardHeader>
//           <IonCardContent>
//             <p>Notes: {encounter.notes}</p>
//             <p>Nurse Instructions: {encounter.nurseInstructions}</p>
//             <p>Medicines:</p>
//             <ul>
//               {encounter.medicines.map((medicine, index) => (
//                 <li key={index}>{medicine}</li>
//               ))}
//             </ul>
//           </IonCardContent>
//         </IonCard>
//       ))}
//     </>
//   );
// };

// export default PatientDetails;

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
            <p>Notes: {encounter.patientId}</p>
            <p>Nurse Instructions: {encounter.doctorId}</p>
            <p>Medicines:{encounter.prescriptionId}</p>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default PatientDetails;
