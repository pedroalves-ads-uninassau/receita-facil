package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Perfil")
@Data
public class Perfil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String especialidade;

    @Column(length = 2000)
    private String descricao;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
