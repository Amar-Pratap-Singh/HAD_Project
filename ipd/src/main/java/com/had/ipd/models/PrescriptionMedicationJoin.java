package com.had.ipd.models;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrescriptionMedicationJoin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int prescriptionMedicationJoinId;
    private int prescriptionId;
    private int medicationId;
}
