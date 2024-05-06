package com.had.lab.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.had.lab.model.DiagnosisReport;
import org.springframework.http.ResponseEntity;

public interface DiagnosisReportService {
    public List<DiagnosisReport> getDiagnosisReportByPatientId(int patientId);
    public ResponseEntity<String> saveDiagnosisReportImage(MultipartFile file, int patientId);
    public DiagnosisReport saveDiagnosisReport(DiagnosisReport diagnosisReport);
}
