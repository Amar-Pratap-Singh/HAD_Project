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
import { useFieldArray, useForm } from "react-hook-form";
import Header from "../../../components/Header";
import TextInput from "../../../components/TextInput";
import "./OPDCreatePrescription.css";

type FormInputs = {
  patientComplaints: string;
  weight: number;
  height: number;
  temperature: number;
  lowBP: number;
  highBP: number;
  medicines: {
    medicineName: string;
    count: number;
    instruction: string;
  }[];
  advice: string;
  followUp: string;
};

const OPDCreatePrescription: React.FC = () => {
  const { register,control, handleSubmit, reset } = useForm();

  const {fields,append,remove} = useFieldArray({
    name:'medicines',
    control
  });

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", { data });
    reset();
  };

  return (
    <div className="create-prescription">
      <IonPage>
        <Header />
        <IonContent className="ion-padding">
          <h1>Create Prescription</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="patientComplaints"
                    placeHolder="Enter complaint"
                    label="Complaint:"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="weight"
                    placeHolder="Enter weight"
                    label="Weight:"
                    control={control}
                  />
                </IonCol>
                <IonCol>
                  <TextInput
                    name="height"
                    placeHolder="Enter height"
                    label="Height:"
                    control={control}
                  />
                </IonCol>
                <IonCol>
                  <TextInput
                    name="temperature"
                    placeHolder="Enter temperature(F)"
                    label="Temperature:"
                    control={control}
                  />
                </IonCol>
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
              {
                fields.map((field,index) => {
                  return (
                    <IonRow key={field.id}>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Name"
                        {...register(`medicines.${index}.medicineName`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Quantity"
                        {...register(`medicines.${index}.count`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Instructions"
                        {...register(`medicines.${index}.instruction`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <div className="button-container">
                        <IonButton onClick={() => remove(index)} shape="round">
                          Delete
                        </IonButton>
                      </div>
                    </IonCol>
                  </IonRow>
                  );
              })}
              <div className="button-container">
                <IonButton
                  onClick={() =>
                    append({
                      medicineName: "",
                      count: "",
                      instruction: "",
                    })
                  }
                  shape="round"
                >
                  Add Medicines
                </IonButton>
              </div>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="advice"
                    placeHolder="Enter advice"
                    label="Advice:"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="followUp"
                    placeHolder="Enter followup"
                    label="Follow Up:"
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

export default OPDCreatePrescription;
