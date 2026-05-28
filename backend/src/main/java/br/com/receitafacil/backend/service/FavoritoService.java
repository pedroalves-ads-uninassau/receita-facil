package br.com.receitafacil.backend.service;

import br.com.receitafacil.backend.entity.Receita;
import br.com.receitafacil.backend.entity.Usuario;
import br.com.receitafacil.backend.repository.ReceitaRepository;
import br.com.receitafacil.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoritoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Transactional
    public List<Receita> listarFavoritos(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario == null) return new ArrayList<>();
        return usuario.getReceitasFavoritas();
    }

    @Transactional
    public void favoritar(Long usuarioId, Long receitaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        Receita receita = receitaRepository.findById(receitaId).orElse(null);

        if (usuario != null && receita != null) {
            if (usuario.getReceitasFavoritas() == null) {
                usuario.setReceitasFavoritas(new ArrayList<>());
            }
            usuario.getReceitasFavoritas().add(receita);
            usuarioRepository.save(usuario);
        }
    }

    @Transactional
    public void desfavoritar(Long usuarioId, Long receitaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        Receita receita = receitaRepository.findById(receitaId).orElse(null);

        if (usuario != null && receita != null) {
            if (usuario.getReceitasFavoritas() != null) {
                usuario.getReceitasFavoritas().removeIf(r -> r.getId().equals(receitaId));
                usuarioRepository.save(usuario);
            }
        }
    }
}
