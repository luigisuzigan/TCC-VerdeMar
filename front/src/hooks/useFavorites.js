import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';

const FAVORITES_KEY_PREFIX = 'favorites_user_';

// Função para obter a chave de favoritos do usuário atual (fallback para localStorage)
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

// Função para verificar se o usuário está logado
function isUserLoggedIn() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return !!token;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carregar favoritos da API ou localStorage
  useEffect(() => {
    const loadFavorites = async () => {
      if (!isUserLoggedIn()) {
        setFavorites([]);
        return;
      }

      setLoading(true);
      try {
        // Tentar carregar da API primeiro
        const { data } = await api.get('/favorites');
        if (data.success) {
          // Extrair apenas as propriedades dos favoritos
          const properties = data.data.map(fav => fav.property);
          setFavorites(properties);
          
          // Sincronizar com localStorage como backup
          const favoritesKey = getFavoritesKey();
          if (favoritesKey) {
            localStorage.setItem(favoritesKey, JSON.stringify(properties));
          }
        }
      } catch (error) {
        console.warn('Erro ao carregar favoritos da API, usando localStorage:', error);
        
        // Fallback para localStorage se a API falhar
        const favoritesKey = getFavoritesKey();
        if (favoritesKey) {
          try {
            const stored = localStorage.getItem(favoritesKey);
            if (stored) {
              setFavorites(JSON.parse(stored));
            }
          } catch (err) {
            console.error('Erro ao carregar favoritos do localStorage:', err);
            setFavorites([]);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
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

  // Salvar no localStorage e sincronizar estado
  const saveFavorites = useCallback((newFavorites) => {
    try {
      setFavorites(newFavorites);
      
      // Salvar também no localStorage como backup
      const favoritesKey = getFavoritesKey();
      if (favoritesKey) {
        localStorage.setItem(favoritesKey, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  }, []);

  // Verificar se um imóvel está nos favoritos
  const isFavorite = useCallback((propertyId) => {
    return favorites.some(fav => fav.id === propertyId);
  }, [favorites]);

  // Adicionar aos favoritos
  const addFavorite = useCallback(async (property) => {
    if (isFavorite(property.id)) {
      return false;
    }

    try {
      // Adicionar na API
      await api.post(`/favorites/${property.id}`);
      
      // Atualizar estado local
      const newFavorites = [...favorites, property];
      saveFavorites(newFavorites);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      
      // Fallback: adicionar apenas localmente
      const newFavorites = [...favorites, property];
      saveFavorites(newFavorites);
      return true;
    }
  }, [favorites, isFavorite, saveFavorites]);

  // Remover dos favoritos
  const removeFavorite = useCallback(async (propertyId) => {
    try {
      // Remover da API
      await api.delete(`/favorites/${propertyId}`);
      
      // Atualizar estado local
      const newFavorites = favorites.filter(fav => fav.id !== propertyId);
      saveFavorites(newFavorites);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      
      // Fallback: remover apenas localmente
      const newFavorites = favorites.filter(fav => fav.id !== propertyId);
      saveFavorites(newFavorites);
    }
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
    loading,
  };
}
