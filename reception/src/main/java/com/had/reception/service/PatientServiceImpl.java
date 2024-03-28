package com.had.reception.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.Patient;
import com.had.reception.repository.PatientRepo;

@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    private PatientRepo patientRepo;

    @Override
    public Patient savePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    @Override
    public List<Patient> getAllPatients(){
        return patientRepo.findAll();
    }
    @Override
    public Optional<Patient> getDemographics(Integer id){
        return patientRepo.findById(id);
    }
    
}
