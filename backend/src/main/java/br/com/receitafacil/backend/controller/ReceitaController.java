package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Receita;
import br.com.receitafacil.backend.service.ReceitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
@CrossOrigin("*")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    public List<Receita> listar() {
        return service.listarTodas();
    }

    @PostMapping
    public Receita salvar(@RequestBody Receita receita) {
        return service.salvar(receita);
    }

    @PutMapping("/{id}")
    public Receita atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        receita.setId(id);
        return service.salvar(receita);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}
