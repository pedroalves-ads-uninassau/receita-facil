package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Usuario{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private String senha;
}