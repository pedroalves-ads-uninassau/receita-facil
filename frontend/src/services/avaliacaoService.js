import api from './api';

export const avaliacaoService = {
  listarPorReceita: async (receitaId) => {
    const response = await api.get(`/avaliacoes/receita/${receitaId}`);
    return response.data;
  },

  avaliar: async ({ usuarioId, receitaId, nota, comentario }) => {
    const response = await api.post('/avaliacoes', {
      usuarioId,
      receitaId,
      nota,
      comentario,
    });
    return response.data;
  },
};
