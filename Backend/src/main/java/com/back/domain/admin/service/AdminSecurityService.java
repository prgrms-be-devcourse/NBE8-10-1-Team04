package com.back.domain.admin.service;

import com.back.domain.admin.entity.Admin;
import com.back.domain.admin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminSecurityService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String adminName)
            throws UsernameNotFoundException {

        Admin admin = adminRepository.findByAdminName(adminName)
                .orElseThrow(() ->
                        new UsernameNotFoundException("관리자를 찾을 수 없습니다.")
                );

        // 관리자 권한 부여
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));

        return new User(
                admin.getAdminName(),
                admin.getPassword(),
                authorities
        );
    }
}
