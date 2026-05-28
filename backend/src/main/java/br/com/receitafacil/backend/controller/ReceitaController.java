package br.com.receitafacil.backend.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Receitas", description = "Operações relacionadas às receitas culinárias")
public class ReceitaController {

    @Autowired
    private ReceitaService service;

    @GetMapping
    @Operation(summary = "Listar receitas", description = "Retorna todas as receitas cadastradas no sistema.")
    public List<Receita> listar() {
        return service.listarTodas();
    }

    @GetMapping("/busca/{titulo}")
    @Operation(summary = "Buscar por título", description = "Busca receitas pelo título em tempo real (search-as-you-type).")
    public List<Receita> buscar(@PathVariable String titulo) {
        return service.buscarPorTitulo(titulo);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar receita por ID", description = "Obtém os detalhes de uma receita pelo seu ID.")
    public Receita buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @GetMapping("/usuario/{usuarioId}")
    @Operation(summary = "Receitas de um chef", description = "Retorna todas as receitas publicadas por um usuário/chef específico.")
    public List<Receita> buscarPorUsuario(@PathVariable Long usuarioId) {
        return service.buscarPorUsuario(usuarioId);
    }

    @GetMapping("/categoria/{categoriaId}")
    @Operation(summary = "Receitas por categoria", description = "Retorna todas as receitas pertencentes a uma categoria específica.")
    public List<Receita> buscarPorCategoria(@PathVariable Long categoriaId) {
        return service.buscarPorCategoria(categoriaId);
    }

    @PostMapping
    @Operation(summary = "Criar receita", description = "Cadastra uma nova receita no sistema.")
    public Receita salvar(@RequestBody Receita receita) {
        return service.salvar(receita);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar receita", description = "Atualiza os dados de uma receita existente pelo ID.")
    public Receita atualizar(@PathVariable Long id, @RequestBody Receita receita) {
        receita.setId(id);
        return service.salvar(receita);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar receita", description = "Remove uma receita do sistema pelo ID.")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}
