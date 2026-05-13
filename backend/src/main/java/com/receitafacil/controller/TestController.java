package com.receitafacil.controller;

import com.receitafacil.model.*;
import com.receitafacil.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collections;
import java.util.HashSet;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;
    private final ReceitasRepository receitasRepository;
    private final CategoriaRepository categoriaRepository;

    @PostMapping("/seed")
    public ResponseEntity<String> seedDatabase() {
        // Criar Admin
        Usuario admin = Usuario.builder()
                .nome("Admin Master")
                .email("admin@receitafacil.com")
                .senha("admin123")
                .tipoUsuario(TipoUsuario.ADMIN)
                .build();
        usuarioRepository.save(admin);

        // Criar Chef
        Usuario chef = Usuario.builder()
                .nome("Chef Gourmet")
                .email("chef@receitafacil.com")
                .senha("chef123")
                .tipoUsuario(TipoUsuario.CHEF)
                .build();
        usuarioRepository.save(chef);

        Perfil perfil = Perfil.builder()
                .usuario(chef)
                .especialidade("Culinária Italiana")
                .descricao("Especialista em massas artesanais.")
                .build();
        perfilRepository.save(perfil);

        // Criar Categoria
        Categoria massa = Categoria.builder().nomeCategoria("Massas").build();
        categoriaRepository.save(massa);

        // Criar Receita
        Receitas receita = Receitas.builder()
                .titulo("Spaghetti Carbonara")
                .passoAPasso("Cozinhe o spaghetti. Misture ovos e queijo...")
                .ingredientes("200g Spaghetti, 2 ovos, 50g Parmesão")
                .tempoPreparo(20)
                .usuario(chef)
                .categorias(new HashSet<>(Collections.singletonList(massa)))
                .build();
        receitasRepository.save(receita);

        return ResponseEntity.ok("Banco populado com sucesso para testes!");
    }
}
