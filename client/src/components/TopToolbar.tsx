import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/react';

const TopToolbar: React.FC = () => {

  return (
    <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton></IonMenuButton>
      </IonButtons>
      <IonTitle className='text-black font-bold'>Hospital System</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default TopToolbar;