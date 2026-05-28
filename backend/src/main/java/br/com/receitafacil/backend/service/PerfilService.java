package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Perfil;
import br.com.receitafacil.backend.repository.PerfilRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PerfilService {

    private final PerfilRepository repository;

    public PerfilService(PerfilRepository repository) {
        this.repository = repository;
    }

    public List<Perfil> listar() {
        return repository.findAll();
    }

    public Optional<Perfil> buscarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    @SuppressWarnings("null")
    public Perfil salvar(Perfil perfil) {
        return repository.save(perfil);
    }

    @SuppressWarnings("null")
    public Perfil atualizar(Long id, Perfil perfil) {
        perfil.setId(id);
        return repository.save(perfil);
    }
}
