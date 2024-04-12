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
import "./LabStyle.css";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type FormInputs = {
  doctorId: number;
  reportLink: string;
};

const LabAddDiag: React.FC = () => {
  const { control, handleSubmit, reset } = useForm();
  const { patientId } = useParams<{ patientId: string }>();
  const history = useHistory();

  const handleFormSubmit = async (data: any) => {
    const riyal_data = {
      "doctorId":data.doctorId,
      "reportLink":data.reportLink,
      "patientId":patientId
    }
    console.log(riyal_data)
    try{
      const response = await fetch(`http://localhost:8083/diagnosis/add-diagnosis-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(riyal_data),
      });
      if (!response.ok) {
        throw new Error('Error adding patient diagnostics');
      }

      
      // Clear the form after successful submission
      reset();

      console.log('Success');

    } catch(error){
      console.error('Error adding patient diagnostics', error);
    }
  };

  return (
    <div className="add-lab-ip">
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <h1>Create New Diagnosis Report</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  {/*Abhi doctorID le rhe hai as Input. Backend pe changes ke baad doctorId apne aap pass hogi isme*/}
                  <TextInput
                    name="doctorId"
                    placeHolder="Enter doctor ID"
                    label="Doctor ID"
                    control={control}
                  />
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                  <TextInput
                    name="reportLink"
                    placeHolder="Enter report Link"
                    label="Report Link"
                    control={control}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className="button-container">
              <IonButton type="submit" shape="round">
                Add Report
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default LabAddDiag;