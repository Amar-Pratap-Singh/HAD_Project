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

import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useSelector } from 'react-redux';

// components
import PrivateRoute from './components/PrivateRoute';

// menus
import ReceptionMenu from './components/menus/ReceptionMenu';
import PharmaMenu from './components/menus/PharmaMenu';
import NurseMenu from './components/menus/NurseMenu';
import LabMenu from './components/menus/LabMenu';
import DoctorMenu from './components/menus/DoctorMenu';
import AdminMenu from './components/menus/AdminMenu';

// reception pages
import PatientRegistrationForm from './pages/reception/PatientRegistrationForm';
import OPDAppointmentForm from './pages/reception/OPDAppointmentForm';
import IPDAdmissionForm from './pages/reception/IPDAdmissionForm';
import PatientList from './pages/reception/PatientList';
import OPDAppointmentsList from './pages/reception/OPDAppointmentsList';
import IPDBedsList from './pages/reception/IPDBedsList';

// pharma pages
import PharmaPrescription from './pages/pharma/PharmaPrescription';
import PharmaSearch from './pages/pharma/PharmaSearch';

// nurse pages
import NurseCreateEncounter from './pages/nurse/NurseCreateEncounter';
import NurseGetPatientDetails from './pages/nurse/NurseGetPatientDetails';
import NurseViewPatients from './pages/nurse/NurseViewPatients';

// lab pages
import LabIP from './pages/lab/LabIP';
import LabSearch from './pages/lab/LabSearch';

// doctor pages - ipd
import AddEncounter from './pages/doctor/ipd/AddEncounter';
import PatientDetails from './pages/doctor/ipd/PatientDetails';
import IPDViewPatients from './pages/doctor/ipd/IPDViewPatients'

// doctor pages - opd
import OPDCreatePrescription from './pages/doctor/opd/OPDCreatePrescription';
import OPDViewPatients from './pages/doctor/opd/OPDViewPatients';
import OPDGetPatientDetails from './pages/doctor/opd/OPDGetPatientDetails';

// admin pages
import SignUp from './pages/admin/SignUp';
import TestSignUpDoctor from './pages/admin/TestSignUpDoctor';
import TestSignUpNurse from './pages/admin/TestSignUpNurse';

// sign in page
import SignIn from './pages/SignIn';

setupIonicReact();

const App = () => {

  const user = useSelector((state: any) => state.user.currentUser);

  return (  
    <IonApp>
      {(user && user.role === 'RECEPTIONIST') && <ReceptionMenu />}
      {(user && user.role === 'PHARMACIST') && <PharmaMenu />}
      {(user && user.role === 'CLINICAL_ASSISTANT') && <NurseMenu />}
      {(user && user.role === 'LAB_USER') && <LabMenu />}
      {(user && user.role === 'DOCTOR') && <DoctorMenu />}
      {(user && user.role === 'ADMIN') && <AdminMenu />}
      <IonReactRouter>
        <IonRouterOutlet id="main-content">

          {/* Sign In Page (Starting Page) */}
          <Route exact path="/">
            <Redirect to="/sign-in" />
          </Route>

          <Route exact path="/sign-in" component={SignIn} />

          {/* Reception Pages */}
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/register-patient" component={PatientRegistrationForm} />
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/add-opd-appointment" component={OPDAppointmentForm} />
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/admit-ipd-patient" component={IPDAdmissionForm} />
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/patient-list" component={PatientList} />
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/opd-appointments-list" component={OPDAppointmentsList} />
          <PrivateRoute allowedRoles={['RECEPTIONIST']} exact path="/reception/ipd-beds-list" component={IPDBedsList} />

          {/* Pharma Pages */}
          <PrivateRoute allowedRoles={['PHARMACIST']} exact path="/pharma/search" component={PharmaSearch} />
          <PrivateRoute allowedRoles={['PHARMACIST']} exact path="/pharma/prescription" component={PharmaPrescription} />

          {/* Nurse Pages */}
          <PrivateRoute allowedRoles={['CLINICAL_ASSISTANT']} exact path="/nurse/patient-list" component={NurseViewPatients} />
          <PrivateRoute allowedRoles={['CLINICAL_ASSISTANT']} exact path="/nurse/patient-details" component={NurseGetPatientDetails} />
          <PrivateRoute allowedRoles={['CLINICAL_ASSISTANT']} exact path="/nurse/add-encounter" component={NurseCreateEncounter} />

          {/* Lab Pages */}
          <PrivateRoute allowedRoles={['LAB_USER']} exact path="/lab/search" component={LabSearch} />
          <PrivateRoute allowedRoles={['LAB_USER']} exact path="/lab/ip" component={LabIP} />

          {/* Doctor Pages - IPD */}
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/ipd/add-encounter/:patientId" component={AddEncounter} />
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/ipd/patient-details/:patientId" component={PatientDetails} />
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/ipd/patient-list" component={IPDViewPatients} />

          {/* Doctor Pages - OPD */}
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/opd/create-prescription" component={OPDCreatePrescription} />
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/opd/patient-list" component={OPDViewPatients} />
          <PrivateRoute allowedRoles={['DOCTOR']} exact path="/doctor/opd/patient-details" component={OPDGetPatientDetails} />

          {/* Admin Pages */}
          <PrivateRoute allowedRoles={['ADMIN']} exact path="/admin/sign-up" component={SignUp} />
          <PrivateRoute allowedRoles={['ADMIN']} exact path="/admin/add-doctor" component={TestSignUpDoctor} />
          <PrivateRoute allowedRoles={['ADMIN']} exact path="/admin/add-nurse" component={TestSignUpNurse} />  
          
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
