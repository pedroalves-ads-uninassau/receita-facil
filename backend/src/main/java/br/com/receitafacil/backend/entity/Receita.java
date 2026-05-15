package br.com.receitafacil.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String author;
    private String time;
    private String category;
    private String calories;
    private Double rating;
    private String bg;
    
    @Column(length = 1000)
    private String image;

    @ElementCollection
    private List<String> ingredients;

    @ElementCollection
    private List<String> steps;
}
