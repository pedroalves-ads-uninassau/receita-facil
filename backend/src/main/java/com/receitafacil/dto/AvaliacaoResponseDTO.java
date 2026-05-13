package com.receitafacil.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AvaliacaoResponseDTO {
    private Long id;
    private Long usuarioId;
    private String usuarioNome;
    private Long receitaId;
    private Integer nota;
    private String comentario;
    private LocalDateTime createdAt;
}
