import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
} from "@ionic/react";
import MedicineInputField from "./MedicineInputField";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import TextInput from "../../../components/TextInput";
import Header from "../../../components/Header";
import "./styles.css";
import { useParams } from "react-router-dom";

type FormInputs = {
  notes: string;
  instructions: string;
  medicineFields: {
    medicineName: string;
    medicineQty: number;
    medicineTiming: string;
    medicineDuration: string;
  }[];
};

/*Bug: Showing only 1 medicine info instead of all*/

const AddEncounter: React.FC = () => {
  const { register, control, handleSubmit, reset} = useForm<any>({ mode: "onBlur" });
  const { patientId } = useParams<{ patientId: any }>();
  const { fields, append, remove } = useFieldArray({
    name: "medicineFields",
    control,
  });
  const user = useSelector((state: any) => state.user.currentUser);

  const handleMedication = async (data: any,prescriptionId: any) =>{
      const medication_data = {
        "medicineName": data.medicineName,
        "quantity": data.medicineQty,
        "time": data.medicineTiming,
        "duration": data.medicineDuration
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
        var medicationId = responseData.medicationId; 
        // console.log(medicationId)
        if (!response.ok) {
          throw new Error('Error adding medication');
        }

        // Clear the form after successful submission
        reset();

        console.log('Medication added successfully');

      } catch(error){
        console.error('Error adding medication:', error);
      }
    
      const pres_med_data = {
        "prescriptionId":prescriptionId,
        "medicationId":medicationId
      } 
      console.log(medication_data)
      try{
        const response = await fetch("http://localhost:8085/ipd/add-prescription-medication", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pres_med_data),
        });
        if (!response.ok) {
          throw new Error('Error creating prescriptionId, medicationId table');
        }
  
        // Clear the form after successful submission
        reset();
  
        console.log('Creating prescriptionId, medicationId table created successfully');
  
      } catch(error){
        console.error('Error creating prescriptionId, medicationId table:', error);
      }
  }

  // OnClick
  const handleFormSubmit = async (data: any) => {
    
    var medicationId;
    var prescriptionId;
    var responseData; 

    const prescription_data = {
      "notes":data.notes,
      "instructions":data.instructions
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
    
    for(var i=0;i<data.medicineFields.length;i++)
    {
      handleMedication(data.medicineFields[i],prescriptionId); 
    }

    //Need Patient Id
    const encounter_data = {
      "patientId": patientId,
      "doctorId":user.id,
      "prescriptionId":prescriptionId
    }
    try{
      const response = await fetch("http://localhost:8085/ipd/add-doctor-encounter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(encounter_data),
      });

      if (!response.ok) {
        throw new Error('Error adding doctor encounter');
      }

      // Clear the form after successful submission
      reset();

      console.log('Doctor encounter added successfully');

    } catch(error){
      console.error('Error adding doctor encounter:', error);
    }
    


};

  return (
    <div className="add-encounter">
      <IonPage>
        <Header/>
        <IonContent className="ion-padding">
          <h1>Add IPD Encounter</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="notes"
                    placeHolder="Enter notes"
                    label="Notes"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <TextInput
                    name="instructions"
                    placeHolder="Enter instructions"
                    label="Instructions"
                    control={control}
                  />
                </IonCol>
              </IonRow>
              {fields.map((field, index) => {
                return (
                  <IonRow key={field.id}>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Name"
                        {...register(`medicineFields.${index}.medicineName`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Quantity"
                        {...register(`medicineFields.${index}.medicineQty`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Timing"
                        {...register(`medicineFields.${index}.medicineTiming`)}
                        control={control}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Duration"
                        {...register(`medicineFields.${index}.medicineDuration`)}
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
                      medicineDuration: "",
                      medicineQty: 0,
                      medicineTiming: "",
                    })
                  }
                  shape="round"
                >
                  Add Medicines
                </IonButton>
              </div>
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

export default AddEncounter;
