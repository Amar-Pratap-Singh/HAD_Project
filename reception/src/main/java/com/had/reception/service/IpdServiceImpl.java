package com.had.reception.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.IpdAppointment;
import com.had.reception.repository.IpdAppointmentRepo;

@Service
public class IpdServiceImpl implements IpdService {
    @Autowired
    private IpdAppointmentRepo ipdAppointmentRepo;

    @Override
    public IpdAppointment createIpdAppointment(IpdAppointment ipdAppointment) {
        return ipdAppointmentRepo.save(ipdAppointment);
    }

    @Override
    public List<IpdAppointment> getIpdAppointments(){
        return ipdAppointmentRepo.findAll();
    }
}
