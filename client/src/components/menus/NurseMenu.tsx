import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';

const NurseMenu: React.FC = () => {

  return (
    <IonMenu contentId="main-content">
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className='text-black font-bold'>Nurse</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/nurse/patient-list" routerDirection="none">
              <IonLabel>Patient List</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/nurse/patient-details" routerDirection="none">
              <IonLabel>Patient Details</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/nurse/add-encounter" routerDirection="none">
              <IonLabel>Add Encounter</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      
    </IonMenu>
  );
}

export default NurseMenu;