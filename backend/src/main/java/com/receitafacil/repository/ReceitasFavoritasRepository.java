package com.receitafacil.repository;

import com.receitafacil.model.ReceitasFavoritas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitasFavoritasRepository extends JpaRepository<ReceitasFavoritas, ReceitasFavoritas.FavoritoId> {

    List<ReceitasFavoritas> findByUsuario_Id(Long usuarioId);
}
