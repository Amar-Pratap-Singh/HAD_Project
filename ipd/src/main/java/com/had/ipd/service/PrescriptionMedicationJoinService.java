package com.had.ipd.service;

import java.util.List;

import com.had.ipd.models.PrescriptionMedicationJoin;

public interface PrescriptionMedicationJoinService {
    public PrescriptionMedicationJoin addPrescriptionMedicationJoin(PrescriptionMedicationJoin prescriptionMedicationJoin);
    public List<PrescriptionMedicationJoin> getPrescriptionMedicationJoinsByPrescriptionId(Integer prescriptionId); 
}
