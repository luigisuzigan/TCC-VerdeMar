import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Maximize2, 
  BedDouble, 
  Bath, 
  Car, 
  Home,
  Star,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Wifi,
  Waves,
  Trees,
  Dumbbell,
  Shield,
  Camera,
  Building2,
  Calendar,
  DollarSign,
  Snowflake,
  Wind,
  Utensils,
  Tv,
  PawPrint,
  Zap,
  Landmark
} from 'lucide-react';
import { api } from '../../api/client.js';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
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

  const nextImage = () => {
    if (property?.images?.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images?.length > 0) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
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
  const hasImages = images.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:bg-white/10 p-2 rounded-lg transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>
          
          <img
            src={images[selectedImageIndex]}
            alt={property.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}

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

      {/* Image Gallery Grid */}
      <div className="relative">
        {hasImages ? (
          <div className="grid grid-cols-4 gap-1 h-[450px]">
            {/* Main Large Image */}
            <div 
              className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
              onClick={() => { setSelectedImageIndex(0); setShowGallery(true); }}
            >
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
            </div>
            
            {/* Grid of Smaller Images */}
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="col-span-2 md:col-span-1 relative group cursor-pointer overflow-hidden"
                onClick={() => { setSelectedImageIndex(idx + 1); setShowGallery(true); }}
              >
                <img
                  src={img}
                  alt={`${property.title} - ${idx + 2}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all" />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[450px] bg-slate-100 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Home size={64} className="mx-auto mb-4 opacity-50" />
              <p>Sem imagens disponíveis</p>
            </div>
          </div>
        )}
        
        {/* See All Photos Button - Positioned over the grid */}
        {hasImages && images.length > 1 && (
          <button
            onClick={() => setShowGallery(true)}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-lg hover:bg-slate-50 transition-colors font-medium"
          >
            <Camera size={18} />
            Ver todas as {images.length} fotos
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            {/* Price Section - Estilo Zillow */}
            <div className="mb-8">
              <div className="text-5xl font-bold text-slate-900 mb-4">
                {formatCurrency(property.price)}
              </div>
              
              {/* Monthly Estimate */}
              <div className="flex items-center gap-2 text-slate-700 mb-6">
                <span className="text-lg">Est.: </span>
                <span className="text-lg font-semibold">
                  {formatCurrency(Math.round(property.price * 0.0065))}/mês
                </span>
                <button className="text-blue-600 hover:underline text-sm">
                  Ver detalhamento
                </button>
              </div>

              {/* Key Stats - Inline com separadores */}
              <div className="flex flex-wrap items-center gap-2 text-slate-700 mb-6 pb-6 border-b border-slate-200">
                {property.beds && (
                  <>
                    <span className="text-2xl font-bold">{property.beds}</span>
                    <span className="text-lg">quartos</span>
                  </>
                )}
                {property.baths && (
                  <>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="text-2xl font-bold">{property.baths}</span>
                    <span className="text-lg">banheiros</span>
                  </>
                )}
                {property.area && (
                  <>
                    <span className="text-slate-300 mx-1">•</span>
                    <span className="text-2xl font-bold">{property.area}</span>
                    <span className="text-lg">m²</span>
                  </>
                )}
              </div>

              {/* Address */}
              <div className="flex items-center gap-2 text-slate-700 mb-1">
                <MapPin size={20} className="text-slate-500" />
                <span className="text-xl">{property.address || `${property.city}, ${property.state || ''}`}</span>
              </div>
            </div>

            {/* Info Boxes - Estilo Zillow */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {/* Property Type */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                  <Home size={16} />
                  <span>Tipo</span>
                </div>
                <div className="font-semibold text-slate-900">
                  {getPropertyTypeLabel(property.type)}
                </div>
              </div>

              {/* Year Built */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                  <Calendar size={16} />
                  <span>Construído em</span>
                </div>
                <div className="font-semibold text-slate-900">
                  {property.yearBuilt || '2024'}
                </div>
              </div>

              {/* Parking */}
              {property.parkingSpaces && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Car size={16} />
                    <span>Estacionamento</span>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}
                  </div>
                </div>
              )}

              {/* Price per sqm */}
              {property.area && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <DollarSign size={16} />
                    <span>Preço/m²</span>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {formatCurrency(Math.round(property.price / property.area))}
                  </div>
                </div>
              )}

              {/* Lot Size */}
              {property.lotSize && (
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                    <Maximize2 size={16} />
                    <span>Área do lote</span>
                  </div>
                  <div className="font-semibold text-slate-900">
                    {property.lotSize} m²
                  </div>
                </div>
              )}

              {/* HOA */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                  <Landmark size={16} />
                  <span>Condomínio</span>
                </div>
                <div className="font-semibold text-slate-900">
                  {property.hoa ? formatCurrency(property.hoa) : 'R$ 0'}
                </div>
              </div>
            </div>

            {/* What this place offers - Estilo Airbnb */}
            <div className="border-t border-slate-200 pt-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">O que este lugar oferece</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Comodidades fixas baseadas em propriedades comuns */}
                <div className="flex items-center gap-4 py-3">
                  <Wifi size={24} className="text-slate-700" />
                  <span className="text-slate-900">Wi-Fi</span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <Snowflake size={24} className="text-slate-700" />
                  <span className="text-slate-900">Ar condicionado</span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <Utensils size={24} className="text-slate-700" />
                  <span className="text-slate-900">Cozinha equipada</span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <Car size={24} className="text-slate-700" />
                  <span className="text-slate-900">
                    Estacionamento - {property.parkingSpaces || 2} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}
                  </span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <Tv size={24} className="text-slate-700" />
                  <span className="text-slate-900">TV a cabo</span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <Wind size={24} className="text-slate-700" />
                  <span className="text-slate-900">Ventilação natural</span>
                </div>

                {property.amenities?.includes('Piscina') && (
                  <div className="flex items-center gap-4 py-3">
                    <Waves size={24} className="text-slate-700" />
                    <span className="text-slate-900">Piscina</span>
                  </div>
                )}

                {property.amenities?.includes('Academia') && (
                  <div className="flex items-center gap-4 py-3">
                    <Dumbbell size={24} className="text-slate-700" />
                    <span className="text-slate-900">Academia</span>
                  </div>
                )}

                {property.amenities?.includes('Jardim') && (
                  <div className="flex items-center gap-4 py-3">
                    <Trees size={24} className="text-slate-700" />
                    <span className="text-slate-900">Área verde / Jardim</span>
                  </div>
                )}

                {property.amenities?.includes('Pet Friendly') && (
                  <div className="flex items-center gap-4 py-3">
                    <PawPrint size={24} className="text-slate-700" />
                    <span className="text-slate-900">Permite animais de estimação</span>
                  </div>
                )}

                {property.amenities?.includes('Gerador') && (
                  <div className="flex items-center gap-4 py-3">
                    <Zap size={24} className="text-slate-700" />
                    <span className="text-slate-900">Gerador de energia</span>
                  </div>
                )}

                {/* Amenities dinâmicas do array */}
                {property.amenities && Array.isArray(property.amenities) && 
                  property.amenities
                    .filter(a => !['Piscina', 'Academia', 'Jardim', 'Pet Friendly', 'Gerador'].includes(a))
                    .map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-4 py-3">
                        <Check size={24} className="text-slate-700" />
                        <span className="text-slate-900">{amenity}</span>
                      </div>
                    ))
                }
              </div>

              {property.amenities && property.amenities.length > 10 && (
                <button className="mt-6 px-6 py-3 border border-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  Mostrar todas as {property.amenities.length} comodidades
                </button>
              )}
            </div>

            {/* Description */}
            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre este imóvel</h2>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {property.description || 'Sem descrição disponível.'}
              </p>
            </div>
          </div>

          {/* Right Column - Contact Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Contact Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-lg">
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-1">Entre em contato</p>
                  <p className="text-sm text-slate-500">Agende uma visita ou tire suas dúvidas</p>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                    Solicitar tour
                  </button>
                  <button className="w-full py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                    Entrar em contato
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Código do imóvel</span>
                    <span className="font-semibold text-slate-900">#{property.id}</span>
                  </div>
                  {property.city && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Cidade</span>
                      <span className="font-medium text-slate-900">{property.city}</span>
                    </div>
                  )}
                  {property.state && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Estado</span>
                      <span className="font-medium text-slate-900">{property.state}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Monthly Payment Breakdown */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Custos mensais estimados</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Financiamento</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(Math.round(property.price * 0.0045))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">IPTU</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(Math.round(property.price * 0.001))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Condomínio</span>
                    <span className="font-semibold text-slate-900">
                      {property.hoa ? formatCurrency(property.hoa) : formatCurrency(Math.round(property.price * 0.0005))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Seguro residencial</span>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(Math.round(property.price * 0.0015))}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-slate-300 flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Total estimado</span>
                    <span className="text-xl font-bold text-slate-900">
                      {formatCurrency(Math.round(property.price * 0.0065))}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  * Valores estimados. Consulte um especialista para cálculos precisos.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-emerald-900 text-sm mb-1">
                      Informação verificada
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Este imóvel foi verificado pela nossa equipe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}