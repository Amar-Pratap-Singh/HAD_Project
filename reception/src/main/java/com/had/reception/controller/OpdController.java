package com.had.reception.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.reception.models.OpdAppointment;
import com.had.reception.service.OpdService;


@RestController
@RequestMapping("/patient")
public class OpdController {
    @Autowired
    private OpdService opdService;

    @PostMapping("/opdappointment")
    public String createOpdAppointment(@RequestBody OpdAppointment opdAppointment){
        opdService.createOpdAppointment(opdAppointment);
        return "Appointment created Successfully";
    }

    @GetMapping("/get-opd-appointments")
    public List<OpdAppointment> getOpdAppointments(){
        return opdService.getOpdAppointments();
    }
}
