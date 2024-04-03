package com.had.ipd.service;

import java.util.Optional;

import com.had.ipd.models.Medication;

public interface MedicationService {

    public Medication addMedication(Medication medication);
    public Optional<Medication> getMedicationById(Integer medicationId);
    
} 
