# ⚙️ Receita Fácil - API Backend

Este é o backend do projeto **Receita Fácil**, desenvolvido com **Spring Boot** e **Java 17**. A API gerencia usuários, perfis de chef, receitas, categorias, favoritos e avaliações.

---

## 🛠️ Tecnologias
- Java 17
- Spring Boot 3.2
- Spring Data JPA
- MySQL 8.0
- Lombok
- SpringDoc OpenAPI (SwaggerUI)

---

## 🚀 Como Rodar

1.  **Java 17+** instalado.
2.  **Maven Wrapper** (já incluído no projeto).
3.  **MySQL 8.0** configurado.
4.  **JAVA_HOME** configurado (apontando para o JDK 17).

### Passos
1.  **Banco de Dados**: Crie um esquema chamado `receita_facil` no MySQL.
    *   Opcional: Execute o script em `database/receita_facil_database.sql` na raiz do projeto.
2.  **Configuração**: Ajuste suas credenciais do MySQL em `src/main/resources/application.properties`.
3.  **Execução**:
    - No Windows: `.\mvnw.cmd spring-boot:run`
    - No Linux/Mac: `./mvnw spring-boot:run`

---

## 📚 Documentação da API
Após rodar o servidor, acesse o Swagger para ver todos os endpoints:
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 🧪 Dados de Teste
Para popular o banco rapidamente, você pode enviar um POST para:
`POST /api/test/seed`

---

## 🏗️ Estrutura
- `com.receitafacil.model`: Entidades JPA.
- `com.receitafacil.service`: Regras de negócio.
- `com.receitafacil.controller`: Endpoints REST.
- `com.receitafacil.dto`: Objetos de transferência de dados.

---

## 📑 Exemplos de Requisições (cURL)

### 1. Popular o Banco (Teste)
```bash
curl -X POST http://localhost:8080/api/test/seed
```

### 2. Listar Receitas para Swipe
```bash
curl -X GET http://localhost:8080/api/receitas/swipe
```

### 3. Buscar Receita por Título
```bash
curl -X GET "http://localhost:8080/api/receitas/busca?q=Spaghetti"
```

### 4. Cadastrar Novo Usuário (Comum)
```bash
curl -X POST http://localhost:8080/api/usuarios \
-H "Content-Type: application/json" \
-d '{
  "nome": "Pedro Silva",
  "email": "pedro@email.com",
  "senha": "password123",
  "tipoUsuario": "COMUM"
}'
```
