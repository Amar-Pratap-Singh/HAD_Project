import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';
import './TopToolbar.css';

const TopToolbar: React.FC = () => {

  return (
    <IonHeader className='top-toolbar'>
      <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle>Reception Portal</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default TopToolbar;