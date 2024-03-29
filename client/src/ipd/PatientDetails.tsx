import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';


interface PatientDetailsProps {
    name: string;
    patientId: string;
    age: number;
    reasonForAdmit: string;
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

const PatientDetails: React.FC<PatientDetailsProps> = ({ name, patientId, age, reasonForAdmit }) => {
    return (
        <>
            <TopToolbar />
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Patient ID: {patientId}</IonCardSubtitle>
                    <IonCardTitle>{name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <p>Age: {age}</p>
                    <p>Reason for Admit: {reasonForAdmit}</p>
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