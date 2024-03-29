package com.had.reception.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IpdAppointment {
    @Id
    private int patientId;
    String Department;
    Integer ward_no;
    Integer bed_no;
    String doctorName;
}
