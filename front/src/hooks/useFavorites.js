import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      setFavorites([]);
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  const saveFavorites = useCallback((newFavorites) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }, []);

  // Verificar se um imóvel está nos favoritos
  const isFavorite = useCallback((propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  }, [favorites]);

  // Adicionar aos favoritos
  const addFavorite = useCallback((property) => {
    if (!isFavorite(property.id)) {
      const newFavorites = [...favorites, property];
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  }, [favorites, isFavorite, saveFavorites]);

  // Remover dos favoritos
  const removeFavorite = useCallback((propertyId) => {
    const newFavorites = favorites.filter(fav => fav.id !== propertyId);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  // Toggle favorito
  const toggleFavorite = useCallback((property) => {
    if (isFavorite(property.id)) {
      removeFavorite(property.id);
      return false; // Removido
    } else {
      addFavorite(property);
      return true; // Adicionado
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    count: favorites.length,
  };
}
