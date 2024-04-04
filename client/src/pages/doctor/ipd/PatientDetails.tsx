import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import Header from "../../../components/Header";

interface PatientDetails {
  name: string;
  patientId: string;
  age: number;
  reasonForAdmit: string;
}

const patientDetails: PatientDetails = {
    name: "Veenu",
    patientId: "14",
    age: 25,
    reasonForAdmit: "Fever",
}

interface Encounter {
  notes: string;
  nurseInstructions: string;
  medicines: string[];
}

const encounters: Encounter[] = [
  {
    notes: "Patient has fever and cough",
    nurseInstructions: "Administer medication every 6 hours",
    medicines: ["Paracetamol", "Cough syrup"],
  },
  {
    notes: "Patient complains of stomach pain",
    nurseInstructions: "Give medication after meals",
    medicines: ["Antacid", "Painkiller"],
  },
];

const PatientDetails: React.FC = () => {
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
            <p>Notes: {encounter.notes}</p>
            <p>Nurse Instructions: {encounter.nurseInstructions}</p>
            <p>Medicines:</p>
            <ul>
              {encounter.medicines.map((medicine, index) => (
                <li key={index}>{medicine}</li>
              ))}
            </ul>
          </IonCardContent>
        </IonCard>
      ))}
    </>
  );
};

export default PatientDetails;
