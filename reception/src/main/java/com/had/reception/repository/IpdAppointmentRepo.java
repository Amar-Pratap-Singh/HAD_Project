package com.had.reception.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.had.reception.models.IpdAppointment;

@Repository
public interface IpdAppointmentRepo extends JpaRepository<IpdAppointment, Integer> {
    
}
