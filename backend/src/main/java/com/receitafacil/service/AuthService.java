package com.receitafacil.service;

import com.receitafacil.dto.AuthLoginRequestDTO;
import com.receitafacil.dto.AuthRegisterRequestDTO;
import com.receitafacil.dto.AuthResponseDTO;
import com.receitafacil.model.Usuario;
import com.receitafacil.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public AuthResponseDTO register(AuthRegisterRequestDTO body) {
        if (usuarioRepository.existsByEmail(body.getEmail())) {
            throw new RuntimeException("Email já cadastrado.");
        }

        Usuario novo = Usuario.builder()
                .nome(body.getNome())
                .email(body.getEmail())
                .senha(passwordEncoder.encode(body.getSenha()))
                .tipoUsuario(body.getTipoUsuario())
                .build();

        Usuario salvo = usuarioRepository.save(novo);
        return toAuthResponse(salvo);
    }

    @Transactional(readOnly = true)
    public AuthResponseDTO login(AuthLoginRequestDTO body) {
        Usuario usuario = usuarioRepository.findByEmail(body.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas."));

        boolean senhaOk = passwordEncoder.matches(body.getSenha(), usuario.getSenha());
        if (!senhaOk) {
            throw new RuntimeException("Credenciais inválidas.");
        }

        return toAuthResponse(usuario);
    }

    private AuthResponseDTO toAuthResponse(Usuario user) {
        return AuthResponseDTO.builder()
                .id(user.getId())
                .nome(user.getNome())
                .email(user.getEmail())
                .tipoUsuario(user.getTipoUsuario())
                .build();
    }
}
