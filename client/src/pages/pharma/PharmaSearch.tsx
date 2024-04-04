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

const PharmaSearch: React.FC = () => {
  const [pid, setPID] = useState("");

  const handleFormSubmit = () => {
    console.log("Form submitted:", { pid });
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
          </IonGrid>
          <div className="button-container">
            <IonButton onClick={handleFormSubmit} shape="round">
              Search
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default PharmaSearch;
