package com.receitafacil.service;

import com.receitafacil.dto.AvaliacaoRequestDTO;
import com.receitafacil.dto.AvaliacaoResponseDTO;
import com.receitafacil.model.Avaliacao;
import com.receitafacil.model.Receitas;
import com.receitafacil.model.Usuario;
import com.receitafacil.repository.AvaliacaoRepository;
import com.receitafacil.repository.ReceitasRepository;
import com.receitafacil.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AvaliacaoService {

    private final AvaliacaoRepository avaliacaoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReceitasRepository receitasRepository;

    @Transactional(readOnly = true)
    public List<AvaliacaoResponseDTO> listarPorReceita(Long receitaId) {
        return avaliacaoRepository.findByReceita_IdOrderByCreatedAtDesc(receitaId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public AvaliacaoResponseDTO avaliar(AvaliacaoRequestDTO body) {
        Usuario usuario = usuarioRepository.findById(body.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
        Receitas receita = receitasRepository.findById(body.getReceitaId())
                .orElseThrow(() -> new RuntimeException("Receita não encontrada."));

        Avaliacao avaliacao = avaliacaoRepository
                .findByUsuario_IdAndReceita_Id(body.getUsuarioId(), body.getReceitaId())
                .orElse(Avaliacao.builder()
                        .usuario(usuario)
                        .receita(receita)
                        .build());

        avaliacao.setNota(body.getNota());
        avaliacao.setComentario(body.getComentario());

        Avaliacao salva = avaliacaoRepository.save(avaliacao);
        return toDTO(salva);
    }

    private AvaliacaoResponseDTO toDTO(Avaliacao item) {
        return AvaliacaoResponseDTO.builder()
                .id(item.getId())
                .usuarioId(item.getUsuario().getId())
                .usuarioNome(item.getUsuario().getNome())
                .receitaId(item.getReceita().getId())
                .nota(item.getNota())
                .comentario(item.getComentario())
                .createdAt(item.getCreatedAt())
                .build();
    }
}
