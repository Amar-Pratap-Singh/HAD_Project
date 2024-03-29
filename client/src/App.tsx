import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import RegisterPatient from './pages/RegisterPatient';
import AddOPDAppointment from './pages/AddOPDAppointment';
import AdmitPatientIPD from './pages/AdmitPatientIPD';
import ViewPatients from './pages/ViewPatients';
import ViewOPDAppointments from './pages/ViewOPDAppointments';
import ViewIPDBeds from './pages/ViewIPDBeds';
import TestLogin from './authPages/TestLogin';
import TestSignUpDoctor from './authPages/TestSignUpDoctor';
import TestSignUpNurse from './authPages/TestSignUpNurse';
import SidebarMenu from './components/SidebarMenu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddEncounter from './ipd/AddEncounter';
import OPDCreatePrescription from './opdPages/OPDCreatePrescription';
import OPDGetPatientDetails from './opdPages/OPDGetPatientDetails';
import OPDViewPatients from './opdPages/OPDViewPatients';
import PatientDetails from './ipd/PatientDetails';

setupIonicReact();

/*Jinpe test hai wo reception wale nhi login/signupwale pages hai*/

const App: React.FC = () => (
  <IonApp>
    <SidebarMenu/>
    <IonReactRouter>
      <IonRouterOutlet id="main-content">
        <Route exact path="/register-patient">
          <RegisterPatient />
        </Route>
        <Route exact path="/view-patients">
          <ViewPatients />
        </Route>
        <Route exact path="/add-opd-appt">
          <AddOPDAppointment />
        </Route>
        <Route exact path="/view-opd-appts">
          <ViewOPDAppointments />
        </Route>
        <Route exact path="/admit-patient-ipd">
          <AdmitPatientIPD />
        </Route>
        <Route exact path="/view-ipd-beds">
          <ViewIPDBeds />
        </Route>
        <Route exact path="/test-login">
          <TestLogin />
        </Route>
        <Route exact path="/test-signup-doctor">
          <TestSignUpDoctor />
        </Route>
        <Route exact path="/test-signup-nurse">
          <TestSignUpNurse />
        </Route>
        <Route exact path="/add-encounter">
          <AddEncounter />
        </Route>
        <Route exact path="/ipd-patient-details">
          <PatientDetails name={'Rishi'} patientId={'44'} age={12} reasonForAdmit={'Malaria'} />
        </Route>
        <Route exact path="/opd-create-prescription">
          <OPDCreatePrescription />
        </Route>
        <Route exact path="/opd-get-patient-details">
          <OPDGetPatientDetails />
        </Route>
        <Route exact path="/opd-view-patients">
          <OPDViewPatients />
        </Route>
        <Route exact path="/">
          <Redirect to="/register-patient" />
        </Route>
        <Route exact path="/home">
          <Redirect to="/register-patient" />
        </Route>
        <Route exact path="/nurse-view-patients">
          <NurseViewPatients />
        </Route>
        <Route exact path="/nurse-view-patients/details">
          <NurseGetPaitentDetails />
        </Route>
        <Route exact path="/nurse-encounter">
          <NurseCreateEncounter />
        </Route>

        <Route exact path="/lab-search">
          <LabSearch />
        </Route>
        <Route exact path="/lab-ip">
          <LabIP />
        </Route>

        <Route exact path="/pharma-search">
          <PharmaSearch />
        </Route>
        <Route exact path="/pharma-prescription">
          <PharmaPrescription />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
