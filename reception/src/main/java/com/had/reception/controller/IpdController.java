package com.had.reception.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.reception.models.IpdAppointment;
import com.had.reception.service.IpdService;

@RestController
@RequestMapping("/patient")
public class IpdController {
    @Autowired
    private IpdService ipdService;

    @PostMapping("/ipdappointment")
    public String createIpdAppointment(@RequestBody IpdAppointment ipdAppointment){
        ipdService.createIpdAppointment(ipdAppointment);
        return "Appointment created Successfully";
    }

    @GetMapping("/get-ipd-appointments")
    public List<IpdAppointment> getIpdAppointments(){
        return ipdService.getIpdAppointments();
    }
}
