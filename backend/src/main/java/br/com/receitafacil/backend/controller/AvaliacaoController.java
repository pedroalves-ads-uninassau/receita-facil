package br.com.receitafacil.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.receitafacil.backend.entity.Avaliacao;
import br.com.receitafacil.backend.service.AvaliacaoService;

@RestController

@RequestMapping("/avaliacoes") 
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @PostMapping
    public Avaliacao avaliar(@RequestBody Avaliacao avaliacao) {
        return avaliacaoService.salvar(avaliacao);
    }

}
