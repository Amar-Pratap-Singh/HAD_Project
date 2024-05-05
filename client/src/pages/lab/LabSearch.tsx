import React,  { useState, useEffect } from "react";
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import Header from "../../components/Header";
import "./LabStyle.css";

interface PatientDetails {
  id: number;
  name: string;
  age: number;
  bloodGroup: string;
  gender: string;
}

const LabSearch: React.FC = () => {
  const [pid, setPID] = useState("");
  const [patientDetails, setPatientDetails] = useState<PatientDetails>();
  const [fileChoose, setFileChoose] = useState(false);

  const handleFormSubmit = () => {
    setFileChoose(true);
    fetchPatientDetails();
  };


  const addDiagnosisReport = async () => {
    var fileInput = document.querySelector('input[type="file"]');
    if (fileInput instanceof HTMLInputElement) {
      // Get the selected file(s)
      var files = fileInput.files;

      // Check if any file is selected
      if (files && files.length > 0) {
          // Assuming you want to upload only the first file selected
          
          for (var i=0; i<files.length ;i++){

            var file = files[i];
            var formData = new FormData();
            
            formData.append("file", file);
            formData.append("patientId", pid);
            console.log(formData);

            const path = getDiagnosisImagePath(formData);

            var data = {
              "path": path, 
              "patientId": pid
            }

            // addDiagnosisImage(data);
        }
      } 
      else {
          console.log("No file selected");
          // Handle case where no file is selected
      }
    }
  }

  const getDiagnosisImagePath = async (formData:any) => {
    try {
      const response = await fetch(`http://localhost:8087/lab/get-diagnosis-file-path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      return data;

    } catch (error) {
      console.error("Error fetching file path:", error);
    }
  }

  const addDiagnosisImage = async (data:any) => {
    try {
      const response = await fetch(`http://localhost:8087/lab/add-diagnosis-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

    } catch (error) {
      console.error("Error fetching file path:", error);
    }
  }

  const fetchPatientDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/patient/get-demographics?id=` + pid
      );
      if (!response.ok) {
        throw new Error("Failed to fetch patient details");
      }
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
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
                  value={pid}
                  onIonChange={(e) => setPID(e.detail.value!)}
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

          {fileChoose && (
            <>
              <div className="border-2 border-solid border-black mx-10 my-5 p-3">
                <p>Patient ID: {patientDetails?.id}</p>
                <p>Name: {patientDetails?.name}</p>
                <p>Age: {patientDetails?.age}</p>
                <p>Gender: {patientDetails?.gender}</p>
                <p>Blood Group: {patientDetails?.bloodGroup}</p>
              </div>

              <form id="fileUploadForm">
                <input type="file" name="file" multiple></input>
                <IonButton onClick={addDiagnosisReport}>
                  Add Diagnosis Report
                </IonButton>
              </form>
            </>
          )}
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabSearch;
