package br.com.receitafacil.backend.dto;

public class FavoritoDTO {

    private Long usuarioId;
    private Long receitaId;

    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public Long getReceitaId() { return receitaId; }
    public void setReceitaId(Long receitaId) { this.receitaId = receitaId; }
}
