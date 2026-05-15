package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    
    @Column(length = 2000)
    private String descricao;
    private String foto_perfil;
    
    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
