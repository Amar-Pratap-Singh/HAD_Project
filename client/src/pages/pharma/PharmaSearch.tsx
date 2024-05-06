import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonInput,
} from "@ionic/react";
import Header from "../../components/Header";
import "./PharmaStyle.css";
import DrawingImage from "../../toolkit/DrawingImage";
import AudioPlayback from "../../toolkit/AudioPlayback";

interface Encounter {
  patientId: number;
  doctorId: number;
  prescriptionId: number;
}

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
  encounter: Encounter;
  prescription: Prescription;
  medications: Medication[];
}


const PharmaSearch: React.FC = () => {
  const [patientId, setPatientId] = useState("");
  const [encounters, setEncounters] = useState<EncounterWrapper[]>([]);
  const [encountersFetched, setEncountersFetched] = useState(false);

  useEffect(() => {
    // fetchPatientDetails();
    fetchLatestEncounters();
  }, []);

  const fetchLatestEncounters = async () => {
    try {

      const response = await fetch(`http://localhost:8085/ipd/get-latest-doctor-encounter-by-patient-id?patientId=`+ patientId);
      if (!response.ok) {
        throw new Error('Failed to fetch encounters');
      }
      const encounterData = await response.json();
      console.log(encounterData);
      

      const prescriptionResponse = await fetch(`http://localhost:8085/ipd/get-prescription?prescriptionId=${encounterData.prescriptionId}`);
      if (!prescriptionResponse.ok) {
        throw new Error('Failed to fetch prescription');
      }
      const prescriptionData = await prescriptionResponse.json();
      console.log(prescriptionData);
      const medicationResponse = await fetch(`http://localhost:8085/ipd/get-medication-by-prescription-id?prescriptionId=${encounterData.prescriptionId}`);
      if (!medicationResponse.ok) {
        throw new Error('Failed to fetch medication');
      }
      const medicationData = await medicationResponse.json();

      const encounter =  {
        encounter: encounterData,
        prescription: prescriptionData,
        medications: medicationData
      }

      setEncounters([encounter]);
      setEncountersFetched(true);

      console.log(encounter);
    }
    catch (error) {
      console.error('Error fetching encounters:', error);
    }
  } 
  const handleFormSubmit = () => {
    console.log("Form submitted: ", { patientId });

    setPatientId(patientId);
    fetchLatestEncounters();
  };
  const handleBackToForm = () => {
    // Reset patientId and encounters
    setPatientId("");
    setEncounters([]);
    setEncountersFetched(false);

  };
  return (
    <div className="view-patient">
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <h1>Search Patient</h1>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonInput
                  value={patientId}
                  onIonChange={(e) => setPatientId(e.detail.value!)}
                  label="Patient ID:"
                  labelPlacement="floating"
                  placeholder="Enter patient ID"
                ></IonInput>
              </IonCol>
            </IonRow>
          </IonGrid>
          <div className="button-container">
            <IonButton onClick={handleFormSubmit} shape="round">
              Search
            </IonButton>
          </div>
          {encountersFetched && (
            <IonButton onClick={handleBackToForm} color="light" className="back-button" shape="round">
              X
            </IonButton>
          )}
          {encounters.map((encounter, index) => (
            
          <div key={index} className="border-2 border-solid border-black mx-10 my-5 p-3 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Encounter {index + 1}</h1>
            <p>Doctor Id: {encounter.encounter.doctorId}</p>

            <p>Notes: {encounter.prescription?.notes}</p>
            <DrawingImage imageData={encounter.prescription?.scribbleNotes}/>
            <AudioPlayback audioData={encounter.prescription?.audioNotes}/>

            <p>Instructions: {encounter.prescription?.instructions}</p>
            <DrawingImage imageData={encounter.prescription?.scribbleInstructions}/>
            <AudioPlayback audioData={encounter.prescription?.audioInstructions}/>

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
          </div>
        ))}
        </IonContent>
      </IonPage>
    </div>
  );
};

export default PharmaSearch;
