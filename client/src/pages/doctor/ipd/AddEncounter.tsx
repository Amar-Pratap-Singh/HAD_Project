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
import TextInput from "../../../components/TextInput";
import Header from "../../../components/Header";
import "./styles.css";

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
  const { register, control, handleSubmit } = useForm<any>({ mode: "onBlur" });

  const { fields, append, remove } = useFieldArray({
    name: "medicineFields",
    control,
  });

  const handleFormSubmit = (data: FormInputs) => {
    console.log("Form submitted:", { data });
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
                  <IonRow>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Name"
                        {...register(`medicineFields.${index}.medicineName`)}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Quantity"
                        {...register(`medicineFields.${index}.medicineQty`)}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Timing"
                        {...register(`medicineFields.${index}.medicineTiming`)}
                      />
                    </IonCol>
                    <IonCol>
                      <TextInput
                        placeHolder=""
                        label="Medicine Duration"
                        {...register(`medicineFields.${index}.medicineTiming`)}
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
