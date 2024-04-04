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
import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Header from "../../components/Header";
import "./NurseCreateEncounter.css";

type FormInputs = {
  bp: string;
  bpm: string;
  temp: string;
  o2: string;
};

const NurseCreateEncounter: React.FC = () => {
  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", { data });
    reset();
  };

  return (
    <div className="create-prescription">
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <h1>Create Encounter</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="bp"
                    placeHolder="Enter blood pressure"
                    label="Blood Pressure"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="bpm"
                    placeHolder="Enter heart rate"
                    label="Heart Rate(bpm)"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="temp"
                    placeHolder="Enter temperature"
                    label="Temperature(F)"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="o2"
                    placeHolder="Enter oxygen level"
                    label="Oxygen Level"
                    control={control}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className="button-container">
              <IonButton type="submit" shape="round">
                Create Prescription
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default NurseCreateEncounter;
