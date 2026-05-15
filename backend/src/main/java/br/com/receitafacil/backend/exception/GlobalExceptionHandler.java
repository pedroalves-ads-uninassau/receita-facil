package br.com.receitafacil.backend.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ReceitaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)

    public Map<String, String>
    handleReceitaNotFound(ReceitaNotFoundException ex){
        Map<String, String> erro = new HashMap<>();
        erro.put("erro", ex.getMessage());
        return erro;
    }
    

}
