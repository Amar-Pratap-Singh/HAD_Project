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
    private Integer wardNo;
    private Integer bedNo;
    private String doctorName;
}
