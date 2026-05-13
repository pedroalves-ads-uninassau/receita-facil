import { useState, useEffect } from 'react';
import { recipeService } from '../services/recipeService';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSwipeRecipes = async () => {
    setLoading(true);
    try {
      const data = await recipeService.getSwipeRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    try {
      const data = await recipeService.searchRecipes(query);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { recipes, loading, error, loadSwipeRecipes, search };
};
