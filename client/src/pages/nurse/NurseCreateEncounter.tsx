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
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type FormInputs = {
  temperature: number;
  lowBP: number;
  highBP: number;
  healthCondition: string;
};

const NurseCreateEncounter: React.FC = () => {
  const { control, handleSubmit, reset } = useForm();
  const { patientId } = useParams<{ patientId: string }>();

  const user = useSelector((state: any) => state.user.currentUser);

  const handleFormSubmit = async (data: any) => {
    const riyal_data = {
      "temperature":data.temperature,
      "highBP":data.lowBP,
      "lowBP":data.highBP,
      "healthCondition":data.healthCondition,
      "patientId":patientId,
      "nurseId":user.id
    }
    console.log(riyal_data)
    try{
      const response = await fetch(`http://localhost:8085/ipd/add-nurse-encounter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riyal_data),
      });
      if (!response.ok) {
        throw new Error('Error adding patient record');
      }

      
      // Clear the form after successful submission
      reset();

      console.log('Success');

    } catch(error){
      console.error('Error adding patient record:', error);
    }
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
                  Blood Pressure:
                </IonCol>
                <IonCol>
                  <TextInput
                    name="lowBP"
                    placeHolder=""
                    label=""
                    control={control}
                  />
                </IonCol>
                <IonCol>
                  <TextInput
                    name="highBP"
                    placeHolder=""
                    label=""
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="temperature"
                    placeHolder="Enter temperature"
                    label="Temperature(F)"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="healthCondition"
                    placeHolder="Enter health condition"
                    label="Health Condition"
                    control={control}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className="button-container">
              <IonButton type="submit" shape="round">
                Add Encounter
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default NurseCreateEncounter;
