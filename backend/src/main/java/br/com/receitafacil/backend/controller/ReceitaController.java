package br.com.receitafacil.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.receitafacil.backend.entity.Receita;
import br.com.receitafacil.backend.service.ReceitaService;

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

    @GetMapping("/busca/{titulo}")
    public List<Receita> buscar(@PathVariable String titulo) {
        return service.buscarPorTitulo(titulo);
    }

    @GetMapping("/{id}")
    public Receita buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
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
