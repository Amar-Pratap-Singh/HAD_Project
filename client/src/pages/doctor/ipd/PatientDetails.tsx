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
  const [medicationIds, setMedicationIds] = useState<any[]>([]);
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
  
        const medicationIdsResponse = await fetch(`http://localhost:8085/ipd/get-prescription-medication?prescriptionId=${prescriptionId}`);
        if (!medicationIdsResponse.ok) {
          throw new Error('Failed to fetch medication IDs');
        }
        const medicationIdsData = await medicationIdsResponse.json();
        setMedicationIds(medicationIdsData);
  
        for (let i = 0; i < medicationIdsData.length; i++) {
          const medicationId = medicationIdsData[i].medicationId;
          const medicationResponse = await fetch(`http://localhost:8085/ipd/get-medication?medicationId=${medicationId}`);
          if (!medicationResponse.ok) {
            throw new Error('Failed to fetch medication');
          }
          const medicationData = await medicationResponse.json();
          setMedicationData(prevMedicationData => [...prevMedicationData, medicationData]);
        }
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
      <h1>Advice</h1>
      <p>Notes: {prescriptionData.notes}</p>
      <p>Instructions: {prescriptionData.instructions}</p>
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

export default PatientDetails;
