# 🚀 Guia Definitivo: Como Rodar o Projeto Receita Fácil

Este guia foi feito para que qualquer pessoa do grupo consiga rodar o projeto do zero, sem dor de cabeça, tanto no computador quanto no celular (iPhone ou Android).

## 🧠 Entendendo a Estrutura (O que fizemos até agora)
Nosso projeto é dividido em três partes que precisam conversar entre si:
1. **O Banco de Dados (MySQL):** É o cofre onde as receitas e usuários ficam guardados.
2. **O Backend (Java / Spring Boot):** É o "Cérebro" e o "Garçom" do sistema. Ele busca a comida no cofre (Banco) e entrega para o cliente (Celular).
3. **O Frontend (React Native / Expo):** É a tela bonita que o usuário toca. O nosso código foi configurado para a **versão 54 do Expo**, para garantir compatibilidade máxima com os celulares do grupo (especialmente iPhones mais antigos ou desatualizados).

---

## 🛠️ Passo a Passo para Ligar a Nave

### Passo 1: O Banco de Dados (O Cofre)
1. Abra o seu **XAMPP** e veja se o **MySQL** está com a luzinha verde (rodando na porta 3306).
2. Abra o navegador e acesse `http://localhost/phpmyadmin`.
3. Vá na aba **"SQL"**, digite o comando abaixo e aperte em **Executar**:
   ```sql
   CREATE DATABASE receita_facil;
   ```
   *(Se você já fez isso uma vez, não precisa fazer de novo).*

### Passo 2: Ligar o Java (Backend)
1. Abra o seu terminal (PowerShell ou CMD) e entre na pasta do backend:
   ```bash
   cd backend
   ```
2. Digite o comando mágico para ligar o servidor Java:
   ```bash
   ./mvnw spring-boot:run
   ```
3. Espere uns 15 segundos. Se nas últimas linhas do texto aparecer `Tomcat started on port 8080`, **Sucesso!** O Java ligou.
   *Atenção: Deixe essa tela preta aberta! Se você fechar, o cérebro do aplicativo desliga.*

### Passo 3: Ligar o Celular (Frontend)
1. Abra **outra janela** de terminal (já que a do Java tem que ficar rodando).
2. Entre na pasta do frontend:
   ```bash
   cd frontend
   ```
3. Digite o comando mágico para ligar o aplicativo no modo túnel (que dribla bloqueios de Wi-Fi e Firewall) e limpa o cache:
   ```bash
   npx expo start --tunnel --clear
   ```
4. O terminal vai perguntar se você quer logar. Pressione a **Seta para Baixo** no teclado para selecionar `Proceed Anonymously` e aperte **Enter**.
5. Um QR Code gigante vai aparecer na tela.

### Passo 4: Escolha como quer Testar

**Opção A: No Computador (Mais Rápido)**
* No mesmo terminal onde está o QR Code, aperte a letra **`w`** no seu teclado.
* O aplicativo vai abrir perfeitamente como um site no seu navegador. Ótimo para apresentar rápido!

**Opção B: No Celular (O Teste Real)**
* Pegue seu iPhone ou Android e abra o aplicativo **Expo Go**.
* Use a câmera (ou o botão Scan do Android) para ler o QR Code na tela do PC.
* O aplicativo vai carregar e abrir na sua mão, puxando as receitas diretamente do seu Java! 

> **Dica de Ouro:** Lembra que o banco de dados está vazio! O app vai abrir, não vai dar erro, mas as telas de receitas estarão em branco até a gente programar a função de "Adicionar Receita".