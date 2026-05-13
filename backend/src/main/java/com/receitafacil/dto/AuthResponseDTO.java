package com.receitafacil.dto;

import com.receitafacil.model.TipoUsuario;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
}
