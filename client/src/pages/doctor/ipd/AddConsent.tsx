import { IonPage, IonContent, IonButton } from "@ionic/react"
import { useForm } from "react-hook-form"
import Header from "../../../components/Header"
import React from "react"
import TextInput from "../../../components/TextInput"
import { useSelector } from "react-redux"

type FormInputs = {
    patientId:number
}

const AddConsent:React.FC = () => {

    const {control,handleSubmit,reset} = useForm()
    const user = useSelector((state: any) => state.user.currentUser);

    const onsubmit = async (data:any) => {

        /*Iske jagah pe ek mailer daalna hoga ki add-consent krte hi patient ke mail-id mein chalejae,fir ye call hogi.*/
        const pdata = {patientId:data.patientId,doctorId:user.id}

        try {
            const response = await fetch('http://localhost:8085/consent/add-consent', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(pdata)
            });
            if(!response.ok){
                throw new Error('Failed to add consent')
            }
            const rdata=await response.json()
            console.log('Added Consent')
            reset()
        }catch(error){
            console.error("Error adding consent")
        }
    } 

    return (
        <IonPage>
            <Header />
            <IonContent className='ion-padding'>
                <form onSubmit={handleSubmit(onsubmit)} className="max-w-6xl mx-auto mt-5">
                    <h1 className='text-center text-2xl font-semibold mb-8'>Ask consent for patient data</h1>
                    <TextInput name='patientId'
                        placeHolder="Enter patient details to get consent"
                        label="Patient ID"
                        control={control}
                    />
                    <IonButton type='submit'>Ask for consent</IonButton>
                </form>
            </IonContent>
        </IonPage>   
    )
}

export default AddConsent