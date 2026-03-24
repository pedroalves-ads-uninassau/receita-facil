# 🍳 Receita Fácil - Projeto Acadêmico

O **Receita Fácil** é um aplicativo mobile focado na descoberta, salvamento e criação de receitas. O projeto utiliza uma interface estilo "Swipe" para facilitar a navegação e proporcionar uma experiência moderna e intuitiva aos usuários.

## 🚀 Como Rodar o Projeto (Mobile Frontend)

Para rodar o aplicativo localmente, siga os passos abaixo:

### Pré-requisitos
1. **Node.js**: Certifique-se de ter o Node instalado em sua máquina.
2. **Expo Go**: Instale o aplicativo **Expo Go** em seu celular (iOS ou Android) para visualizar o app real-time.

### Passo a Passo
1. **Instalar dependências**:
   Navegue até a pasta `frontend` e instale as bibliotecas necessárias:
   ```bash
   cd frontend
   npm install
   ```

2. **Iniciar o servidor Expo**:
   Ainda na pasta `frontend`, execute o comando:
   ```bash
   npx expo start
   ```

3. **Conectar ao celular**:
   - Um QR Code será exibido no terminal.
   - Abra a câmera do celular (iOS) ou o app **Expo Go** (Android) e escaneie o código.
   - O aplicativo será carregado no seu dispositivo.

4. **Para rodar LOCALMENTE na WEB**:
   pasta frontend
   npx expo start --localhost 
   pressione "w"
   abre o localhost:3000 no navegador
---

## 📂 Organização do Projeto

O código está estruturado da seguinte forma na pasta `frontend/src`:

- `/screens`: Telas individuais (Login, Home/Swipe, Perfil, Detalhes, etc).
- `/theme`: Configurações de cores e constantes de estilo global.
- `/mocks`: Dados fictícios (JSON) utilizados enquanto o backend está em desenvolvimento.
- `App.js`: Configuração de rotas de navegação (Stack e Tabs).

> [!TIP]
> **Dúvidas sobre os dados fictícios?** 
> Consulte o arquivo [DOC_MOCKS.md](./frontend/DOC_MOCKS.md) dentro da pasta `frontend` para entender onde as receitas estão salvas.

---

## 🛠️ Tecnologias Utilizadas
- **React Native** (Via Expo Framework)
- **React Navigation** (Gerenciamento de Abas e Pilhas)
- **Ionicons** (Conjunto de ícones)
- **JavaScript**

---

## 👨‍💻 Equipe e Contribuição
Este é um projeto acadêmico da UNINASSAU (3º Semestre).
- **Repositório oficial**: [pedroalves-ads-uninassau/receita-facil](https://github.com/pedroalves-ads-uninassau/receita-facil)
