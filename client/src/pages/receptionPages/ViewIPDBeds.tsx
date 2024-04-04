import { IonPage, IonContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { useState, useEffect } from 'react';
import TopToolbar from '../../components/TopToolbar';
import './styles.css';

const ViewIPDBeds: React.FC = () => {
    const [Bed, setBed] = useState<any[]>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8081/patient/view-beds');
                if (!response.ok) {
                	throw new Error('Failed to fetch data');
                }
			const data = await response.json();
            console.log(data)
			setBed(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};
    return(
        <div className='view-patients'>
            <IonPage>
                <TopToolbar/>
                <IonContent>  
                <h1>View Beds</h1>
				<IonGrid className='table'>
					<IonRow className='table-header'>
						<IonCol>Bed Number</IonCol>
						<IonCol>Ward Number</IonCol>
						<IonCol>Floor Number</IonCol>
						<IonCol>Status</IonCol>
					</IonRow>
					{
						Bed.map(Bed => (
							<IonRow key={Bed.accomadationId}>
								<IonCol>{Bed.bedNo}</IonCol>
								<IonCol>{Bed.wardNo}</IonCol>
								<IonCol>{Bed.floorNo}</IonCol>
								<IonCol>{Bed.status}</IonCol>
							</IonRow>
						))
					}
				</IonGrid>
                </IonContent>
            </IonPage>
        </div>
    );
}

export default ViewIPDBeds;