import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/react';
import TopToolbar from '../components/TopToolbar';
import './PharmaStyle.css';

const PharmaPrescription: React.FC = () => {

	const [patient, setPatient] = useState({id:0,name:"",bill:0});
	const [items,setItems] = useState<any []>([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setPatient({id:14,name:"Veenu",bill:220})
		setItems([{id:1,name:'Vicodin',quantity:2,itemcode:'MD123',bill:180},{id:2,name:'Benadryl 1L',quantity:1,itemcode:'BD1L',bill:40}])
	};

	return(
		<div className='view-bill'>
			<IonPage>
				<TopToolbar/>
				<IonContent>
				<h1>Patients</h1>
				<IonGrid className='table'>
					<IonRow className='table-header'>
						<IonCol>Patient ID</IonCol>
						<IonCol>Name</IonCol>
						<IonCol>Bill</IonCol>
					</IonRow>
                    <IonRow>
                        <IonCol>{patient.id}</IonCol>
                        <IonCol>{patient.name}</IonCol>
						<IonCol>Rs.{patient.bill}</IonCol>
                    </IonRow>
                </IonGrid>
                <IonGrid className='table'>
					<IonRow className='table-header'>
						<IonCol>Item</IonCol>
						<IonCol>Quantity</IonCol>
						<IonCol>Item Code</IonCol>
						<IonCol>Bill(Rs)</IonCol>
					</IonRow>
					{
						items.map(test => (
							<IonRow key={test.id}>
								<IonCol>{test.name}</IonCol>
								<IonCol>{test.quantity}</IonCol>
								<IonCol>{test.itemcode}</IonCol>
								<IonCol>{test.bill}</IonCol>
							</IonRow>
						))
					}
					
				</IonGrid>
				</IonContent>
			</IonPage>
		</div>
	);
}

export default PharmaPrescription;