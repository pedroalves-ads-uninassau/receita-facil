import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { favoritoService } from '../services/favoritoService';

export const useFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFavorites = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await favoritoService.getFavorites(user.id);
      setFavorites(data);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const toggleFavorite = async (recipeId) => {
    if (!user) return;
    try {
      // Por simplicidade, adicionamos smpre (Swipe Right)
      await favoritoService.addFavorite(user.id, recipeId);
      // Recarregar
      loadFavorites();
    } catch (err) {
      console.error('Erro ao favoritar:', err);
    }
  };

  return { favorites, loading, loadFavorites, toggleFavorite };
};
