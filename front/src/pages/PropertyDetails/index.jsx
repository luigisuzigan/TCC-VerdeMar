import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { api } from '../../api/client.js';
import FavoriteButton from '../../components/FavoriteButton';
import ImageGallery from '../../components/PropertyDetails/ImageGallery.jsx';
import PriceAndStats from '../../components/PropertyDetails/PriceAndStats.jsx';
import PropertyCharacteristics from '../../components/PropertyDetails/PropertyCharacteristics.jsx';
import ValuesSection from '../../components/PropertyDetails/ValuesSection.jsx';
import PropertyCategory from '../../components/PropertyDetails/PropertyCategory.jsx';
import PropertyAmenitiesEnhanced from '../../components/PropertyDetails/PropertyAmenitiesEnhanced.jsx';
import NaturalConditions from '../../components/PropertyDetails/NaturalConditions.jsx';
import CondoInfo from '../../components/PropertyDetails/CondoInfo.jsx';
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
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado para a área de transferência!');
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
      {/* Image Gallery */}
      <ImageGallery 
        images={images} 
        title={property.title}
        onShare={handleShare}
        property={property}
      />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            <PriceAndStats property={property} formatCurrency={formatCurrency} />
            
            {/* Categoria, Tipo e Estilo */}
            <PropertyCategory 
              category={property.category} 
              type={property.type}
              style={property.style}
            />
            
            {/* Informações Gerais (área, quartos, banheiros, ano, andar, vagas) */}
            <PropertyCharacteristics 
              property={property} 
              formatCurrency={formatCurrency}
              getPropertyTypeLabel={getPropertyTypeLabel}
            />
            
            {/* Seção de Valores e Custos */}
            <ValuesSection property={property} formatCurrency={formatCurrency} />

            {/* Comodidades e Amenidades (Nova versão aprimorada) */}
            <PropertyAmenitiesEnhanced property={property} />

            {/* Condições Naturais */}
            <NaturalConditions property={property} />

            {/* Informações de Condomínio */}
            <CondoInfo property={property} formatCurrency={formatCurrency} />

            <Description description={property.description} />

            {/* Localização e Mapa */}
            <LocationMap property={property} />
          </div>

          {/* Right Column - Contact Card (Sticky) */}
          <ContactCard property={property} formatCurrency={formatCurrency} />
        </div>

        {/* Seção: O que há por perto */}
        <div className="mt-12">
          <NearbyPlacesSection nearbyPlaces={property.nearbyPlaces} />
        </div>
      </div>
    </div>
  );
}