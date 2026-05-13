package com.receitafacil.controller;

import com.receitafacil.dto.AvaliacaoRequestDTO;
import com.receitafacil.dto.AvaliacaoResponseDTO;
import com.receitafacil.service.AvaliacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AvaliacaoController {

    private final AvaliacaoService avaliacaoService;

    @GetMapping("/receita/{receitaId}")
    public ResponseEntity<List<AvaliacaoResponseDTO>> listarPorReceita(@PathVariable Long receitaId) {
        return ResponseEntity.ok(avaliacaoService.listarPorReceita(receitaId));
    }

    @PostMapping
    public ResponseEntity<AvaliacaoResponseDTO> avaliar(@Valid @RequestBody AvaliacaoRequestDTO body) {
        return ResponseEntity.status(201).body(avaliacaoService.avaliar(body));
    }
}
