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
        return service.salvar(usuario);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar usuário", description = "Atualiza os dados de um usuário existente pelo ID.")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return service.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar usuário", description = "Remove um usuário do sistema pelo ID.")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}