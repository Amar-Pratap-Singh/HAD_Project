package com.had.lab.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.multipart.MultipartFile;
import com.had.lab.model.DiagnosisReport;
import com.had.lab.repository.DiagnosisReportRepo;
import com.had.lab.service.DiagnosisReportService;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@Service
public class DiagnosisReportServiceImpl implements DiagnosisReportService {

    @Autowired
    private DiagnosisReportRepo diagnosisReportRepo;

    // Define the directory where you want to save the uploaded files
    private static final String UPLOAD_DIR = "/Users/amar/Documents/Sem8/HAD/HAD_Project/DiagnosisReport/";

    @Override
    public List<DiagnosisReport> getDiagnosisReportByPatientId(int patientId) {
        return diagnosisReportRepo.findAllByPatientId(patientId);
    }

    @Override
    public DiagnosisReport saveDiagnosisReport(DiagnosisReport diagnosisReport){
        return diagnosisReportRepo.save(diagnosisReport);
    }

    @Override
    public ResponseEntity<String> saveDiagnosisReportImage(MultipartFile file, int patientId) {
        // Create the upload directory if it doesn't exist
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        try {
            // Generate a unique filename for the uploaded file
            String fileName = patientId + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();

            Path filePath = Paths.get(UPLOAD_DIR, fileName);
            Files.copy(file.getInputStream(), filePath);
            String path = filePath.toString();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
    
            // Return the path in the response body with the appropriate headers
            return ResponseEntity.ok().headers(headers).body(path);

            // return path;
            // return diagnosisReportRepo.save(diagnosisReport);

        } catch (IOException e) {
            // Handle file save error
            e.printStackTrace();
            return null;
        }

    }
}
