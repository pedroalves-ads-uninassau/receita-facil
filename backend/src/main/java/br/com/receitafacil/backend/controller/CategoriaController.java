package br.com.receitafacil.backend.controller;

import br.com.receitafacil.backend.entity.Categoria;
import br.com.receitafacil.backend.service.CategoriaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin("*")
@Tag(name = "Categorias", description = "Operações relacionadas às categorias de receitas")
public class CategoriaController {

    @Autowired
    private CategoriaService service;

    @GetMapping
    @Operation(summary = "Listar categorias", description = "Retorna todas as categorias cadastradas no sistema.")
    public List<Categoria> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar categoria por ID", description = "Obtém os detalhes de uma categoria pelo seu ID.")
    public Categoria buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Criar categoria", description = "Cadastra uma nova categoria no sistema.")
    public Categoria salvar(@RequestBody Categoria categoria) {
        return service.salvar(categoria);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar categoria", description = "Remove uma categoria do sistema pelo ID.")
    public void deletar(@PathVariable Long id) {
        service.excluir(id);
    }
}
