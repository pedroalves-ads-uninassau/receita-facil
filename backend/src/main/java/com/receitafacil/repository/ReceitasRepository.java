package com.receitafacil.repository;

import com.receitafacil.model.Receitas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitasRepository extends JpaRepository<Receitas, Long> {

    List<Receitas> findByTituloContainingIgnoreCase(String titulo);

    List<Receitas> findByUsuario_Id(Long usuarioId);

    @Query("SELECT r FROM Receitas r JOIN r.categorias c WHERE c.idCategoria = :categoriaId")
    List<Receitas> findByCategorias_IdCategoria(Long categoriaId);

    // Endpoint Swipe: Buscar receitas que o usuário ainda não favoritou (Opcional, mas segue lógica do prompt)
    // No swipe básico, apenas listamos aleatoriamente por enquanto
    @Query(value = "SELECT * FROM Receitas ORDER BY RAND()", nativeQuery = true)
    List<Receitas> findAllRandom();
}
