package com.receitafacil.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ReceitaDTO {
    private Long id;
    private String titulo;
    private String passoAPasso;
    private Integer tempoPreparo;
    private String ingredientes;
    private String autorNome;
    private List<String> categorias;
    private List<String> imagens;
}
