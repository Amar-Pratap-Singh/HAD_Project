import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonItem, IonLabel } from '@ionic/react';
import './SidebarMenu.css';

const SidebarMenu: React.FC = () => {

  return (
    <IonMenu className='sidebar-menu' contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Navigation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonMenuToggle>
            <IonItem routerLink="/register-patient" routerDirection="none">
              <IonLabel>Register New Patient</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/add-opd-appt" routerDirection="none">
              <IonLabel>Add OPD Appointment</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/admit-patient-ipd" routerDirection="none">
              <IonLabel>Admit Patient to IPD</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/view-patients" routerDirection="none">
              <IonLabel>View All Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/view-opd-appts" routerDirection="none">
              <IonLabel>View OPD Appointments</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/view-ipd-beds" routerDirection="none">
              <IonLabel>View IPD Beds</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/test-login" routerDirection="none">
              <IonLabel>Test Login Page</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/test-signup-doctor" routerDirection="none">
              <IonLabel>Test Doctor Signup Page</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/test-signup-nurse" routerDirection="none">
              <IonLabel>Test Nurse Signup Page</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/add-encounter" routerDirection="none">
              <IonLabel>IPD Add Encounter</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/ipd-patient-details" routerDirection="none">
              <IonLabel>IPD Patient</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/opd-create-prescription" routerDirection="none">
              <IonLabel>OPD Create Prescription</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/opd-get-patient-details" routerDirection="none">
              <IonLabel>OPD Patient Details</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem routerLink="/opd-view-patients" routerDirection="none">
              <IonLabel>OPD Patients</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default SidebarMenu;