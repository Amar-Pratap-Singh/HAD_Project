import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const DoctorMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Doctor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/ipd/add-encounter" routerDirection="none">
              <IonLabel>IPD - Add Encounter</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/ipd/patient-details" routerDirection="none">
              <IonLabel>IPD - View Patient Details</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonMenuToggle>
            <IonItem routerLink="/doctor/opd/create-prescription" routerDirection="none">
              <IonLabel>OPD - Create Prescription</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/opd/patient-list" routerDirection="none">
              <IonLabel>OPD - View Patient List</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/doctor/opd/patient-details" routerDirection="none">
              <IonLabel>OPD - View Patient Details</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default DoctorMenu;