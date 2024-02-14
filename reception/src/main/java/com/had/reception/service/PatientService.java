package com.had.reception.service;

import java.util.List;
import com.had.reception.models.Patient;

public interface PatientService {
    public Patient savePatient(Patient patient); 
    public List<Patient> getAllPatients();   
} 
