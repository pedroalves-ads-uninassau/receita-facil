package br.com.receitafacil.backend.repository;

import br.com.receitafacil.backend.entity.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    List<Avaliacao> findByReceitaId(Long receitaId);

}
