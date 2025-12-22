package com.back.domain.admin.service;

import com.back.domain.admin.entity.Admin;
import com.back.domain.admin.repository.AdminRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public Admin create(String adminName, String password) {
        Admin admin = new Admin();
        admin.setAdminName(adminName);
        admin.setPassword(passwordEncoder.encode(password));
        this.adminRepository.save(admin);
        return admin;
    }

    public boolean login(String adminName, String rawPassword) {
        Admin admin = adminRepository.findByAdminName(adminName)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 관리자"));

        return passwordEncoder.matches(rawPassword, admin.getPassword());
    }
}