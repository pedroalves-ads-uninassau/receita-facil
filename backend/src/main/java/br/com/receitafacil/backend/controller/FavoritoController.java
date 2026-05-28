package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.dto.FavoritoDTO;
import br.com.receitafacil.backend.entity.Receita;
import br.com.receitafacil.backend.service.FavoritoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@CrossOrigin("*")
@Tag(name = "Favoritos", description = "Operações relacionadas às receitas favoritas dos usuários")
public class FavoritoController {

    @Autowired
    private FavoritoService service;

    @GetMapping("/{usuarioId}")
    @Operation(summary = "Listar favoritos", description = "Retorna todas as receitas favoritas de um usuário pelo seu ID.")
    public List<Receita> listarFavoritos(@PathVariable Long usuarioId) {
        return service.listarFavoritos(usuarioId);
    }

    @PostMapping
    @Operation(summary = "Favoritar receita", description = "Adiciona uma receita à lista de favoritos de um usuário.")
    public void favoritar(@RequestBody FavoritoDTO dto) {
        service.favoritar(dto.getUsuarioId(), dto.getReceitaId());
    }

    @DeleteMapping
    @Operation(summary = "Desfavoritar receita", description = "Remove uma receita da lista de favoritos de um usuário.")
    public void desfavoritar(@RequestBody FavoritoDTO dto) {
        service.desfavoritar(dto.getUsuarioId(), dto.getReceitaId());
    }
}
