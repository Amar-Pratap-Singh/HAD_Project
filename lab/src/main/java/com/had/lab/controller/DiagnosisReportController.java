package com.had.lab.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.had.lab.model.DiagnosisReport;
import com.had.lab.service.DiagnosisReportService;

@RestController
@CrossOrigin("*")
@RequestMapping("/lab")
public class DiagnosisReportController {
    
    @Autowired 
    private DiagnosisReportService diagnosisReportService;

    @PostMapping("/get-diagnosis-file-path")
    public ResponseEntity<String> getDiagnosisReportPath(@RequestParam("file") MultipartFile file, @RequestParam("patientId") int patientId){
        return diagnosisReportService.saveDiagnosisReportImage(file, patientId);
    }

    @PostMapping("/add-diagnosis-report")
    public DiagnosisReport addDiagnosisReport(@RequestBody DiagnosisReport diagnosisReport){
        return diagnosisReportService.saveDiagnosisReport(diagnosisReport);
    }

    @GetMapping("/get-diagnosis-report-by-patient-id")
    public List<DiagnosisReport> getDiagnosisReport(@RequestParam("patientId") int patientId){
        return diagnosisReportService.getDiagnosisReportByPatientId(patientId);
    }

}
