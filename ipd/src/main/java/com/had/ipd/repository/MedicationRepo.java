package com.had.ipd.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.ipd.models.Medication;

public interface MedicationRepo extends JpaRepository<Medication, Integer>{
    
}
