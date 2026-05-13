package com.receitafacil.service;

import com.receitafacil.dto.FavoritoIdDTO;
import com.receitafacil.dto.FavoritoItemDTO;
import com.receitafacil.model.Receitas;
import com.receitafacil.model.ReceitasFavoritas;
import com.receitafacil.model.Usuario;
import com.receitafacil.repository.ReceitasFavoritasRepository;
import com.receitafacil.repository.ReceitasRepository;
import com.receitafacil.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoritoService {

    private final ReceitasFavoritasRepository favoritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReceitasRepository receitasRepository;
    private final ReceitaService receitaService;

    public List<ReceitasFavoritas> listarFavoritos(Long usuarioId) {
        return favoritoRepository.findByUsuario_Id(usuarioId);
    }

    @Transactional(readOnly = true)
    public List<FavoritoItemDTO> listarFavoritosParaApi(Long usuarioId) {
        return listarFavoritos(usuarioId).stream().map(f -> {
            FavoritoIdDTO idDto = FavoritoIdDTO.builder()
                    .idUsuario(f.getId().getIdUsuario())
                    .idReceita(f.getId().getIdReceita())
                    .build();
            
            return FavoritoItemDTO.builder()
                    .id(idDto)
                    .receita(receitaService.toDTO(f.getReceita()))
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public void removerFavorito(Long usuarioId, Long receitaId) {
        ReceitasFavoritas.FavoritoId id = new ReceitasFavoritas.FavoritoId(usuarioId, receitaId);
        favoritoRepository.deleteById(id);
    }

    @Transactional
    public ReceitasFavoritas favoritarReceita(Long usuarioId, Long receitaId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
        Receitas receita = receitasRepository.findById(receitaId)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada."));

        ReceitasFavoritas.FavoritoId id = new ReceitasFavoritas.FavoritoId(usuarioId, receitaId);

        if (favoritoRepository.existsById(id)) {
            return favoritoRepository.findById(id).orElseThrow();
        }

        ReceitasFavoritas favorito = ReceitasFavoritas.builder()
                .id(id)
                .usuario(usuario)
                .receita(receita)
                .build();

        return favoritoRepository.save(favorito);
    }
}
