package com.receitafacil.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AvaliacaoRequestDTO {
    @NotNull
    private Long usuarioId;

    @NotNull
    private Long receitaId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer nota;

    private String comentario;
}
