import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY_PREFIX = 'favorites_user_';

// Função para obter a chave de favoritos do usuário atual
function getFavoritesKey() {
  const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (!userData) return null;
  
  try {
    const user = JSON.parse(userData);
    return `${FAVORITES_KEY_PREFIX}${user.id}`;
  } catch (error) {
    return null;
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do localStorage apenas se o usuário estiver logado
  useEffect(() => {
    try {
      // Verificar se o usuário está logado (localStorage tem token)
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const favoritesKey = getFavoritesKey();
      
      if (!token || !favoritesKey) {
        // Se não estiver logado, limpar favoritos
        setFavorites([]);
        return;
      }
      
      // Se estiver logado, carregar favoritos específicos do usuário
      const stored = localStorage.getItem(favoritesKey);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
      setFavorites([]);
    }
  }, []);

  // Monitorar mudanças no token (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const favoritesKey = getFavoritesKey();
      
      if (!token || !favoritesKey) {
        // Usuário deslogou, limpar favoritos da memória (não do localStorage)
        setFavorites([]);
      } else {
        // Usuário logou, carregar favoritos
        try {
          const stored = localStorage.getItem(favoritesKey);
          if (stored) {
            setFavorites(JSON.parse(stored));
          }
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Salvar no localStorage sempre que mudar
  const saveFavorites = useCallback((newFavorites) => {
    try {
      const favoritesKey = getFavoritesKey();
      if (!favoritesKey) {
        console.warn('Não foi possível salvar favoritos: usuário não identificado');
        return;
      }
      
      localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
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
