package br.com.receitafacil.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.receitafacil.backend.entity.Receita;
import br.com.receitafacil.backend.exception.ReceitaNotFoundException;
import br.com.receitafacil.backend.repository.ReceitaRepository;

@SuppressWarnings("null")
@Service
public class ReceitaService {

    @Autowired
    private ReceitaRepository repository;

    public List<Receita> listarTodas() {
        return repository.findAll();
    }

    public List<Receita> buscarPorTitulo(String titulo) {
        return repository.findByTituloContainingIgnoreCase(titulo);
    }

    public List<Receita> buscarPorUsuario(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    public List<Receita> buscarPorCategoria(Long categoriaId) {
        return repository.findByCategorias_Id(categoriaId);
    }

    public Receita salvar(Receita receita) {
        return repository.save(receita);
    }

    public Receita buscarPorId(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ReceitaNotFoundException("Receita não encontrada"));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
