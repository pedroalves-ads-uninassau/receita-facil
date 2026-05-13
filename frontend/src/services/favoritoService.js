import api from './api';

export const favoritoService = {
  addFavorite: async (usuarioId, receitaId) => {
    const response = await api.post('/favoritos', { idUsuario: usuarioId, idReceita: receitaId });
    return response.data;
  },

  getFavorites: async (usuarioId) => {
    const response = await api.get(`/favoritos/${usuarioId}`);
    return response.data;
  },

  removeFavorite: async (usuarioId, receitaId) => {
    // No backend, faltou endpoint de delete (implementado depois)
    const response = await api.delete(`/favoritos/${usuarioId}/${receitaId}`);
    return response.data;
  }
};
