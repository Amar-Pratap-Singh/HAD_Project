import { IonButton, IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import { useParams } from "react-router";

const ConsentForm:React.FC = () => {
    const docId=useParams<{doctorId:string}>();
    const pId=useParams<{patientId:string}>();
    const [granted,setGranted] = useState(false);

    const onsubmit = async() => {
        const pdata={patientId:pId.patientId,doctorId:docId.doctorId}
        try{
            const response=await fetch('http://localhost:8085/consent/add-consent',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(pdata)
            })
            if(!response.ok){
                throw new Error('Failed to add patient')
            }
            const rdata=await response.json();
            setGranted(true);
            alert('Your consent has been granted, you can now close the tab')
        }catch(error){
            console.error("Error adding patient")
        }
    }

    return (
        <IonPage>
            {
                !granted && 
            <IonContent>
                Please have a look at the terms and conditions, then allow consent for your treatment.
                <IonButton onClick={onsubmit}>Allow consent</IonButton>
            </IonContent>
            }
        </IonPage>
    )
}

export default ConsentForm;