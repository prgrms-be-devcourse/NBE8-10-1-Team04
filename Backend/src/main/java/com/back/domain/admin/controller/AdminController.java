package com.back.domain.admin.controller;

import com.back.domain.admin.adminDto.AdminCreateForm;
import com.back.domain.admin.adminDto.AdminLoginRequest;
import com.back.domain.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
public class AdminController {

    private final AdminService adminService;
    private final AuthenticationManager authenticationManager;

    // 관리자 회원가입 (API)
    @PostMapping("/admin/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public void signup(@RequestBody @Valid AdminCreateForm form) {

        if (!form.getPassword1().equals(form.getPassword2())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        adminService.create(form.getAdminName(), form.getPassword1());
    }

    @PostMapping("/adlogin")
    public Map<String, String> login(@RequestBody AdminLoginRequest req, HttpServletRequest request, HttpServletResponse response) {
        // 아이디/비밀번호 검증 (실패 시 401 Unauthorized 계열 예외 발생)
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getAdminName(), req.getPassword())
        );

        HttpSession oldSession = request.getSession(false);
        if (oldSession != null) {
            oldSession.invalidate();
        }
        HttpSession session = request.getSession(true);

        //  시큐리티 컨텍스트 설정 및 저장
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        SecurityContextHolder.setContext(context);

        // 세션에 시큐리티 컨텍스트를 저장해야 다음 요청에서 권한을 인식.
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

        return Map.of("message", "login success");
    }


}
