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
import "./LabStyle.css";
import { useHistory } from "react-router";

const LabSearch: React.FC = () => {
  const [pid, setPID] = useState("");
  const history  = useHistory();

  const handleFormSubmit = (patientId:any) => {
    history.push(`/lab/ip/`+ patientId);
    setPID("");
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
            <div className="button-container">
                <IonButton onClick={() => handleFormSubmit(pid)}>View Patient Details</IonButton>
            </div>
          </IonGrid>
          
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabSearch;
