package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Perfil;
import br.com.receitafacil.backend.repository.PerfilRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerfilService {

    private final PerfilRepository repository;

    public PerfilService(PerfilRepository repository) {
        this.repository = repository;
    }

    public List<Perfil> listar() {
        return repository.findAll();
    }

    public Perfil salvar(Perfil perfil) {
        return repository.save(perfil);
    }
}
