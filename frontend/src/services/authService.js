import api from './api';

export const authService = {
  login: async (email, senha) => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },

  register: async ({ nome, email, senha, tipoUsuario }) => {
    const response = await api.post('/auth/register', { nome, email, senha, tipoUsuario });
    return response.data;
  },
};
