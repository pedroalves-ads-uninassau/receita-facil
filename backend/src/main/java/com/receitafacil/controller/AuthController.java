package com.receitafacil.controller;

import com.receitafacil.dto.AuthLoginRequestDTO;
import com.receitafacil.dto.AuthRegisterRequestDTO;
import com.receitafacil.dto.AuthResponseDTO;
import com.receitafacil.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody AuthRegisterRequestDTO body) {
        return ResponseEntity.status(201).body(authService.register(body));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody AuthLoginRequestDTO body) {
        return ResponseEntity.ok(authService.login(body));
    }
}
