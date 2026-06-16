package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Usuario;
import br.com.receitafacil.backend.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
@Tag(name = "Usuários", description = "Operações relacionadas aos usuários do sistema")
public class UsuarioController {

    @Autowired
    private UsuarioService service;

    @PostMapping("/login")
    @Operation(summary = "Login de usuário", description = "Autentica um usuário pelo email e senha.")
    public Usuario login(@RequestBody Usuario usuario) {
        return service.login(usuario);
    }

    @GetMapping
    @Operation(summary = "Listar usuários", description = "Retorna todos os usuários cadastrados no sistema.")
    public List<Usuario> listar() {
        return service.listarTodos();
    }

    @PostMapping
    @Operation(summary = "Criar usuário", description = "Cadastra um novo usuário no sistema.")
    public Usuario salvar(@RequestBody Usuario usuario) {
        if (usuario.getTipoUsuario() == null) {
            usuario.setTipoUsuario(br.com.receitafacil.backend.entity.TipoUsuario.COMUM);
        }
        return service.salvar(usuario);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna um usuário específico baseado no seu ID.")
    public org.springframework.http.ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id)
                .map(org.springframework.http.ResponseEntity::ok)
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário", description = "Atualiza os dados de um usuário existente pelo ID.")
    public org.springframework.http.ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        return service.buscarPorId(id).map(existente -> {
            if (usuario.getNome() != null) existente.setNome(usuario.getNome());
            if (usuario.getEmail() != null) existente.setEmail(usuario.getEmail());
            if (usuario.getSenha() != null) existente.setSenha(usuario.getSenha());
            if (usuario.getTipoUsuario() != null) existente.setTipoUsuario(usuario.getTipoUsuario());
            return org.springframework.http.ResponseEntity.ok(service.salvar(existente));
        }).orElse(org.springframework.http.ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar usuário", description = "Remove um usuário do sistema pelo ID.")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}