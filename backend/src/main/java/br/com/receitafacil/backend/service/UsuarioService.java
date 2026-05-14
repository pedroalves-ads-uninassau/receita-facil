package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Usuario;
import br.com.receitafacil.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repository;

    public List<Usuario> listarTodos(){
        return repository.findAll();
    }

    public Usuario salvar(Usuario usuario){
        return repository.save(usuario);
    }

    public Optional<Usuario> buscarPorId(Long id){
        return repository.findById(id);
    }

    public void excluir(Long id){
        repository.deleteById(id);
    }
}