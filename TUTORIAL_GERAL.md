# Tutorial geral — Receita Fácil

Guia para o grupo rodar o projeto no **Windows**. É normal ninguém dominar tudo de primeira: **Java, React, banco, terminal** costumam aparecer pela primeira vez em projeto de faculdade mesmo. Aqui o foco é **fazer funcionar** e **entender o papel de cada peça**, sem precisar ser especialista em cada uma.

---

## O que é cada coisa (visão geral)

Não precisa decorar — é só para quando alguém perguntar “o que é isso?”.

| Nome | O que é, em poucas palavras |
|------|----------------------------|
| **MySQL** | Programa que **guarda dados** (receitas, usuários, etc.) em “tabelas”. No projeto usamos pelo **XAMPP**, que já traz o MySQL pronto. |
| **Backend (API)** | Um **servidor** no seu PC que **responde pedidos** do app: busca no banco, salva, valida. Este projeto usa **Java** com **Spring Boot**. Vocês **não precisam saber programar em Java** para rodar: o código já existe; vocês só **iniciam** o servidor. |
| **Frontend / app** | A **interface** que a pessoa vê no celular. Aqui é **React Native** (parecido com desenvolvimento web, mas para app). |
| **Expo** | Ferramenta que **facilita** testar o app React Native no celular sem complicação de build nativo. O app **Expo Go** no telefone carrega o projeto que roda no PC. |
| **Node.js** | Ambiente para rodar **JavaScript** no computador. O Expo e o `npm` (instalador de bibliotecas do projeto) dependem dele. |
| **Terminal** | Janela de texto onde você **digita comandos** (ou cola os que estão neste guia). O VS Code tem um terminal integrado; é o que usamos. |

**Resumo:** banco guarda dados → **backend** lê e grava no banco → **app** no celular fala com o backend. As três partes precisam estar “ligadas” (rodando) para o fluxo completo funcionar.

---

## O projeto em 3 partes (ordem para subir)

1. **Banco de dados** (MySQL via XAMPP)  
2. **Backend** (Java/Spring — API em `localhost:8080`)  
3. **App** (pasta `frontend` — Expo no celular)

Se o banco ou o backend estiverem parados, o app pode abrir, mas **não vai conseguir usar os dados** direito.

---

## Instalar uma vez no PC

Instalem com **Next / Avançar** até concluir (podem marcar opções padrão se não souberem o que é).

