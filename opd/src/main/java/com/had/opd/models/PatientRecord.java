package com.had.opd.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
// import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int recordId;
    private int patientId;
    private int doctorId;
    private String hospitalName;
    private String patientComplaints;

    // vitals
    private double weight;
    private double height;
    private double temperature;
    private int lowBP;
    private int highBP;

    // medicines
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "patientRecord")
    private List<Medicine> medicines;
    
    private String advice;
    private String followUp; 
}
