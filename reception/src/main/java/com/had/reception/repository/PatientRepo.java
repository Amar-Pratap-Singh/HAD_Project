package com.had.reception.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.reception.models.Patient;

@Repository
public interface PatientRepo extends JpaRepository<Patient, Integer>{
    Optional<Patient> findById(Integer id);
}
