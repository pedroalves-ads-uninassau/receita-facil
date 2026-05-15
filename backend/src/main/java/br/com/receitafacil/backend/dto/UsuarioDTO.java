package br.com.receitafacil.backend.dto;

import br.com.receitafacil.backend.entity.Usuario;

public class UsuarioDTO {
    
    private Long id;
    private String nome;
    private String email;

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
    }

    public Long getId() { return id; } 
    public String getNome() { return nome; } 
    public String getEmail() { return email; } 
}