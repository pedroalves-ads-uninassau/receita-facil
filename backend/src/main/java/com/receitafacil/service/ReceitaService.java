package com.receitafacil.service;

import com.receitafacil.dto.ReceitaDTO;
import com.receitafacil.model.Categoria;
import com.receitafacil.model.Imagem;
import com.receitafacil.model.Receitas;
import com.receitafacil.model.TipoUsuario;
import com.receitafacil.model.Usuario;
import com.receitafacil.repository.ReceitasRepository;
import com.receitafacil.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReceitaService {

    private final ReceitasRepository receitasRepository;
    private final UsuarioRepository usuarioRepository;

    public List<Receitas> listarTodas() {
        return receitasRepository.findAll();
    }

    public List<Receitas> buscarParaSwipe() {
        return receitasRepository.findAllRandom();
    }

    public List<Receitas> buscarPorTitulo(String query) {
        return receitasRepository.findByTituloContainingIgnoreCase(query);
    }

    public List<Receitas> buscarPorCategoria(Long categoriaId) {
        return receitasRepository.findByCategorias_IdCategoria(categoriaId);
    }

    @Transactional
    public Receitas criarReceita(Receitas receita) {
        log.info("Tentando criar receita: {}", receita.getTitulo());

        Usuario autor = usuarioRepository.findById(receita.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        // Regra de Negócio: Apenas CHEF ou ADMIN publica receitas.
        if (autor.getTipoUsuario() == TipoUsuario.COMUM) {
            log.warn("Usuário comum (ID: {}) tentou publicar receita sem autorização.", autor.getId());
            throw new RuntimeException("Apenas Usuários Chef podem publicar receitas.");
        }

        receita.setUsuario(autor);
        Receitas salva = receitasRepository.save(receita);
        log.info("Receita '{}' salva com sucesso (ID: {})", salva.getTitulo(), salva.getId());
        return salva;
    }

    public Receitas buscarPorId(Long id) {
        return receitasRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada com ID: " + id));
    }

    public ReceitaDTO toDTO(Receitas rec) {
        return ReceitaDTO.builder()
                .id(rec.getId())
                .titulo(rec.getTitulo())
                .passoAPasso(rec.getPassoAPasso())
                .tempoPreparo(rec.getTempoPreparo())
                .ingredientes(rec.getIngredientes())
                .autorNome(rec.getUsuario() != null ? rec.getUsuario().getNome() : null)
                .categorias(rec.getCategorias().stream().map(Categoria::getNomeCategoria).collect(Collectors.toList()))
                .imagens(rec.getImagens().stream().map(Imagem::getUrl).collect(Collectors.toList()))
                .build();
    }
}
