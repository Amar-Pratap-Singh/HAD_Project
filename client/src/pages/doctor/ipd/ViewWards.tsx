import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
} from "@ionic/react";
import { Route, useHistory } from "react-router-dom";
import Header from "../../../components/Header";
import "./IPDViewPatients.css";

const ViewWards: React.FC = () => {
  const history = useHistory();
  const [wards, setWards] = useState([1, 2, 3, 4, 5, 6, 7, 8]);


  const [selectedKey, setSelectedKey] = useState(null);

  const handleWardClick = (key: any) => {
    history.push(`/doctor/ipd/patient-list/` + key);
  };

  return (
    <div className="view-patients">
      <IonPage>
        <Header />

        <IonContent>
          <div className="container">
            {Object.keys(wards).map((key) => (
              <div
                key={key}
                className={`block ${selectedKey === key ? "selected" : ""}`}
                onClick={() => handleWardClick(key)}
              >
                Ward {key}
              </div>
            ))}
          </div>
        </IonContent>
        
      </IonPage>
    </div>
  );
};

export default ViewWards;
