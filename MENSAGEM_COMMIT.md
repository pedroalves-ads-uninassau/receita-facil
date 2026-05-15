# 🚀 Atualização Geral: Refatoração do Frontend e Correção do Banco de Dados

Esta atualização traz grandes melhorias na arquitetura visual do projeto (Frontend), mantendo a simplicidade do código exigida para fins didáticos, além de corrigir problemas críticos na importação do Banco de Dados.

## 📱 Frontend (React Native / Expo)
- **Refatoração Visual (Design System):** Todas as telas foram redesenhadas para seguir o padrão visual oficial da documentação do projeto (fundo creme `#FFF8E7`, textos em azul marinho `#23374C` e destaques/botões no laranja `#FF7F24`). Foram adicionadas sombras (elevation), bordas arredondadas e ícones (`Ionicons`) para um aspecto muito mais premium e profissional.

- **Telas Estruturais (Em Construção):** Telas secundárias como "Favoritos", "Perfil", "Busca" e "Adicionar Receita" foram criadas com uma interface padronizada de "Em Construção". Isso garante a estabilidade do app, evitando que hajam botões "mortos" ou erros durante a apresentação.

## ⚙️ Backend (Java Spring Boot)
- **Correção de Mapeamento JPA (Inglês vs Português):** A Entidade `Receita.java` possuía variáveis em inglês (`title`, `time`), o que quebrava o sistema pois o banco de dados estava em português. Os atributos e mapeamentos do Hibernate (`@Column(name="...")`) foram ajustados para refletir exatamente as colunas reais da tabela `receitas` do MySQL.


## 💾 Banco de Dados (MySQL)
- **Correção de Importação (Erro #1046):** O script `receita_facil.sql` exportado inicialmente causava erro no phpMyAdmin. Foram injetadas as instruções `CREATE DATABASE IF NOT EXISTS receita_facil;` e `USE receita_facil;` diretamente no arquivo SQL. Agora, basta clicar em "Importar" no XAMPP e o sistema monta a estrutura inteira sozinho (Plug and Play).

## 📄 Documentação (README)
- **Documentação de Endpoints (Postman):** Adicionado ao README um guia rápido e padronizado com os endpoints em formato JSON para facilitar os testes de integração do CRUD de Usuários e Receitas pela equipe e pelo professor.
