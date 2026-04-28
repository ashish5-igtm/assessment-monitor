package com.assessment.monitor.controller;

import com.assessment.monitor.model.Assessment;
import com.assessment.monitor.repository.AssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentRepository assessmentRepository;

    @GetMapping
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        List<Assessment> assessments = assessmentRepository.findAll();
        
        // Seed database if empty, matching the frontend mocks
        if (assessments.isEmpty()) {
            assessmentRepository.save(new Assessment("Module 1 Quiz", "Mathematics", "2024-02-15", 85.0, 100.0, "completed", 20, 60));
            assessmentRepository.save(new Assessment("Science Project", "Physics", "2024-02-20", 92.0, 100.0, "completed", 15, 120));
            assessments = assessmentRepository.findAll();
        }
        
        return ResponseEntity.ok(assessments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessmentById(@PathVariable Long id) {
        Optional<Assessment> assessment = assessmentRepository.findById(id);
        return assessment.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Assessment> createAssessment(@RequestBody Assessment assessment) {
        Assessment savedAssessment = assessmentRepository.save(assessment);
        return ResponseEntity.ok(savedAssessment);
    }

    @PostMapping("/{id}/pdf")
    public ResponseEntity<?> uploadPdf(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }

        try {
            Optional<Assessment> assessmentOptional = assessmentRepository.findById(id);
            if (assessmentOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Assessment assessment = assessmentOptional.get();

            String uploadDir = "uploads/";
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.write(path, file.getBytes());

            assessment.setPdfFilePath(fileName);
            assessmentRepository.save(assessment);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }
}
