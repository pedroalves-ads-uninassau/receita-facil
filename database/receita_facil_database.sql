-- SCRIPTS SQL - PROJETO RECEITA FÁCIL
-- BANCO DE DADOS: MySQL 8.0

CREATE DATABASE IF NOT EXISTS receita_facil CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE receita_facil;

-- 1. Tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('COMUM', 'CHEF', 'ADMIN') NOT NULL DEFAULT 'COMUM',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabela Perfil (Informações complementares para Chefs)
CREATE TABLE IF NOT EXISTS Perfil (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    especialidade VARCHAR(100),
    descricao TEXT,
    usuario_id BIGINT UNIQUE NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabela Receitas
CREATE TABLE IF NOT EXISTS Receitas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    passo_a_passo TEXT NOT NULL,
    tempo_preparo INT NOT NULL COMMENT 'Minutos',
    ingredientes TEXT NOT NULL,
    usuario_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabela Categoria
CREATE TABLE IF NOT EXISTS Categoria (
    id_categoria BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- 5. Tabela de Relacionamento Receita-Categoria (Pertence)
CREATE TABLE IF NOT EXISTS Pertence (
    id_receita BIGINT NOT NULL,
    id_categoria BIGINT NOT NULL,
    PRIMARY KEY (id_receita, id_categoria),
    FOREIGN KEY (id_receita) REFERENCES Receitas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Tabela Imagem
CREATE TABLE IF NOT EXISTS Imagem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    id_receita BIGINT NOT NULL,
    FOREIGN KEY (id_receita) REFERENCES Receitas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Tabela de Receitas Favoritas (Swipe Right)
CREATE TABLE IF NOT EXISTS ReceitasFavoritas (
    id_usuario BIGINT NOT NULL,
    id_receita BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_receita),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_receita) REFERENCES Receitas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Tabela Avaliacao
CREATE TABLE IF NOT EXISTS Avaliacao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    id_receita BIGINT NOT NULL,
    nota INT NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_receita) REFERENCES Receitas(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- INSERT DE DADOS INICIAIS (Opcional para teste)
INSERT INTO Categoria (nome_categoria) VALUES ('Café da Manhã'), ('Almoço'), ('Jantar'), ('Sobremesa'), ('Vegano'), ('Massas'), ('Lanches');

-- Usuários de teste com os 3 perfis (senha de todos: 123456)
INSERT INTO Usuario (id, nome, email, senha, tipo_usuario) VALUES
(1, 'Admin Teste', 'admin@teste.com', '$2b$12$rkkb7Iv8S6WiLzg7i.lCHeI2CR.l9Vp4mx1jCXuE09UYiIMa00l6O', 'ADMIN'),
(2, 'Chef Teste', 'chef@teste.com', '$2b$12$rkkb7Iv8S6WiLzg7i.lCHeI2CR.l9Vp4mx1jCXuE09UYiIMa00l6O', 'CHEF'),
(3, 'Comum Teste', 'comum@teste.com', '$2b$12$rkkb7Iv8S6WiLzg7i.lCHeI2CR.l9Vp4mx1jCXuE09UYiIMa00l6O', 'COMUM');

-- Receitas de exemplo (precisa de usuário id 1)
INSERT INTO Receitas (id, titulo, passo_a_passo, tempo_preparo, ingredientes, usuario_id) VALUES
(1, 'Panqueca americana', 'Misture farinha, ovo e leite até formar massa homogênea. Aqueça a frigideira com manteiga. Despeje conchas de massa e doure dos dois lados.', 15, '1 xícara de farinha de trigo\n1 ovo\n3/4 xícara de leite\n1 pitada de sal\nManteiga para untar', 1),
(2, 'Macarrão ao alho e óleo', 'Cozinhe o macarrão em água com sal até ficar al dente. Doure o alho no azeite sem queimar. Misture o macarrão escorrido com o alho e finalize com salsinha.', 25, '400g de espaguete\n4 dentes de alho\nAzeite\nSalsinha\nSal', 1),
(3, 'Salada de frutas', 'Lave e corte as frutas em cubos. Misture em uma tigela e sirva gelado.', 10, 'Banana\nMaçã\nLaranja\nUvas (opcional)', 1);

INSERT INTO Pertence (id_receita, id_categoria) VALUES (1, 1), (2, 2), (3, 4);

INSERT INTO Imagem (url, id_receita) VALUES
('https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800', 1),
('https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', 2),
('https://images.unsplash.com/photo-1490474418585-ba9b8b1b5b7b?w=800', 3);

INSERT INTO Avaliacao (id_usuario, id_receita, nota, comentario) VALUES
(1, 1, 5, 'Receita excelente e bem explicada.'),
(2, 1, 4, 'Muito boa para café da manhã.'),
(3, 2, 5, 'Prática e deliciosa para o dia a dia.');
