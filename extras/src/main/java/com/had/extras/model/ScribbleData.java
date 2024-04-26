package com.had.extras.model;

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
public class ScribbleData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scribbleDataId;
    private int prescriptionId;
    private String data;
    private String path;
}
