package com.assessment.monitor.controller;

import com.assessment.monitor.model.Student;
import com.assessment.monitor.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        // Seed an example student if empty
        if (students.isEmpty()) {
            studentRepository.save(new Student("John Doe", "john.doe@example.com", "password123"));
            studentRepository.save(new Student("Jane Smith", "jane.smith@example.com", "password123"));
            students = studentRepository.findAll();
        }
        return ResponseEntity.ok(students);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        Optional<Student> existingStudent = studentRepository.findByEmail(student.getEmail());
        if (existingStudent.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already safely registered.");
        }
        
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.ok(savedStudent);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Student loginData) {
        Optional<Student> existingStudent = studentRepository.findByEmail(loginData.getEmail());
        if (existingStudent.isPresent() && existingStudent.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(existingStudent.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
