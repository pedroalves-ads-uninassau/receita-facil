package com.receitafacil.controller;

import com.receitafacil.dto.ReceitaDTO;
import com.receitafacil.model.Receitas;
import com.receitafacil.service.ReceitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/receitas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ReceitaController {

    private final ReceitaService receitaService;

    @GetMapping
    public ResponseEntity<List<ReceitaDTO>> listarTodas() {
        return ResponseEntity.ok(receitaService.listarTodas().stream()
                .map(receitaService::toDTO).collect(Collectors.toList()));
    }

    @GetMapping("/swipe")
    public ResponseEntity<List<ReceitaDTO>> swipe() {
        return ResponseEntity.ok(receitaService.buscarParaSwipe().stream()
                .map(receitaService::toDTO).collect(Collectors.toList()));
    }

    @GetMapping("/busca")
    public ResponseEntity<List<ReceitaDTO>> busca(@RequestParam String q) {
        return ResponseEntity.ok(receitaService.buscarPorTitulo(q).stream()
                .map(receitaService::toDTO).collect(Collectors.toList()));
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<ReceitaDTO>> porCategoria(@PathVariable Long id) {
        return ResponseEntity.ok(receitaService.buscarPorCategoria(id).stream()
                .map(receitaService::toDTO).collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<ReceitaDTO> criar(@RequestBody Receitas receita) {
        return ResponseEntity.status(201).body(receitaService.toDTO(receitaService.criarReceita(receita)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReceitaDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(receitaService.toDTO(receitaService.buscarPorId(id)));
    }
}