| Programa | Link | Para quê no projeto |
|----------|------|---------------------|
| XAMPP | [apachefriends.org](https://www.apachefriends.org/) | Subir o **MySQL** (banco) |
| Node.js **LTS** | [nodejs.org](https://nodejs.org/) | Rodar scripts do app e do **Expo** |
| Java **17** (Temurin) | [adoptium.net — versão 17](https://adoptium.net/temurin/releases/?version=17) | Rodar o **backend** Java |
| VS Code | [code.visualstudio.com](https://code.visualstudio.com/) | Abrir pastas do projeto e o **terminal** |

**Git** só é necessário se forem **clonar** o repositório; se já tiverem a pasta do projeto copiada, não precisa para seguir este tutorial.

---

## Como abrir o terminal no lugar certo

No **VS Code**: menu **Terminal → Novo terminal** (ou atalho `` Ctrl+` ``).

Os comandos deste guia precisam ser executados **dentro da pasta certa** (`backend` ou `frontend`). Para não errar o caminho:

- No painel esquerdo do VS Code, **clique com o botão direito** na pasta `backend` ou `frontend` → **Abrir no terminal integrado**.  
  Assim o terminal já inicia **dentro** dessa pasta.

Fluxo comum: **copiar** o comando do tutorial → **colar** no terminal → **Enter**. Se aparecer mensagem de erro, copiem o texto (ou tirem print) para o grupo analisar.

---

## Passo 1 — Banco (XAMPP + phpMyAdmin)

1. Abrir o **XAMPP Control Panel**.  
2. Clicar em **Start** em **MySQL**  e em **APACHE** (o indicador deve ficar verde / “running”).  
3. Clicar em **Admin** ao lado do MySQL → abre o **phpMyAdmin** no navegador.  
4. Criar um banco novo com o nome exato: **`receita_facil`**.  
5. Com esse banco selecionado, abrir a aba **SQL**.  
6. No VS Code, abrir o arquivo **`database/receita_facil_database.sql`**, selecionar tudo (`Ctrl+A`), copiar, colar na área de SQL do phpMyAdmin e clicar em **Executar**.

Se não aparecer erro em vermelho, a estrutura e os dados iniciais foram aplicados.

---

## Passo 2 — Backend (API Java)

1. Terminal **dentro da pasta `backend`** (botão direito na pasta → abrir no terminal, como acima).  
2. Executar:

```bash
.\mvnw.cmd spring-boot:run
```

Na **primeira vez**, pode demorar enquanto baixa dependências — é esperado. 

Quando a inicialização terminar, o servidor fica disponível em **http://localhost:8080** ou **http://localhost:8080/swagger-ui.html**. 

**Mantenham esse terminal aberto** enquanto forem testar o app.

Se usarem **Git Bash** no Windows, o comando pode ser `./mvnw spring-boot:run` em vez de `.\mvnw.cmd`.

---

## Passo 3 — App no celular (Expo)

1. Abrir **outra aba** de terminal no VS Code, agora na pasta **`frontend`**.  
2. **Na primeira vez** (ou depois de atualizar dependências no `package.json`):

```bash
npm install
```

3. Para iniciar o ambiente de desenvolvimento sempre que forem trabalhar:

```bash
npx expo start
```

4. No celular, instalar o app **Expo Go** (Google Play / App Store).  
5. Garantir que **celular e PC estão na mesma rede Wi-Fi**.  
6. Escanear o **QR Code** que o Expo mostra no terminal ou na página que abre no navegador.

---

## Passo 4 — Como encerrar corretamente
Para evitar que as portas do PC fiquem "presas" ou o banco de dados corrompa, siga exatamente esta ordem:

No Terminal (Frontend e Backend): * Clique na janela do terminal onde o processo está rodando e pressione Ctrl + C.

Confirmar encerramento: Se o terminal perguntar "Deseja finalizar o trabalho em lotes (S/N)?", digite S e aperte Enter.

Após isso, você já pode fechar o VS Code com segurança.

No XAMPP: * Clique em Stop nos processos que você iniciou (Apache e MySQL) antes de fechar o painel.

Após o status ficar cinza (parado), você pode fechar o XAMPP.

[!CAUTION]
IMPORTANTE: Se você não encerrar os processos corretamente, quando tentar abrir o projeto novamente, vai dar erro de "Porta Ocupada" e o sistema não vai subir.
---
## IMPORTANTE — Ajuste do IP (ESSENCIAL)
Se você estiver usando o celular para testar, siga estas orientações:

- NÃO use: http://localhost:8080

- Use o IP do seu PC: http://192.168.X.X:8080

- Como descobrir o seu IP:
  Abra o terminal ou CMD.

  Digite o comando: ipconfig

  Procure pela linha: IPv4 Address (Endereço IPv4).

---

## TESTE RÁPIDO (Checklist de Funcionamento)

- Antes de prosseguir, confirme se os itens abaixo estão operacionais:

- [ ] Backend: O servidor abriu sem erros.

- [ ] Mobile: O App abriu corretamente no Expo.

- [ ] Autenticação: O Login está funcionando.

- [ ] Dados: As receitas aparecem na lista.

-  Conclusão: Se todos os itens acima funcionarem, o seu projeto está OK! 🚀

---



## Se algo der errado (checklist)

- O erro ocorreu porque o Windows não sabe onde o Java está instalado (variável JAVA_HOME não configurada).

Caso seja o JAVA 17, aqui está como resolver:

1. Solução Rápida (para este terminal agora):
Copie e cole este comando no seu PowerShell e dê Enter:

powershell
$env:JAVA_HOME = "C:\Program Files\RedHat\java-17-openjdk-17.0.15.0.6-1"
Depois, rode o comando novamente:

powershell
.\mvnw.cmd spring-boot:run
2. Solução Permanente (recomendado):
Dessa forma, você não precisará digitar o comando acima toda vez que abrir o terminal:

Pesquise por "Editar as variáveis de ambiente do sistema" no menu Iniciar.
Clique em Variáveis de Ambiente.
Em "Variáveis do Sistema", clique em Novo.
Nome da variável: JAVA_HOME
Valor da variável: C:\Program Files\RedHat\java-17-openjdk-17.0.15.0.6-1
Clique em OK em todas as janelas.
Reinicie o PowerShell (ou o Editor de Código).

- **App não carrega dados / erro de conexão** → conferir se o **backend** está rodando (passo 2) e se o **MySQL** está ativo no XAMPP.  

- **MySQL não inicia no XAMPP** → outro software pode estar usando a porta **3306**; fechar outros servidores locais ou reiniciar o PC e tentar de novo.  

- **Expo não conecta ao celular** → mesma Wi-Fi; em algumas redes (faculdade, corporativa) o roteamento entre aparelhos é bloqueado — vale testar outra rede.

  Se não conectar:
- Tente mudar para "Tunnel" no Expo (tecla 't' no terminal)

- **Erros ao rodar `npm install`** → estar na pasta **`frontend`**, apagar a pasta `node_modules` só se alguém do grupo souber o que está fazendo; em geral, repetir `npm install` ou pedir ajuda com a mensagem de erro completa.

---

## Deploy / colocar online (só no fim do projeto)

Publicar backend e app na internet (Railway, Expo EAS, etc.) é um passo **à parte**, para apresentação ou entrega. **Não é obrigatório** para desenvolver em grupo com o código no mesmo repositório e testando no PC + celular na rede local.

---

## Dividir tarefas no grupo (4 pessoas)

Sugestão — ajustem conforme a disponibilidade de cada um:

| Pessoa | Foco |
|--------|------|
| **1** | XAMPP, criar banco `receita_facil`, executar o `.sql` |
| **2** | Subir o **backend** (`mvnw` na pasta `backend`) |
| **3** | Pasta **frontend**: `npm install` quando precisar, `npx expo start` |
| **4** | Celular com **Expo Go**, Wi-Fi, testar fluxos no app e anotar bugs |

Trocar conhecimento no grupo ajuda: quem já conseguiu rodar um passo pode **acompanhar** os outros na mesma etapa, sem pressa — projeto de faculdade é treino coletivo mesmo.

---

## O que você precisa conferir (no final)

- **MySQL**: Se der erro de conexão com o banco:
- Abra backend/src/main/resources/application.properties
- Procure: spring.datasource.password
- Se seu MySQL não tiver senha, deixe vazio:
  spring.datasource.password=

- **Maven**: se o comando `.\mvnw.cmd` não existir/falhar no seu PC, rode `mvn compile` (com Maven instalado no PATH) ou gere o wrapper com `mvn wrapper:wrapper`.

- **Fluxo completo esperado**: com MySQL ativo + backend em `localhost:8080` + `npx expo start`, o app deve funcionar no fluxo **swipe → favoritos → detalhe → avaliações**.

- **Perfis de teste (senha `123456`)**:
  - `admin@teste.com` (**ADMIN**)
  - `chef@teste.com` (**CHEF**)
  - `comum@teste.com` (**COMUM**)
