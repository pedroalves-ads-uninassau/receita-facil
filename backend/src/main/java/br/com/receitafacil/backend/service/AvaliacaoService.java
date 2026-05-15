package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Avaliacao;
import br.com.receitafacil.backend.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> buscarPorReceita(Long receitaId) {
        return avaliacaoRepository.findByReceitaId(receitaId);
    }

    @SuppressWarnings("null")
    public Avaliacao salvar(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }
}
