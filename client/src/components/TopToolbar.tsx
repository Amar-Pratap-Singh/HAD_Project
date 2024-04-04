import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton } from '@ionic/react';
import { useSelector } from 'react-redux';

const TopToolbar: React.FC = () => {

  const user = useSelector((state: any) => state.user.currentUser);
  const jwt = useSelector((state: any) => state.user.jwt);

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle className='text-black font-bold'>Hospital System</IonTitle>
        <IonButtons slot='end'>
          <IonButton className='text-black font-bold'>{user.sub}</IonButton>
          <IonButton className='text-black font-bold'>{user.role}</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}

export default TopToolbar;