package br.com.receitafacil.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.receitafacil.backend.entity.Receita;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    List<Receita> findByTituloContainingIgnoreCase(String titulo);

    List<Receita> findByUsuarioId(Long usuarioId);

    List<Receita> findByCategorias_Id(Long categoriaId);

}
