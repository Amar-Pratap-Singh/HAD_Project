import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import Header from '../../components/Header';

interface DiagnosisDetails {
    diagnosisId: number;
    patientId: number;
    path: string;
}

const ViewDiagnosisReport: React.FC = () => {

    const { patientId } = useParams<{ patientId: string }>();
    const [diagnosisDetails, setDiagnosisDetails] = useState<DiagnosisDetails[]>();

    useEffect(()=>{
        fetchDiagnosisReport();
    });

    const fetchDiagnosisReport = async () => {
        try {
            const response = await fetch(`http://localhost:8087/lab/get-diagnosis-report-by-patient-id?patientId=`+ patientId);
            if (!response.ok) {
              throw new Error('Failed to fetch patient details');
            }
            const data = await response.json();
            setDiagnosisDetails(data);
          } 
          catch (error) {
            console.error('Error fetching patient details:', error);
          }
    }


    return (
        <>
        <Header />
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* <img src="/Users/amar/Downloads/testImage2.png"></img> */}
            {diagnosisDetails && diagnosisDetails.map((image, index) => (
                <img key={index} src={`image.path`} alt={image.path} style={{ marginBottom: '10px', maxWidth: '100%', maxHeight: '80vh' }} />
            ))}
        </div>
        </>
    );
};

export default ViewDiagnosisReport;