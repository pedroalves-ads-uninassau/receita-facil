package br.com.receitafacil.backend.repository;

import br.com.receitafacil.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}