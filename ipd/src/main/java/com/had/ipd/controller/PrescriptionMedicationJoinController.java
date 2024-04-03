package com.had.ipd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.had.ipd.models.PrescriptionMedicationJoin;
import com.had.ipd.service.PrescriptionMedicationJoinService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin
@RequestMapping("/ipd")
public class PrescriptionMedicationJoinController {
    
    @Autowired
    private PrescriptionMedicationJoinService prescriptionMedicationJoinService;

    @PostMapping("/add-prescription-medication")
    public PrescriptionMedicationJoin addPrescriptionMedicationJoin(@RequestBody PrescriptionMedicationJoin prescriptionMedicationJoin) {
        return prescriptionMedicationJoinService.addPrescriptionMedicationJoin(prescriptionMedicationJoin);
    }

    @GetMapping("/get-prescription-medication")
    public List<PrescriptionMedicationJoin> getPrescriptionMedicationJoins(@RequestParam Integer prescriptionId) {
        return prescriptionMedicationJoinService.getPrescriptionMedicationJoinsByPrescriptionId(prescriptionId);
    }
    
}
