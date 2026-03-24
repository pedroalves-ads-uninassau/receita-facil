# Guia de Mocks - Projeto Receita Fácil

Este documento serve para orientar os desenvolvedores sobre a localização e estrutura dos dados fictícios (mocks) utilizados no projeto mobile.

## Localização
Os arquivos de mock estão centralizados na pasta:
`frontend/src/mocks/`

## Arquivos Disponíveis

### 1. `recipes.js`
Contém a lista principal de receitas exibidas no Swipe (Home) e nos Detalhes.
- **Formato:** Array de objetos `RECIPES_MOCK`.
- **Campos principais:**
  - `id`: Identificador único.
  - `title`: Nome da receita.
  - `author`: Nome do criador/chef.
  - `time`: Tempo de preparo.
  - `category`: Categoria (ex: Lanches, Saudável, Massas).
  - `calories`: Valor calórico.
  - `rating`: Avaliação (0.0 a 5.0).
  - `bg`: Cor de destaque para o fundo ou badges.
  - `image`: URL da imagem (via Unsplash).
  - `ingredients`: Lista de strings com os ingredientes.
  - `steps`: Lista de strings com o passo a passo.

## Como utilizar
Para usar os dados em um novo componente, basta importar o mock desejado:

```javascript
import { RECIPES_MOCK } from '../mocks/recipes';

// Exemplo de uso:
const primeiraReceita = RECIPES_MOCK[0];
```

## Importante
Estes dados são temporários e servem apenas para a demonstração da interface (UI/UX). Quando o backend estiver integrado, estas chamadas deverão URGENTEMENTE ser substituídas por requisições à API.
