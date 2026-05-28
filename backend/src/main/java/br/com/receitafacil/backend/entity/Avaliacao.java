package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Avaliacao")
@Data
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id")
    private Long usuarioId;

    @Column(name = "receita_id")
    private Long receitaId;

    private Integer nota;

    private String comentario;
}
