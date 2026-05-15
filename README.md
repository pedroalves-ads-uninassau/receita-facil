<h1 align="center">
  <img alt="Receita Fácil Logo" src="https://img.icons8.com/color/96/000000/cookbook.png"/>
  <br>
  Receita Fácil
</h1>

<h4 align="center">
  Sistema de Descoberta e Compartilhamento de Receitas Culinárias
</h4>

<p align="center">
  <img alt="Project version" src="https://img.shields.io/badge/version-1.0.0-blue">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB">
  <img alt="Spring Boot" src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring&logoColor=white">
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white">
</p>

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-arquitetura-e-banco-de-dados">Arquitetura</a> •
  <a href="#-como-executar-e-testar-no-iphone-expo-go">Como Executar</a> •
  <a href="#-autores">Autores</a>
</p>

---

## 🍽️ Sobre o Projeto

No cenário atual, a busca por receitas culinárias na internet é fragmentada e pouco intuitiva, muitas vezes frustrando o usuário com excesso de texto e pouca personalização. 

O **Receita Fácil** surge como uma solução inovadora que centraliza a descoberta, criação e compartilhamento de receitas. Inspirado na facilidade de uso de apps de relacionamento (sistema de *swipe*) e de delivery (busca *search-as-you-type*), o projeto tem como objetivo proporcionar uma experiência moderna, interativa e sem fricções.

Este projeto é resultado do **Projeto Integrado** do 3º Semestre de Análise e Desenvolvimento de Sistemas do **Centro Universitário Maurício de Nassau (UNINASSAU) - Caruaru**.

## 🚀 Funcionalidades

- **Descoberta Intuitiva (Swipe):** Sistema de deslizar cards para encontrar a receita ideal para o seu dia.
- **Busca em Tempo Real:** Filtros inteligentes por categorias e ingredientes enquanto você digita.
- **Gestão de Perfil:** Sistema com perfis variados (`Comum`, `Chef` e `Admin`).
- **Criação de Conteúdo:** Chefs podem publicar, editar e gerenciar suas próprias receitas.
- **Favoritos e Biblioteca:** Salve as receitas que mais gostar para não perder de vista.
- **Avaliações e Comunidade:** Dê feedback, notas e comentários nas receitas testadas.

## 💻 Tecnologias

A stack de tecnologia do projeto foi escolhida para entregar máxima performance e robustez:

