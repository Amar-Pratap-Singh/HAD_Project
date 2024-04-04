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

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import SidebarMenu from './components/SidebarMenu';

import RegisterPatient from './pages/receptionPages/RegisterPatient';
import AddOPDAppointment from './pages/receptionPages/AddOPDAppointment';
import AdmitPatientIPD from './pages/receptionPages/AdmitPatientIPD';
import ViewPatients from './pages/receptionPages/ViewPatients';
import ViewOPDAppointments from './pages/receptionPages/ViewOPDAppointments';
import ViewIPDBeds from './pages/receptionPages/ViewIPDBeds';

import SignUp from './pages/authPages/SignUp';
import SignIn from './pages/authPages/SignIn';

import OPDCreatePrescription from './pages/opdPages/OPDCreatePrescription';
import OPDGetPatientDetails from './pages/opdPages/OPDGetPatientDetails';
import OPDViewPatients from './pages/opdPages/OPDViewPatients';

import AddEncounter from './pages/ipdPages/AddEncounter';
import NurseCreateEncounter from './pages/ipdPages/NurseCreateEncounter';
import NurseGetPatientDetails from './pages/ipdPages/NurseGetPatientDetails';
import NurseViewPatients from './pages/ipdPages/NurseViewPatients';
import PatientDetails from './pages/ipdPages/PatientDetails';

import LabIP from './pages/labPages/LabIP';
import LabSearch from './pages/labPages/LabSearch';

import PharmaPrescription from './pages/pharmaPages/PharmaPrescription';
import PharmaSearch from './pages/pharmaPages/PharmaSearch';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <SidebarMenu/>
    <IonReactRouter>
      <IonRouterOutlet id="main-content">

        <Route exact path="/">
          <Redirect to="/sign-in" />
        </Route>
        
        {/* Auth Pages */}
        <Route exact path="/sign-in">
          <SignIn />
        </Route>

        <Route exact path="/sign-up">
          <SignUp />
        </Route>

        {/* Reception Pages */}
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
        
        {/* Doctor Pages */}
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
        
        {/* Nurse Pages */}
        <Route exact path="/nurse-view-patients">
          <NurseViewPatients />
        </Route>
        <Route exact path="/nurse-view-patients/details">
          <NurseGetPatientDetails />
        </Route>
        <Route exact path="/nurse-encounter">
          <NurseCreateEncounter />
        </Route>

        {/* Lab Pages */}
        <Route exact path="/lab-search">
          <LabSearch />
        </Route>
        <Route exact path="/lab-ip">
          <LabIP />
        </Route>

        {/* Pharma Pages */}
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
