package com.had.reception.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.reception.models.Patient;
import com.had.reception.service.PatientService;

@RestController
@RequestMapping("/patient")
public class PatientController {
    
    @Autowired
    private PatientService patientService;

    @PostMapping("/add-patient")
    public String addPatient(@RequestBody Patient patient){
        patientService.savePatient(patient);
        return "Patient Added Successfully";
    }

    @GetMapping("/get-all-patients")
    public List<Patient> getAllPatients(){
        return patientService.getAllPatients();
    }

}
