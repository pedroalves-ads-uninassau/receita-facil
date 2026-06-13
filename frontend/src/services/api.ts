import { Platform } from 'react-native';

// Lembre-se de verificar se a porta do seu backend é a 3000 ou outra!
const BASE_URL = 'http://10.100.2.32:8080'; 

const api = {
  // Busca as receitas do banco
  getReceitas: async (): Promise<any[]> => {
    try {
      const response = await fetch(`${BASE_URL}/receitas`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      return [];
    }
  },

  // Envia dados para o banco (como o cadastro de usuário)
  post: async (endpoint: string, bodyData: object) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro no POST em ${endpoint}:`, error);
      throw error;
    }
  }
};

// Exporta o objeto padrão para ser usado como "api.post" ou "api.getReceitas"
export default api;