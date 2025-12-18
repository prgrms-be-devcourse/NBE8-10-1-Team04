package com.back.domain.admin.adminDto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCreateForm {
    @Size(min = 3, max = 25)
    @NotEmpty(message = "ID는 필수항목입니다.")
    private String adminName;

    @NotEmpty(message = "비밀번호는 필수항목입니다.")
    private String password1;

    @NotEmpty(message = "비밀번호 확인은 필수항목입니다.")
    private String password2;
}
