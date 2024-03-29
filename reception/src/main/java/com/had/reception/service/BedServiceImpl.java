package com.had.reception.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.had.reception.models.Bed;
import com.had.reception.models.IpdAppointment;
import com.had.reception.repository.BedRepo;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepo bedRepo;

    @Override
    public Bed updateBedStatusToOccupied(IpdAppointment ipdAppointment) {
        Integer bed_no = ipdAppointment.getBed_no();
        Integer ward_no = ipdAppointment.getWard_no();
        Integer patientId = ipdAppointment.getPatientId();

        Optional<Bed> optionalBed = bedRepo.findByBedNoAndWardNo(bed_no, ward_no);
       
        if (optionalBed.isPresent()) {
            Bed bed = optionalBed.get();
            if(bed.getStatus().equals("Occupied"))
            {
                System.out.println("This bed is Not Available");
                return null;
            }
            bed.setStatus("Occupied");
            bed.setPatientId(patientId);
            bedRepo.save(bed);
            return bed;
        } else {
            System.out.println("Bed not found with bed_no: " + bed_no + " and ward_no: " + ward_no);
        }
        return null;
        
    }
    
    @Override
    public List<Bed> getAllBeds()
    {   
        return bedRepo.findAll();
    }

    @Override
    public void populateDummyData() {
        Random random = new Random();
        Set<String> uniqueCombinations = new HashSet<>();
        
        // Create 200 rows of dummy data
        for (int i = 0; i < 200; i++) {
            int bedNo = random.nextInt(100) + 1; // Random bed number between 1 and 100
            int wardNo = random.nextInt(10) + 1; // Random ward number between 1 and 10
            String combination = bedNo + "_" + wardNo;
            
            // Check if the combination is unique
            if (!uniqueCombinations.contains(combination)) {
                Bed bed = new Bed();
                bed.setBedNo(bedNo);
                bed.setWardNo(wardNo);
                bed.setFloorNo(random.nextInt(5) + 1); // Random floor number between 1 and 5
                bed.setPatientId(null); // No patient assigned initially
                bed.setStatus("Available"); // Set status to "Available"
                bedRepo.save(bed); // Save the bed entity
                
                uniqueCombinations.add(combination); // Add the combination to the set
            }
        }
    }

}
