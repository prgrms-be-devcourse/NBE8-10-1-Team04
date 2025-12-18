package com.back.domain.admin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admins")
@Setter
@Getter
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String adminName;

    @Column(nullable = false)
    private String password;

    public Admin() {
        // JPA 기본 생성자
    }

    public Admin(String adminName, String  password) {
        this.adminName = adminName;
        this.password = password;
    }

}