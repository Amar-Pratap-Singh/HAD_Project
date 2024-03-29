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
    private Integer patientId;
    private String Department;
    private Integer ward_no;
    private Integer bed_no;
    private String doctorName;
}
