package com.receitafacil.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Receitas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Receitas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(name = "passo_a_passo", nullable = false, columnDefinition = "TEXT")
    private String passoAPasso;

    @Column(name = "tempo_preparo", nullable = false)
    private Integer tempoPreparo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String ingredientes;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Builder.Default
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @ManyToMany
    @JoinTable(
        name = "Pertence",
        joinColumns = @JoinColumn(name = "id_receita"),
        inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private Set<Categoria> categorias = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL)
    private Set<Imagem> imagens = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL)
    private Set<Avaliacao> avaliacoes = new HashSet<>();
}
