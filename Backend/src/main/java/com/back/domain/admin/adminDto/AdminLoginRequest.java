package com.back.domain.admin.adminDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminLoginRequest {
    private String adminName;
    private String password;
}
