-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 15/05/2026 às 00:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `receita_facil`
--
CREATE DATABASE IF NOT EXISTS `receita_facil` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `receita_facil`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `id` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `id_receita` bigint(20) NOT NULL,
  `nota` int(11) NOT NULL CHECK (`nota` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `avaliacao`
--

INSERT INTO `avaliacao` (`id`, `id_usuario`, `id_receita`, `nota`, `comentario`, `created_at`) VALUES
(1, 1, 1, 5, 'Receita excelente e bem explicada.', '2026-04-25 23:45:24'),
(2, 2, 1, 4, 'Muito boa para café da manhã.', '2026-04-25 23:45:24'),
(3, 3, 2, 5, 'Prática e deliciosa para o dia a dia.', '2026-04-25 23:45:24');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` bigint(20) NOT NULL,
  `nome_categoria` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nome_categoria`) VALUES
(2, 'Almoço'),
(1, 'Café da Manhã'),
(3, 'Jantar'),
(7, 'Lanches'),
(6, 'Massas'),
(4, 'Sobremesa'),
(5, 'Vegano');

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagem`
--

CREATE TABLE `imagem` (
  `id` bigint(20) NOT NULL,
  `url` varchar(100) NOT NULL,
  `id_receita` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imagem`
--

INSERT INTO `imagem` (`id`, `url`, `id_receita`) VALUES
(1, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800', 1),
(2, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800', 2),
(3, 'https://images.unsplash.com/photo-1490474418585-ba9b8b1b5b7b?w=800', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfil`
--

CREATE TABLE `perfil` (
  `id` bigint(20) NOT NULL,
  `especialidade` varchar(25) DEFAULT NULL,
  `descricao` text DEFAULT NULL,
  `usuario_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pertence`
--

CREATE TABLE `pertence` (
  `id_receita` bigint(20) NOT NULL,
  `id_categoria` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pertence`
--

INSERT INTO `pertence` (`id_receita`, `id_categoria`) VALUES
(1, 1),
(2, 2),
(3, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitas`
--

CREATE TABLE `receitas` (
  `id` bigint(20) NOT NULL,
  `titulo` varchar(25) NOT NULL,
  `passo_a_passo` text NOT NULL,
  `tempo_preparo` int(11) NOT NULL COMMENT 'Minutos',
  `ingredientes` text NOT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `receitas`
--

INSERT INTO `receitas` (`id`, `titulo`, `passo_a_passo`, `tempo_preparo`, `ingredientes`, `usuario_id`, `created_at`) VALUES
(1, 'Panqueca americana', 'Misture farinha, ovo e leite até formar massa homogênea. Aqueça a frigideira com manteiga. Despeje conchas de massa e doure dos dois lados.', 15, '1 xícara de farinha de trigo\n1 ovo\n3/4 xícara de leite\n1 pitada de sal\nManteiga para untar', 1, '2026-04-25 23:45:24'),
(2, 'Macarrão ao alho e óleo', 'Cozinhe o macarrão em água com sal até ficar al dente. Doure o alho no azeite sem queimar. Misture o macarrão escorrido com o alho e finalize com salsinha.', 25, '400g de espaguete\n4 dentes de alho\nAzeite\nSalsinha\nSal', 1, '2026-04-25 23:45:24'),
(3, 'Salada de frutas', 'Lave e corte as frutas em cubos. Misture em uma tigela e sirva gelado.', 10, 'Banana\nMaçã\nLaranja\nUvas (opcional)', 1, '2026-04-25 23:45:24'),
(4, 'Terrine de queijo', '1-Bata o queijo fresco, o provolone ralado, o creme de leite e o azeite no processador até ficar homogêneo.\r\n2-Misture a massa ao creme cheese, as folhas de sálvia e o sumo de limão, acrescente sal e pimenta-do-reino a gosto.\r\n3-oloque em uma forma com papel-manteiga, tampe-a com plástico filme e deixe na geladeira por no mínimo 2 horas.\r\n4-Acrescente frutas silvestres ou secas para decorar.\r\n5-Sirva com torradas.', 20, '500 g de queijo fresco\r\n100 g de provolone ralado\r\n600 g de cream cheese\r\n100 ml de creme de leite\r\n2 colheres de azeite\r\n6 folhas de sálvia picada\r\n1/2 sumo de limão', 1, '2026-05-14 00:17:50');

-- --------------------------------------------------------

--
-- Estrutura para tabela `receitasfavoritas`
--

CREATE TABLE `receitasfavoritas` (
  `id_usuario` bigint(20) NOT NULL,
  `id_receita` bigint(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------





-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `nome` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `tipo_usuario` enum('COMUM','CHEF','ADMIN') NOT NULL DEFAULT 'COMUM',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `tipo_usuario`, `created_at`) VALUES
(1, 'Admin Teste', 'admin@teste.com', '$2b$12$rkkb7Iv8S6WiL', 'ADMIN', '2026-04-25 23:45:24'),
(2, 'Chef Teste', 'chef@teste.com', '$2b$12$rkkb7Iv8S6WiL', 'CHEF', '2026-04-25 23:45:24'),
(3, 'Comum Teste', 'comum@teste.com', '$2b$12$rkkb7Iv8S6WiL', 'COMUM', '2026-04-25 23:45:24');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_receita` (`id_receita`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nome_categoria` (`nome_categoria`);

--
-- Índices de tabela `imagem`
--
ALTER TABLE `imagem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_receita` (`id_receita`);

--
-- Índices de tabela `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `pertence`
--
ALTER TABLE `pertence`
  ADD PRIMARY KEY (`id_receita`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Índices de tabela `receitas`
--
ALTER TABLE `receitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Índices de tabela `receitasfavoritas`
--
ALTER TABLE `receitasfavoritas`
  ADD PRIMARY KEY (`id_usuario`,`id_receita`),
  ADD KEY `id_receita` (`id_receita`);



--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `imagem`
--
ALTER TABLE `imagem`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `receitas`
--
ALTER TABLE `receitas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `imagem`
--
ALTER TABLE `imagem`
  ADD CONSTRAINT `imagem_ibfk_1` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `perfil_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `pertence`
--
ALTER TABLE `pertence`
  ADD CONSTRAINT `pertence_ibfk_1` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pertence_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE;

--
-- Restrições para tabelas `receitas`
--
ALTER TABLE `receitas`
  ADD CONSTRAINT `receitas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `receitasfavoritas`
--
ALTER TABLE `receitasfavoritas`
  ADD CONSTRAINT `receitasfavoritas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `receitasfavoritas_ibfk_2` FOREIGN KEY (`id_receita`) REFERENCES `receitas` (`id`) ON DELETE CASCADE;


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
