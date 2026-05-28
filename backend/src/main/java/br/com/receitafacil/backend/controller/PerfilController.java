package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Perfil;
import br.com.receitafacil.backend.service.PerfilService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfis")
@CrossOrigin("*")
@Tag(name = "Perfis", description = "Operações relacionadas aos perfis de chefs")
public class PerfilController {

    private final PerfilService service;

    public PerfilController(PerfilService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Listar perfis", description = "Retorna todos os perfis de chefs cadastrados.")
    public List<Perfil> listar() {
        return service.listar();
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Buscar perfil por usuário", description = "Retorna o perfil de chef de um usuário específico pelo ID.")
    public Perfil buscarPorUsuario(@PathVariable Long usuarioId) {
        return service.buscarPorUsuario(usuarioId).orElse(null);
    }

    @PostMapping
    @Operation(summary = "Criar perfil", description = "Cadastra um novo perfil de chef para um usuário.")
    public Perfil salvar(@RequestBody Perfil perfil) {
        return service.salvar(perfil);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar perfil", description = "Atualiza os dados do perfil de um chef pelo ID.")
    public Perfil atualizar(@PathVariable Long id, @RequestBody Perfil perfil) {
        return service.atualizar(id, perfil);
    }
}
