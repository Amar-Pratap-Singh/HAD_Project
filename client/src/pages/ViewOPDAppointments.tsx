import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './styles.css';

const ViewOPDAppointments: React.FC = () => {

	return(
		<div className='view-opd-appts'>
			<IonPage>
        <TopToolbar/>
				<IonContent>
					<h1>OPD Appointments</h1>
          <IonGrid className='table'>
            <IonRow className='table-header'>
              <IonCol>Patient ID</IonCol>
              <IonCol>Name</IonCol>
              <IonCol>Appt Reason</IonCol>
              <IonCol>Appt Date</IonCol>
              <IonCol>Doctor</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>13</IonCol>
              <IonCol>patient</IonCol>
              <IonCol>Fever</IonCol>
              <IonCol>12/12/2023</IonCol>
              <IonCol>Dr. Verma</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>13</IonCol>
              <IonCol>patient</IonCol>
              <IonCol>Fever</IonCol>
              <IonCol>12/12/2023</IonCol>
              <IonCol>Dr. Verma</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>13</IonCol>
              <IonCol>patient</IonCol>
              <IonCol>Fever</IonCol>
              <IonCol>12/12/2023</IonCol>
              <IonCol>Dr. Verma</IonCol>
            </IonRow>
          </IonGrid>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default ViewOPDAppointments;