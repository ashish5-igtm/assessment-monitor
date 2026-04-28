package com.assessment.monitor.controller;

import com.assessment.monitor.model.Teacher;
import com.assessment.monitor.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        if (teachers.isEmpty()) {
            teacherRepository.save(new Teacher("Default Teacher", "teacher@school.edu", "teacher123"));
            teachers = teacherRepository.findAll();
        }
        return ResponseEntity.ok(teachers);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerTeacher(@RequestBody Teacher teacher) {
        Optional<Teacher> existingTeacher = teacherRepository.findByEmail(teacher.getEmail());
        if (existingTeacher.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already safely registered.");
        }

        Teacher savedTeacher = teacherRepository.save(teacher);
        return ResponseEntity.ok(savedTeacher);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginTeacher(@RequestBody Teacher loginData) {
        Optional<Teacher> existingTeacher = teacherRepository.findByEmail(loginData.getEmail());
        if (existingTeacher.isPresent() && existingTeacher.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(existingTeacher.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
