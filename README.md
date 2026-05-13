# 🍳 Receita Fácil - Aplicativo de Descoberta de Receitas

<div align="center">

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React Native](https://img.shields.io/badge/React%20Native-0.74-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)

**Aplicativo mobile para descoberta, criação e compartilhamento de receitas culinárias**

[Documentação](#-documentação) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Equipe](#-equipe)

</div>

---

## 📱 Sobre o Projeto

O **Receita Fácil** é um ecossistema mobile que revoluciona a forma como as pessoas descobrem receitas. Inspirado pelas melhores práticas de UX de aplicativos como **Tinder** e **iFood**, o app une agilidade e inteligência para proporcionar uma experiência fluida e intuitiva.

### 🌟 Principais Funcionalidades

- **🎯 Swipe Interativo**: Descubra receitas deslizando (estilo Tinder)
  - Swipe Right (➡️) = Favoritar
  - Swipe Left (⬅️) = Próxima receita
  
- **🔍 Busca Inteligente**: Motor de busca em tempo real (search-as-you-type)
  - Busca por título, ingredientes ou categorias
  - Resultados instantâneos conforme digitação
  
- **👨‍🍳 Perfis de Chef**: Criadores podem publicar suas próprias receitas
  - Painel de gerenciamento de conteúdo
  - Sistema de seguidores
  - Estatísticas de engajamento

- **⭐ Sistema de Avaliações**: Feedback da comunidade
  - Notas de 0 a 5 estrelas
  - Comentários e opiniões

- **❤️ Favoritos**: Salve suas receitas preferidas
  - Acesso rápido às receitas favoritadas
  - Organização personalizada

---

## 👥 Perfis de Usuário

| Tipo | Permissões | Recursos |
|------|-----------|----------|
| **👑 Admin Master** | Gestão total do sistema | Moderação, categorias, dashboards |
| **👨‍🍳 Chef** | Criação de conteúdo | Publicar/editar receitas + recursos de usuário comum |
| **👤 Comum** | Consumo de conteúdo | Swipe, busca, favoritos, avaliações |

---

## 🎨 Identidade Visual

```css
--primary-orange: #FF7F24;    /* Apetite e energia */
--background-cream: #FFF8E7;  /* Leve e clean */
--accent-yellow: #FDBE34;     /* Calor e otimismo */
--success-green: #3DAE60;     /* Saúde e frescor */
--text-navy: #23374C;         /* Contraste e confiança */
```

---

## 🛠️ Tecnologias

### Frontend (Mobile)
- **Framework**: React Native com Expo
- **Navegação**: React Navigation (Tabs + Stack)
- **Estado**: React Hooks + Context API
- **Ícones**: Ionicons

### Backend (API REST)
- **Linguagem**: Java 17+
- **Framework**: Spring Boot 3.2
- **Segurança**: Spring Security + JWT (planejado)
- **ORM**: Spring Data JPA + Hibernate

### Banco de Dados
- **SGBD**: MySQL 8.0+
- **Engine**: InnoDB
- **Charset**: utf8mb4 (suporte a emojis)

---

## 📂 Estrutura do Projeto

```
receita-facil/
├── frontend/               # Aplicativo React Native
│   ├── src/
│   │   ├── screens/       # Telas do app
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── services/      # Comunicação com API
│   │   └── navigation/    # Configuração de rotas
│   └── package.json
│
├── backend/               # API Spring Boot
│   ├── src/main/java/
│   │   └── com/receitafacil/
│   │       ├── controller/
│   │       ├── service/
│   │       ├── repository/
│   │       └── model/
│   └── pom.xml
│
├── database/              # Scripts SQL
│   └── receita_facil_database.sql
│
└── docs/                  # Documentação
    ├── modelagem/         # Diagramas ER
    └── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Java JDK 17+
- MySQL 8.0+
- Expo CLI (`npm install -g expo-cli`)

### 1️⃣ Configurar Banco de Dados

```bash
# Acessar MySQL
mysql -u root -p

# Executar script de criação
source database/receita_facil_database.sql
```

### 2️⃣ Executar Backend

```bash
cd backend

# Configurar application.properties com suas credenciais MySQL
# src/main/resources/application.properties

# Executar Spring Boot
./mvnw spring-boot:run
```

### 3️⃣ Executar Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar Expo
expo start
```

---

## 📚 Documentação

### Modelagem de Dados
- [Modelo Conceitual](docs/modelagem/conceitual.md) - Visão abstrata das entidades
- [Modelo Lógico](docs/modelagem/logico.md) - Normalização e relacionamentos
- [Modelo Físico](docs/modelagem/fisico.md) - Implementação MySQL

### Diagramas
- [Diagrama ER Conceitual](docs/modelagem/modelo_conceitual_-_receita_fácil.png)
- [Diagrama ER Lógico](docs/modelagem/modelo_lógico_-_receita_fácil.jpeg)

### Documentação Completa
- [Documentação Técnica Completa (Word)](docs/Documentacao_Completa_Receita_Facil.docx)

---

## 🎯 Roadmap

### ✅ Fase 1 - MVP (Atual)
- [x] Modelagem completa do banco de dados
- [x] Scripts SQL de criação
- [x] Estrutura básica do backend (Spring Boot)
- [x] Estrutura básica do frontend (React Native)

### 🚧 Fase 2 - Funcionalidades Core
- [ ] Sistema de autenticação JWT
- [ ] API REST completa (CRUD de receitas)
- [ ] Interface de Swipe funcional
- [ ] Busca em tempo real
- [ ] Sistema de favoritos

### 📅 Fase 3 - Recursos Avançados
- [ ] Upload de imagens (AWS S3 / Firebase)
- [ ] Sistema de avaliações
- [ ] Perfil de chef com estatísticas
- [ ] Filtros avançados (tempo, dificuldade)
- [ ] Notificações push

---

## 👨‍💻 Equipe

**Projeto Acadêmico - UNINASSAU**  
**Curso**: Análise e Desenvolvimento de Sistemas - 3º Semestre  
**Turma**: ADS B

| Matrícula | Nome | GitHub |
|-----------|------|--------|
| 01813117 | Allan Victor Morais de Lima |
| 01777141 | Gabriel Henrique da Silva |
| 01864946 | Pedro Francisco Alves Neto |
| 01813852 | Vinicius Santos Cansanção |

---

## 📝 Disciplinas Integradas

Este projeto integra conhecimentos de três disciplinas:

- **📱 Desenvolvimento Mobile** - React Native
- **⚙️ Backend Frameworks** - Spring Boot (Java)
- **🗄️ Banco de Dados** - MySQL

---

## 📄 Licença

Este é um projeto acadêmico desenvolvido para fins educacionais.

---

<div align="center">

⭐ Se este projeto foi útil, deixe uma estrela!

</div>
