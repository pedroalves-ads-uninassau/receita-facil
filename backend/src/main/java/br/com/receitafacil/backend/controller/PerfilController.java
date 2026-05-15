package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Perfil;
import br.com.receitafacil.backend.service.PerfilService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfis")
public class PerfilController {

    private final PerfilService service;

    public PerfilController(PerfilService service) {
        this.service = service;
    }

    @GetMapping
    public List<Perfil> listar() {
        return service.listar();
    }

    @PostMapping
    public Perfil salvar(@RequestBody Perfil perfil) {
        return service.salvar(perfil);
    }
}
