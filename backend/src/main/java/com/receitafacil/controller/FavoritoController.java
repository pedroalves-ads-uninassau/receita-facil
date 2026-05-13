package com.receitafacil.controller;

import com.receitafacil.dto.FavoritoItemDTO;
import com.receitafacil.dto.FavoritoRequestDTO;
import com.receitafacil.service.FavoritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favoritos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FavoritoController {

    private final FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<Void> adicionar(@RequestBody FavoritoRequestDTO body) {
        favoritoService.favoritarReceita(body.getIdUsuario(), body.getIdReceita());
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<List<FavoritoItemDTO>> listar(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(favoritoService.listarFavoritosParaApi(usuarioId));
    }

    @DeleteMapping("/{usuarioId}/{receitaId}")
    public ResponseEntity<Void> remover(
            @PathVariable Long usuarioId,
            @PathVariable Long receitaId) {
        favoritoService.removerFavorito(usuarioId, receitaId);
        return ResponseEntity.noContent().build();
    }
}
