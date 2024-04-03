package com.had.ipd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.ipd.models.PrescriptionMedicationJoin;
import com.had.ipd.repository.PrescriptionMedicationJoinRepo;

@Service
public class PrescriptionMedicationJoinServiceImpl implements PrescriptionMedicationJoinService{

    @Autowired
    private PrescriptionMedicationJoinRepo prescriptionMedicationJoinRepo;

    @Override
    public PrescriptionMedicationJoin addPrescriptionMedicationJoin(PrescriptionMedicationJoin prescriptionMedicationJoin){
        return prescriptionMedicationJoinRepo.save(prescriptionMedicationJoin);
    }
    
    @Override
    public List<PrescriptionMedicationJoin> getPrescriptionMedicationJoinsByPrescriptionId(Integer prescriptionId){
        return prescriptionMedicationJoinRepo.getAllByPrescriptionId(prescriptionId);
    }
}