* **Frontend:** [React Native](https://reactnative.dev/) (Framework Cross-platform) e Expo
* **Backend:** [Spring Boot / Java](https://spring.io/projects/spring-boot) (API REST)
* **Banco de Dados:** [MySQL](https://www.mysql.com/) (Relacional)

## 🗄️ Arquitetura e Banco de Dados

A modelagem do banco de dados relacional foi normalizada até a **3ª Forma Normal (3FN)**. O banco de dados suporta múltiplas funcionalidades principais através de relacionamentos complexos:

- **Usuários e Perfis (1:1):** Um usuário comum pode se transformar em um Chef, ganhando um `Perfil` adicional com especialidades.
- **Receitas (1:N):** Um Chef publica múltiplas `Receitas`.
- **Categorias e Imagens (N:N e 1:N):** As receitas são classificadas em várias categorias simultaneamente e suportam uma galeria de fotos.
- **Avaliações e Favoritos (N:N):** A comunidade interage ativamente, linkando múltiplos usuários a múltiplas receitas.

Os scripts completos de inicialização, criação das tabelas, e popularização de dados com a linguagem DDL e DML do MySQL encontram-se disponíveis no sistema e na pasta correspondente de banco de dados (`/database` se aplicável).

---

## 📱 Como Executar e Testar

### Passo 1: O Banco de Dados (O Cofre)
1. Abra o seu **XAMPP**, ligue o Apache e depois o **MySQL**. Em seguida, aperte em "Admin" na linha do MySQL.

2. Abra o navegador e acesse `http://localhost/phpmyadmin`.

3. Vá na aba **"Importar"**, selecione o arquivo `database/receita_facil.sql` e aperte em **Executar** no final da página.
 
   *(Se você já fez isso uma vez e deu tela verde, o banco está pronto).*

### Passo 2: Dentro da pasta Receita Fácil no VS Code, Ligar o Java (Backend)
1. Abra o seu terminal e entre na pasta do backend:
   
   cd backend
 
2. Digite o comando para ligar o servidor Java:
   
   ./mvnw spring-boot:run

3. Espere uns 15 segundos. Se nas últimas linhas do texto aparecer `Tomcat started on port 8080`, **Sucesso!** O Java ligou.


### Passo 3: Ligar o Celular (Frontend)
1. Abra **outra janela** de terminal (já que a do Java tem que ficar rodando).

2. Entre na pasta do frontend:

   cd frontend

3. Digite o comando para ligar o aplicativo no modo túnel (que dribla bloqueios de Wi-Fi e Firewall) e limpa o cache:
   
   npx expo start --tunnel --clear

4. O terminal vai perguntar se você quer logar. Pressione a **Seta para Baixo** no teclado para selecionar `Proceed Anonymously` e aperte **Enter**.

### ⚠️ Dica Crucial: Conectando o Celular ao Backend
Se você for testar no **celular físico (Expo Go)**, o `localhost` não vai funcionar. Você precisa trocar o endereço no código para o **IP da sua máquina**.
4.1.  **Descubra seu IP**: No terminal do seu PC, digite `ipconfig`.
4.2.  Procure por **"Endereço IPv4"** (exemplo: `192.168.1.15`).
4.3.  **Troque no Código**: Abra o arquivo `frontend/src/services/api.js` e altere a linha:
   
    const BASE_URL = 'http://192.168.1.15:8080'; // Coloque o SEU IP aqui
   
4.4.  **Importante**: O celular e o computador devem estar na **mesma rede Wi-Fi**.

5. Um QR Code gigante vai aparecer na tela.

### Passo 4: Escolha como quer Testar

**Opção A: No Computador (Mais Rápido)**
* No mesmo terminal onde está o QR Code, aperte a letra **`w`** no seu teclado.


**Opção B: No Celular (O Teste Real)**
* Pegue seu iPhone ou Android e abra o aplicativo **Expo Go**.
* Use a câmera (ou o botão Scan do Android) para ler o QR Code na tela do PC.

---

## 🧪 Como Testar a API (Endpoints de Usuários)

Para testar o backend localmente, você pode utilizar o **Postman** ou o **Insomnia**. Certifique-se de que o servidor Spring Boot está rodando (`http://localhost:8080`).

### 1. Listar Usuários (GET)
Retorna a lista de todos os usuários cadastrados.
- **Método:** `GET`
- **URL:** `http://localhost:8080/usuarios`
- **Body:** *(Não necessário)*

### 2. Criar Usuário (POST)
Cria um novo usuário no banco de dados.
- **Método:** `POST`
- **URL:** `http://localhost:8080/usuarios`
- **Body (JSON):**

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}


### 3. Atualizar Usuário (PUT)
Atualiza os dados de um usuário específico pelo seu ID.
- **Método:** `PUT`
- **URL:** `http://localhost:8080/usuarios/{id}` *(Exemplo: /usuarios/2)*
- **Body (JSON):**

{
  "nome": "João Silva Alterado",
  "email": "joao@email.com",
  "senha": "nova_senha_456"
}


### 4. Deletar Usuário (DELETE)
Exclui permanentemente um usuário do sistema.
- **Método:** `DELETE`
- **URL:** `http://localhost:8080/usuarios/{id}` *(Exemplo: /usuarios/2)*
- **Body:** *(Não necessário)*

---

## 👨‍💻 Autores

- **Allan Victor Morais de Lima** - *01813117*
- **Gabriel Henrique da Silva** - *01777141*
- **Pedro Francisco Alves Neto** - *01864946*
- **Vinicius Santos Cansanção** - *01813852*

<br>
<p align="center">
Feito com 👨‍🍳 para o UNINASSAU - 2026.
</p>