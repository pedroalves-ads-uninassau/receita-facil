package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Usuario;
import br.com.receitafacil.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioService service; // Agora o Java sabe quem é o "service"

    @GetMapping
    public List<Usuario> listar() {
        return service.listarTodos();
    }

    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario) {
        return service.salvar(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return service.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}