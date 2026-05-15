package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Usuario;
import br.com.receitafacil.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@SuppressWarnings("null")
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository){
        this.repository = repository;
    }

    public List<Usuario> listarTodos(){
        return repository.findAll();
    }

    public Usuario login(Usuario usuario) {
        return repository.findByEmailAndSenha(usuario.getEmail(), usuario.getSenha());
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