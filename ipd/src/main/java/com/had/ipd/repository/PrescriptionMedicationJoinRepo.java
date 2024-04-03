package com.had.ipd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.PrescriptionMedicationJoin;

public interface PrescriptionMedicationJoinRepo extends JpaRepository <PrescriptionMedicationJoin, Integer>{
    public List<PrescriptionMedicationJoin> getAllByPrescriptionId(Integer prescriptionId);
}
