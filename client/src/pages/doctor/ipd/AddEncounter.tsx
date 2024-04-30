import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useFieldArray, useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import Header from "../../../components/Header";
import PencilTool from "../../../toolkit/PencilTool";
import AudioRecord from "../../../toolkit/AudioRecord";
import "./AddEncounter.css";

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

const AddEncounter: React.FC = () => {

  const { register, control, handleSubmit, reset} = useForm<any>({ mode: "onBlur" });
  const { patientId } = useParams<{ patientId: any }>();
  const { fields, append, remove } = useFieldArray({
    name: "medicineFields",
    control,
  });
  const user = useSelector((state: any) => state.user.currentUser);

  const [notesData, setNotesData] = useState({ textArea: false, scribbleArea: false, voiceNote: false });
  const [instructionData, setInstructionData] = useState({ textArea: false, scribbleArea: false, voiceNote: false });
  
  const [notesScribbleData, setNotesScribbleData] = useState();
  const [instructionScribbleData, setInstructionScribbleData] = useState();
  const [notesAudioData, setNotesAudioData] = useState(null);
  const [instructionAudioData, setInstructionAudioData] = useState(null);

  const [textArea, setTextArea] = useState(false);
  const [scribbleArea, setScribbleArea] = useState(false);
  const [voiceNote, setVoiceNote] = useState(false);

  const [medicineOptions, setMedicineOptions] = useState<string[]>(["Medicine 1", "Medicine 2", "Medicine 3", "Medicine 4", "Medicine 5", "Medicine 6", "Medicine 7", "Medicine 8", "Medicine 9", "Medicine 10"]);


  //functions to create image file
  const createImageFile = (imageData:any, path:string) => {
    //convert base64 image data to a Blob
    const blob = base64ToBlob(imageData);

    //create a File object from the Blob
    if (blob === null)
      return;

    const file = new File([blob], path, { type: 'image/png' });

    //save the File object or perform further operations
    console.log('Image file created:', file);
  };

  const base64ToBlob = (base64String:string) => {
    base64String = base64String.substring(22);
    //check if the base64 string is invalid
    if (!base64String || typeof base64String !== 'string') {
      console.error('Invalid base64 string');
      return null;
    }
    try {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: 'image/png' });
    } 
    catch (error) {
      console.error('Error decoding base64 string:', error);
      return null;
    }
  };

  const handleMedication = async (data: any, prescriptionId: any) =>{

    const medication_data = {
      "prescriptionId": prescriptionId,
      "medicineName": data.medicineName,
      "quantity": data.medicineQty,
      "time": data.medicineTiming,
      "duration": data.medicineDuration
    } 

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
      reset();
      console.log('Medication added successfully');
    } 
    catch(error){
      console.error('Error adding medication:', error);
    }
  }

  const handleFormSubmit = async (data: any) => {
    
    var medicationId;
    var prescriptionId;
    var responseData; 

    // download the images of notes scribble
    // and instruction scribble and get path
    
    // var path1 = "/Users/amar/Documents/Sem8/HAD/HAD_Project/client/src/pages/doctor/ipd/imageData/notes.png";
    // createImageFile(notesScribbleData, path1);

    // var path2 = "/Users/amar/Documents/Sem8/HAD/HAD_Project/client/src/pages/doctor/ipd/imageData/instructions.png";
    // createImageFile(instructionScribbleData, path2);

    const prescription_data = {
      "notes":data.notes,
      "instructions":data.instructions,
      "scribbleNotes": notesScribbleData,
      "scribbleInstructions": instructionScribbleData,
      "audioNotes": notesAudioData,
      "audioInstructions": instructionAudioData
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

      reset();

      console.log('Presciption added successfully');

    } catch(error){
      console.error('Error adding prescription:', error);
    }
    
    console.log(data)
    
    for(var i=0;i<data.medicineFields.length;i++){
      handleMedication(data.medicineFields[i], prescriptionId); 
    }

    //need patiend id
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

            <h1 className='text-center text-2xl font-semibold mb-8'>Add IPD Encounter</h1>

            <h1 className='text-xl font-semibold mb-2'>Notes</h1>
            <IonRow>
              <IonButton onClick={() => {const textBool = !notesData['textArea']; const scribbleBool = notesData['scribbleArea']; const voiceBool = notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Text</IonButton>
              <IonButton onClick={() => {const textBool = notesData['textArea']; const scribbleBool = !notesData['scribbleArea']; const voiceBool = notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Scribble</IonButton>
              <IonButton onClick={() => {const textBool = notesData['textArea']; const scribbleBool = notesData['scribbleArea']; const voiceBool = !notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Voice Note</IonButton> 
            </IonRow>
            
            {notesData['textArea'] && <TextInput name="notes" placeHolder="Enter notes" label="Notes" control={control} /> }
            {notesData['scribbleArea'] && <div className="pencil-tool"> <PencilTool setData={setNotesScribbleData}/> </div>} 
            {notesData['voiceNote'] && <div className="audio-record"> <AudioRecord setData={setNotesAudioData}/> </div>}
            
            <h1 className='text-xl font-semibold my-2'>Instructions</h1>
            <IonRow>
              <IonButton onClick={() => {const textBool = !instructionData['textArea']; const scribbleBool = instructionData['scribbleArea']; const voiceBool = instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Text</IonButton>
              <IonButton onClick={() => {const textBool = instructionData['textArea']; const scribbleBool = !instructionData['scribbleArea']; const voiceBool = instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Scribble</IonButton>
              <IonButton onClick={() => {const textBool = instructionData['textArea']; const scribbleBool = instructionData['scribbleArea']; const voiceBool = !instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Voice Note</IonButton>
            </IonRow>

            {instructionData['textArea'] && <TextInput name="instructions" placeHolder="Enter instructions" label="Instructions" control={control} /> }
            {instructionData['scribbleArea'] && <div className="pencil-tool"> <PencilTool setData={setInstructionScribbleData}/> </div>}
            {instructionData['voiceNote'] && <div className="audio-record"><AudioRecord setData={setInstructionAudioData}/></div>}
            
            <h1 className='text-xl font-semibold my-2'>Medicines</h1>
            {fields.map((field, index) => {
              return (
                <div className="flex flex-row justify-between items-center">
                  <IonSelect placeholder="Select Medicine Name" {...register(`medicineFields.${index}.medicineName`)}>
                    {medicineOptions.map((medicine, i) => (
                      <IonSelectOption key={i} value={medicine}>{medicine}</IonSelectOption>
                    ))}
                  </IonSelect>
                  <TextInput placeHolder="" label="Quantity" {...register(`medicineFields.${index}.medicineQty`)} control={control} />
                  <IonSelect placeholder="Select Timing" {...register(`medicineFields.${index}.medicineTiming`)} >
                      <IonSelectOption value="Morning">Morning</IonSelectOption>
                      <IonSelectOption value="Evening">Evening</IonSelectOption>
                      <IonSelectOption value="Night">Night</IonSelectOption>
                    </IonSelect>
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

export default AddEncounter;

// import React, { useState } from "react";
// import {
//   IonButton,
//   IonCol,
//   IonContent,
//   IonGrid,
//   IonInput,
//   IonPage,
//   IonRow,
//   IonText,
// } from "@ionic/react";
// import MedicineInputField from "./MedicineInputField";
// import { useFieldArray, useForm } from "react-hook-form";
// import { useSelector } from 'react-redux';
// import TextInput from "../../../components/TextInput";
// import Header from "../../../components/Header";
// import "./styles.css";
// import { useParams } from "react-router-dom";
// import PencilTool from "../../../toolkit/PencilTool";
// import AudioRecord from "../../../toolkit/AudioRecord";

// type FormInputs = {
//   notes: string;
//   instructions: string;
//   medicineFields: {
//     medicineName: string;
//     medicineQty: number;
//     medicineTiming: string;
//     medicineDuration: string;
//   }[];
// };

// /*Bug: Showing only 1 medicine info instead of all*/

// const AddEncounter: React.FC = () => {
//   const { register, control, handleSubmit, reset} = useForm<any>({ mode: "onBlur" });
//   const { patientId } = useParams<{ patientId: any }>();
//   const { fields, append, remove } = useFieldArray({
//     name: "medicineFields",
//     control,
//   });
//   const user = useSelector((state: any) => state.user.currentUser);

//   const [notesData, setNotesData] = useState({ textArea: false, scribbleArea: false, voiceNote: false });
//   const [instructionData, setInstructionData] = useState({ textArea: false, scribbleArea: false, voiceNote: false });

  
//   const [notesScribbleData, setNotesScribbleData] = useState();
//   const [instructionScribbleData, setInstructionScribbleData] = useState();
//   const [notesAudioData, setNotesAudioData] = useState(null);
//   const [instructionAudioData, setInstructionAudioData] = useState(null);


//   const [textArea, setTextArea] = useState(false);
//   const [scribbleArea, setScribbleArea] = useState(false);
//   const [voiceNote, setVoiceNote] = useState(false);




//   // Functions to create image file
//   const createImageFile = (imageData:any, path:string) => {
//     // Convert base64 image data to a Blob
//     const blob = base64ToBlob(imageData);

//     // Create a File object from the Blob
//     if (blob === null)
//       return;

//     const file = new File([blob], path, { type: 'image/png' });

//     // Save the File object or perform further operations
//     console.log('Image file created:', file);
//   };


//   const base64ToBlob = (base64String:string) => {
//     console.log(base64String);
//     base64String = base64String.substring(22);
//     // Check if the base64 string is invalid
//     if (!base64String || typeof base64String !== 'string') {
//       console.error('Invalid base64 string');
//       return null;
//     }
  
//     try {
//       const byteCharacters = atob(base64String);
//       const byteNumbers = new Array(byteCharacters.length);
//       for (let i = 0; i < byteCharacters.length; i++) {
//         byteNumbers[i] = byteCharacters.charCodeAt(i);
//       }
//       const byteArray = new Uint8Array(byteNumbers);
//       return new Blob([byteArray], { type: 'image/png' });
//     } catch (error) {
//       console.error('Error decoding base64 string:', error);
//       return null;
//     }
//   };




//   const handleMedication = async (data: any, prescriptionId: any) =>{
//       const medication_data = {
//         "prescriptionId": prescriptionId,
//         "medicineName": data.medicineName,
//         "quantity": data.medicineQty,
//         "time": data.medicineTiming,
//         "duration": data.medicineDuration
//       } 
//       console.log(medication_data)
//       console.log("Prescription Id is: " + prescriptionId)
//       try{
//         const response = await fetch("http://localhost:8085/ipd/add-medication", {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(medication_data),
//         });


//         var responseData = await response.json();
//         var medicationId = responseData.medicationId; 
//         // console.log(medicationId)
//         if (!response.ok) {
//           throw new Error('Error adding medication');
//         }

//         // Clear the form after successful submission
//         reset();

//         console.log('Medication added successfully');

//       } catch(error){
//         console.error('Error adding medication:', error);
//       }
    
//   }





//   // OnClick
//   const handleFormSubmit = async (data: any) => {
    
//     var medicationId;
//     var prescriptionId;
//     var responseData; 

//     // download the images of notes scribble
//     // and instruction scribble and get path
    
//     // var path1 = "/Users/amar/Documents/Sem8/HAD/HAD_Project/client/src/pages/doctor/ipd/imageData/notes.png";
//     // createImageFile(notesScribbleData, path1);

//     // var path2 = "/Users/amar/Documents/Sem8/HAD/HAD_Project/client/src/pages/doctor/ipd/imageData/instructions.png";
//     // createImageFile(instructionScribbleData, path2);

//     // One more api call to save the imageData and get the path

//     // Adding Prescription Data
//     const prescription_data = {
//       "notes":data.notes,
//       "instructions":data.instructions,
//       "scribbleNotes": notesScribbleData,
//       "scribbleInstructions": instructionScribbleData,
//       "audioNotes": notesAudioData,
//       "audioInstructions": instructionAudioData
//     }

//     try{
//       const response = await fetch("http://localhost:8085/ipd/add-prescription", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(prescription_data),
//       });

//       responseData = await response.json();
//       prescriptionId = responseData.prescriptionId; 
//       console.log("Prescription Id is: " + prescriptionId)

//       if (!response.ok) {
//         throw new Error('Error adding prescription');
//       }

//       // Clear the form after successful submission
//       reset();

//       console.log('Prescription added successfully');

//     } catch(error){
//       console.error('Error adding prescription:', error);
//     }
    


//     console.log(data)
    
//     for(var i=0;i<data.medicineFields.length;i++)
//     {
//       handleMedication(data.medicineFields[i], prescriptionId); 
//     }

//     //Need Patient Id
//     const encounter_data = {
//       "patientId": patientId,
//       "doctorId":user.id,
//       "prescriptionId":prescriptionId
//     }
//     try{
//       const response = await fetch("http://localhost:8085/ipd/add-doctor-encounter", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(encounter_data),
//       });

//       if (!response.ok) {
//         throw new Error('Error adding doctor encounter');
//       }

//       // Clear the form after successful submission
//       reset();

//       console.log('Doctor encounter added successfully');

//     } catch(error){
//       console.error('Error adding doctor encounter:', error);
//     }
//   };




//   return (
//     <div className="add-encounter">
//       <IonPage>
//         <Header/>
//         <IonContent className="ion-padding">
//           <h1>Add IPD Encounter</h1>
//           <form onSubmit={handleSubmit(handleFormSubmit)}>
//             <IonGrid>

//               <h1 className="headers">Notes</h1>
//               <IonRow>
//                 <IonButton onClick={() => {const textBool = !notesData['textArea']; const scribbleBool = notesData['scribbleArea']; const voiceBool = notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Text</IonButton>
//                 <IonButton onClick={() => {const textBool = notesData['textArea']; const scribbleBool = !notesData['scribbleArea']; const voiceBool = notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Scribble</IonButton>
//                 <IonButton onClick={() => {const textBool = notesData['textArea']; const scribbleBool = notesData['scribbleArea']; const voiceBool = !notesData['voiceNote']; setNotesData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Voice Note</IonButton>
//                 {notesData['textArea'] && 
//                  <div className="text-area">  
//                   <TextInput
//                     name="notes"
//                     placeHolder="Enter notes"
//                     label="Notes"
//                     control={control}
//                   /></div> 
//                 }
//                 {notesData['scribbleArea'] ? <div className="pencil-tool"> <PencilTool setData={setNotesScribbleData}/> </div> : <></>}
//                 {notesData['voiceNote'] ? <div className="audio-record"><AudioRecord setData={setNotesAudioData}/></div> : <></>}
//               </IonRow>
                
//               <h1 className="headers">Instructions</h1>
//               <IonRow>
//                 <IonButton onClick={() => {const textBool = !instructionData['textArea']; const scribbleBool = instructionData['scribbleArea']; const voiceBool = instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Text</IonButton>
//                 <IonButton onClick={() => {const textBool = instructionData['textArea']; const scribbleBool = !instructionData['scribbleArea']; const voiceBool = instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Scribble</IonButton>
//                 <IonButton onClick={() => {const textBool = instructionData['textArea']; const scribbleBool = instructionData['scribbleArea']; const voiceBool = !instructionData['voiceNote']; setInstructionData({textArea: textBool, scribbleArea: scribbleBool, voiceNote: voiceBool})}}>Voice Note</IonButton>

//                 {instructionData['textArea'] && 
//                  <div className="text-area">  
//                   <TextInput
//                     name="notes"
//                     placeHolder="Enter notes"
//                     label="Notes"
//                     control={control}
//                   /></div> 
//                 }
//                 {instructionData['scribbleArea'] ? <div className="pencil-tool"> <PencilTool setData={setInstructionScribbleData}/> </div> : <></>}
//                 {instructionData['voiceNote'] ? <div className="audio-record"><AudioRecord setData={setInstructionAudioData}/></div> : <></>}

//               </IonRow>

//               {/* <IonRow>
//                 <h1>Extras</h1>
//                 <div className="pencil-tool">
//                   <PencilTool />
//                 </div>
//               </IonRow> */}


              
//               {fields.map((field, index) => {
//                 return (
//                   <IonRow key={field.id}>
//                     <IonCol>
//                       <TextInput
//                         placeHolder=""
//                         label="Medicine Name"
//                         {...register(`medicineFields.${index}.medicineName`)}
//                         control={control}
//                       />
//                     </IonCol>
//                     <IonCol>
//                       <TextInput
//                         placeHolder=""
//                         label="Quantity"
//                         {...register(`medicineFields.${index}.medicineQty`)}
//                         control={control}
//                       />
//                     </IonCol>
//                     <IonCol>
//                       <TextInput
//                         placeHolder=""
//                         label="Medicine Timing"
//                         {...register(`medicineFields.${index}.medicineTiming`)}
//                         control={control}
//                       />
//                     </IonCol>
//                     <IonCol>
//                       <TextInput
//                         placeHolder=""
//                         label="Medicine Duration"
//                         {...register(`medicineFields.${index}.medicineDuration`)}
//                         control={control}
//                       />
//                     </IonCol>
//                     <IonCol>
//                       <div className="button-container">
//                         <IonButton onClick={() => remove(index)} shape="round">
//                           Delete
//                         </IonButton>
//                       </div>
//                     </IonCol>
//                   </IonRow>
//                 );
//               })}
//               <div className="button-container">
//                 <IonButton
//                   onClick={() =>
//                     append({
//                       medicineName: "",
//                       medicineDuration: "",
//                       medicineQty: 0,
//                       medicineTiming: "",
//                     })
//                   }
//                   shape="round"
//                 >
//                   Add Medicines
//                 </IonButton>
//               </div>
//             </IonGrid>
//             <div className="button-container">
//               <IonButton type="submit" shape="round">
//                 Add Encounter
//               </IonButton>
//             </div>
//           </form>
//         </IonContent>
//       </IonPage>
//     </div>
//   );
// };

// export default AddEncounter;