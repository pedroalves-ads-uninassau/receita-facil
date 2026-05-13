import React, { createContext, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const normalizeUser = (apiUser) => ({
    id: apiUser.id,
    nome: apiUser.nome,
    email: apiUser.email,
    tipo: apiUser.tipoUsuario,
    tipoUsuario: apiUser.tipoUsuario,
  });

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authService.login(email, password);
      const normalized = normalizeUser(loggedUser);
      setUser(normalized);
      return normalized;
    } catch (err) {
      const msg = err?.response?.data?.message || 'Falha no login.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ nome, email, senha, tipoUsuario }) => {
    setLoading(true);
    setError(null);
    try {
      const createdUser = await authService.register({ nome, email, senha, tipoUsuario });
      const normalized = normalizeUser(createdUser);
      setUser(normalized);
      return normalized;
    } catch (err) {
      const msg = err?.response?.data?.message || 'Falha no cadastro.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
