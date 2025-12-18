package com.back.domain.admin.repository;

import com.back.domain.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository  extends JpaRepository<Admin, Long> {

    Optional<Admin> findByAdminName(String adminName);
}
