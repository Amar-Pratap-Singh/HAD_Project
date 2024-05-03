import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { Route, useHistory } from "react-router-dom";
import Header from "../../../components/Header";

const ViewWards: React.FC = () => {

  const history = useHistory();
  const [wards, setWards] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleWardClick = (key: any) => {
    history.push(`/doctor/ipd/patient-list/` + key);
  };

  return (
    <IonPage>
      <Header/>
      <IonContent>
        <div className="flex flex-wrap justify-center gap-12 mx-10 mt-10">
          {wards.map((ward, key) => (
            <IonCard className="cursor-pointer w-64 h-60 flex flex-col items-center justify-evenly" key={key}>
              <IonCardHeader>
                <IonCardTitle>Ward {ward}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton className="w-full" onClick={() => handleWardClick(ward)}>View Patients</IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      </IonContent>  
    </IonPage>
  );
};

export default ViewWards;
