package com.assessment.monitor.controller;

import com.assessment.monitor.model.Admin;
import com.assessment.monitor.repository.AdminRepository;
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
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        if (admins.isEmpty()) {
            adminRepository.save(new Admin("System Admin", "admin@example.com", "admin123"));
            admins = adminRepository.findAll();
        }
        return ResponseEntity.ok(admins);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(admin.getEmail());
        if (existingAdmin.isPresent()) {
            return ResponseEntity.badRequest().body("Email is already safely registered.");
        }

        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody Admin loginData) {
        Optional<Admin> existingAdmin = adminRepository.findByEmail(loginData.getEmail());
        if (existingAdmin.isPresent() && existingAdmin.get().getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(existingAdmin.get());
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
