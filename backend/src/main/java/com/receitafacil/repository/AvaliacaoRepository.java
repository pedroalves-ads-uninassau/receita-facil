package com.receitafacil.repository;

import com.receitafacil.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByReceita_IdOrderByCreatedAtDesc(Long receitaId);
    Optional<Avaliacao> findByUsuario_IdAndReceita_Id(Long usuarioId, Long receitaId);
}
