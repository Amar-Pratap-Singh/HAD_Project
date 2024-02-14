package com.had.reception.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Document(collection="")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient {

    @Id
    private int id;
    private String name;
    private int age;
    private String bloodGroup;
    private String gender;
    private String contact;
    private String address;
    
}
