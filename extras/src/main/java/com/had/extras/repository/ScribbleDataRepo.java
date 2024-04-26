package com.had.extras.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.had.extras.model.ScribbleData;

public interface ScribbleDataRepo extends JpaRepository<ScribbleData, Integer>{
    public Optional<ScribbleData> findByPrescriptionId();
}
