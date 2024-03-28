package com.had.opd.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Medicine {
    @Id
    private int medicineId;
    private String medicineName;
    private int count;
    private String instruction;

    @ManyToOne
    @JoinColumn(name = "record_id")
    private PatientRecord patientRecord;

    // Getter and setter methods for 'medicineName'
    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    // Getter and setter methods for 'count'
    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    // Getter and setter methods for 'instruction'
    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }
}

