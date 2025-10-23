import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../context/AuthContext';

export default function FavoriteButton({ property, size = 'md', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isFav = isFavorite(property.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Verificar se o usuário está logado
    if (!user) {
      alert('Você precisa fazer login para salvar imóveis nos favoritos!');
      navigate('/login');
      return;
    }
    
    toggleFavorite(property);
  };

  const sizes = {
    sm: { button: 'p-1.5', icon: 14 },
    md: { button: 'p-2', icon: 18 },
    lg: { button: 'p-3', icon: 22 },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      onClick={handleClick}
      className={`
        ${currentSize.button}
        bg-white/90 backdrop-blur-sm rounded-full 
        hover:bg-white hover:scale-110 
        transition-all duration-200 shadow-lg
        ${className}
      `}
      title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        size={currentSize.icon}
        className={`transition-colors ${
          isFav
            ? 'text-rose-500 fill-rose-500'
            : 'text-slate-600 hover:text-rose-500'
        }`}
      />
    </button>
  );
}
