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
import { useParams } from "react-router";
import { useSelector } from "react-redux";

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
    time: string;
    duration: number;
  }[];
  advice: string;
  followUp: string;
};

const OPDCreatePrescription: React.FC = () => {
  const { register,control, handleSubmit, reset } = useForm(); 
  const { patientId } = useParams<{ patientId: string }>();

  const user = useSelector((state: any) => state.user.currentUser);

  const {fields,append,remove} = useFieldArray({
    name:'medicines',
    control
  });


  // handle medication
  const handleMedication = async (data: any, prescriptionId: any) =>{
    const medication_data = {
      "prescriptionId": prescriptionId,
      "medicineName": data.medicineName,
      "quantity": data.count,
      "time": data.time,
      "duration": data.duration
    } 
    console.log(medication_data)
    console.log("Prescription Id is: " + prescriptionId)
    try{
      const response = await fetch("http://localhost:8085/ipd/add-medication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication_data),
      });

      var responseData = await response.json();
      if (!response.ok) {
        throw new Error('Error adding medication');
      }

      // Clear the form after successful submission
      reset();

      console.log('Medication added successfully');

    } catch(error){
      console.error('Error adding medication:', error);
    }
}


  
  const handleFormSubmit = async (data: any) => {

    console.log("Form submitted:", {...data,"patientId":patientId,"doctorId":user.id});
    // Add prescription
    var medicationId;
    var prescriptionId;
    var responseData; 

    const prescription_data = {
      "notes":data.notes,
      "instructions":data.advice
    }
    try{
      const response = await fetch("http://localhost:8085/ipd/add-prescription", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prescription_data),
      });

      responseData = await response.json();
      prescriptionId = responseData.prescriptionId; 
      console.log("Prescription Id is: " + prescriptionId)

      if (!response.ok) {
        throw new Error('Error adding prescription');
      }

      // Clear the form after successful submission
      reset();

      console.log('Presciption added successfully');

    } catch(error){
      console.error('Error adding prescription:', error);
    }
    
    console.log(data)
    
    for(var i=0; i<data.medicines.length; i++)
    {
      handleMedication(data.medicines[i], prescriptionId); 
    }


    const record_data = {
      "patientId":patientId,
      "doctorId":user.id,
      "prescriptionId": prescriptionId,
      "patientComplaints":data.patientComplaints,
      "hospitalName":"ABC Hospital",
      "weight":data.weight,
      "height":data.height,
      "temperature":data.temperature,
      "lowBP":data.lowBP,
      "highBP":data.highBP,
      "followUp":data.followUp
    }

    try{
      const response = await fetch("http://localhost:8083/opd/add-patient-record", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record_data),
      });

      if (!response.ok) {
        throw new Error('Error adding patient record OPD');
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
                        label="Time"
                        {...register(`medicines.${index}.time`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Duration"
                        {...register(`medicines.${index}.duration`)}
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
                    name="notes"
                    placeHolder="Enter notes"
                    label="Notes:"
                    control={control}
                  />
                </IonCol>
              </IonRow>
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
