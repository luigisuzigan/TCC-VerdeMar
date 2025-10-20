import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, X } from 'lucide-react';
import { api } from '../../api/client.js';
import ImageGallery from '../../components/PropertyDetails/ImageGallery.jsx';
import PriceAndStats from '../../components/PropertyDetails/PriceAndStats.jsx';
import PropertyInfo from '../../components/PropertyDetails/PropertyInfo.jsx';
import Amenities from '../../components/PropertyDetails/Amenities.jsx';
import Description from '../../components/PropertyDetails/Description.jsx';
import ContactCard from '../../components/PropertyDetails/ContactCard.jsx';
import LocationMap from '../../components/PropertyDetails/LocationMap.jsx';
import NearbyPlacesSection from '../../components/PropertyDetails/NearbyPlacesSection.jsx';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const { data } = await api.get(`/properties/${id}`);
        setProperty(data);
      } catch (e) {
        setError('Imóvel não encontrado');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value || 0);
  };

  const getPropertyTypeLabel = (type) => {
    const labels = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      cobertura: 'Cobertura',
      terreno: 'Terreno',
      kitnet: 'Kitnet',
      sobrado: 'Sobrado',
      chacara: 'Chácara',
      comercial: 'Comercial',
      loft: 'Loft',
    };
    return labels[type] || type || 'Imóvel';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando detalhes do imóvel...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Imóvel não encontrado</h2>
          <p className="text-slate-600 mb-6">
            O imóvel que você está procurando não existe ou foi removido.
          </p>
          <button
            onClick={() => navigate('/explorar')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Ver outros imóveis
          </button>
        </div>
      </div>
    );
  }

  const images = property.images || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Voltar para busca</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Share2 size={18} />
                <span className="hidden sm:inline font-medium">Compartilhar</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                  isFavorite
                    ? 'bg-red-50 border-red-300 text-red-600'
                    : 'border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                <span className="hidden sm:inline font-medium">Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery images={images} title={property.title} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <PriceAndStats property={property} formatCurrency={formatCurrency} />
            
            <PropertyInfo 
              property={property} 
              formatCurrency={formatCurrency}
              getPropertyTypeLabel={getPropertyTypeLabel}
            />

            <Amenities property={property} />

            <Description description={property.description} />

            {/* Localização e Mapa */}
            <LocationMap property={property} />
          </div>

          {/* Right Column - Contact Card (Sticky) */}
          <ContactCard property={property} formatCurrency={formatCurrency} />
        </div>

        {/* Seção: O que há por perto */}
        {property.nearbyPlaces && (
          <div className="mt-12">
            <NearbyPlacesSection nearbyPlaces={property.nearbyPlaces} />
          </div>
        )}
      </div>
    </div>
  );
}