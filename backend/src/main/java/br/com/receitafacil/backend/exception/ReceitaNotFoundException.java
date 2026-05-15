package br.com.receitafacil.backend.exception;

public class ReceitaNotFoundException extends RuntimeException{

    public ReceitaNotFoundException(String mensagem) {
        super(mensagem);
    }

}
