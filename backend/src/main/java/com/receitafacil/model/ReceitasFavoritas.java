package com.receitafacil.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "ReceitasFavoritas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReceitasFavoritas {

    @EmbeddedId
    private FavoritoId id;

    @ManyToOne
    @MapsId("idUsuario")
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @MapsId("idReceita")
    @JoinColumn(name = "id_receita")
    private Receitas receita;

    @Builder.Default
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class FavoritoId implements Serializable {
        private Long idUsuario;
        private Long idReceita;
    }
}
