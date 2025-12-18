package com.back.domain.admin;

import lombok.Getter;

@Getter
public enum AdminRole {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER");

    AdminRole(String value) {
        this.value = value;
    }

    private String value;
}
