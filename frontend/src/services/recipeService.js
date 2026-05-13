import api from './api';

export const recipeService = {
  getSwipeRecipes: async () => {
    try {
      const response = await api.get('/receitas/swipe');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar receitas para swipe:', error);
      throw error;
    }
  },

  searchRecipes: async (query) => {
    try {
      const response = await api.get('/receitas/busca', { params: { q: query } });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
      throw error;
    }
  },

  getRecipeById: async (id) => {
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  },

  createRecipe: async (recipeData) => {
    const response = await api.post('/receitas', recipeData);
    return response.data;
  },

  updateRecipe: async (id, recipeData) => {
    const response = await api.put(`/receitas/${id}`, recipeData);
    return response.data;
  },

  deleteRecipe: async (id) => {
    const response = await api.delete(`/receitas/${id}`);
    return response.data;
  }
};
