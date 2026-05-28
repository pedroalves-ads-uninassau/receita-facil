package br.com.receitafacil.backend.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.receitafacil.backend.entity.Avaliacao;
import br.com.receitafacil.backend.service.AvaliacaoService;

@RestController
@RequestMapping("/avaliacoes")
@CrossOrigin("*")
@Tag(name = "Avaliações", description = "Operações relacionadas às avaliações de receitas")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping
    @Operation(summary = "Criar avaliação", description = "Registra uma nova avaliação (nota e comentário) para uma receita.")
    public Avaliacao avaliar(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.salvar(avaliacao);
    }

    @GetMapping("/receita/{receitaId}")
    @Operation(summary = "Listar avaliações de uma receita", description = "Retorna todas as avaliações de uma receita específica pelo ID.")
    public List<Avaliacao> listarPorReceita(@PathVariable Long receitaId) {
        return avaliacaoService.buscarPorReceita(receitaId);
    }
}
