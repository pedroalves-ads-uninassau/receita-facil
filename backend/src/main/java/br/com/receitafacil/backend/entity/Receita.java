package br.com.receitafacil.backend.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Receitas")
@Data
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(name = "passo_a_passo", columnDefinition = "TEXT")
    private String passoAPasso;

    @Column(name = "tempo_preparo")
    private Integer tempoPreparo;

    @Column(columnDefinition = "TEXT")
    private String ingredientes;

    @ManyToOne
    @JoinColumn(name = "usuario_id", insertable = false, updatable = false)
    @JsonIgnore
    private Usuario autor;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @OneToMany(mappedBy = "receita", cascade = CascadeType.ALL)
    private List<Imagem> imagens;

    @ManyToMany
    @JoinTable(
        name = "Pertence",
        joinColumns = @JoinColumn(name = "receita_id"),
        inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Categoria> categorias;

    @ManyToMany(mappedBy = "receitasFavoritas")
    @JsonIgnore
    private List<Usuario> usuarioQueFavoritaram;
}
