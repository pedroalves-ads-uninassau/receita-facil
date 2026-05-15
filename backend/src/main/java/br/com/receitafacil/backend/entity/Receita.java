package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "receitas")
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
    
    @Column(name = "usuario_id")
    private Long usuarioId;

    // Campos opcionais para manter compatibilidade com o front
    private String categoria;
    
    @Column(length = 1000)
    private String image;
}
