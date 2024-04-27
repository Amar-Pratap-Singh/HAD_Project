import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Header from "../../../components/Header";

import { Storage } from '@capacitor/storage';
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

const IPDAddEncounter: React.FC = () => {

  const { register, control, handleSubmit, reset} = useForm<any>({ mode: "onBlur" });
  const { patientId } = useParams<{ patientId: any }>();
  const { fields, append, remove } = useFieldArray({
    name: "medicineFields",
    control,
  });
  const [medicineOptions, setMedicineOptions] = useState<string[]>(["Medicine 1", "Medicine 2", "Medicine 3", "Medicine 4", "Medicine 5", "Medicine 6", "Medicine 7", "Medicine 8", "Medicine 9", "Medicine 10"]);

  const user = useSelector((state: any) => state.user.currentUser);

  const handleMedication = async (data: any, prescriptionId: any) =>{

    const medication_data = {
      "prescriptionId": prescriptionId,
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
    
    for(var i=0;i<data.medicineFields.length;i++){
      handleMedication(data.medicineFields[i], prescriptionId); 
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

  }

  return (
    <IonPage>
      <Header/>
      <IonContent className="ion-padding">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-6xl mx-auto mt-5">
            <h1 className='text-center text-xl font-semibold mb-8'>Add IPD Encounter</h1>
            <TextInput name="notes" placeHolder="Enter notes" label="Notes" control={control} />
            <TextInput name="instructions" placeHolder="Enter instructions" label="Instructions" control={control} />
            {fields.map((field, index) => {
              return (
                <div className="flex flex-row justify-between items-center">
                  <IonSelect placeholder="Select Medicine Name" {...register(`medicineFields.${index}.medicineName`)} control={control}>
                    {medicineOptions.map((medicine, i) => (
                      <IonSelectOption key={i} value={medicine}>{medicine}</IonSelectOption>
                    ))}
                  </IonSelect>
                  <TextInput placeHolder="" label="Quantity" {...register(`medicineFields.${index}.medicineQty`)} control={control} />
                    <div className="ion-select-container">
                    <IonSelect placeholder="Select Timing" {...register(`medicineFields.${index}.medicineTiming`)} control={control}>
                      <IonSelectOption value="Morning">Morning</IonSelectOption>
                      <IonSelectOption value="Evening">Evening</IonSelectOption>
                      <IonSelectOption value="Night">Night</IonSelectOption>
                    </IonSelect>
                  </div>
                  <TextInput placeHolder="" label="Duration" {...register(`medicineFields.${index}.medicineDuration`)} control={control} />
                  <IonButton className="h-8" onClick={() => remove(index)} shape="round">-</IonButton>
                </div>
            );
            })}
            <IonButton className="block w-16" onClick={() => append({ medicineName: "", medicineDuration: "", medicineQty: 0, medicineTiming: "" })} shape="round">+</IonButton>
            <div className="mt-8 flex justify-center">
              <IonButton type="submit" shape="round">Add Encounter</IonButton>
            </div>
          </form>
        </IonContent>
      </IonPage>
  );
};

export default IPDAddEncounter;
