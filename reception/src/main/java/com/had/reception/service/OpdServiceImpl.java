package com.had.reception.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.OpdAppointment;
import com.had.reception.repository.OpdAppointmentRepo;

@Service
public class OpdServiceImpl implements OpdService{
    @Autowired
    private OpdAppointmentRepo opdAppointmentRepo;

    @Override
    public OpdAppointment createOpdAppointment(OpdAppointment opdAppointment) {
        return opdAppointmentRepo.save(opdAppointment);
    }

    @Override
    public List<OpdAppointment> getOpdAppointments(){
        return opdAppointmentRepo.findAll();
    }
}
