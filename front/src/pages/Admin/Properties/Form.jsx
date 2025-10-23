
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  X, 
  Home, 
  MapPin, 
  DollarSign, 
  Maximize2, 
  Image as ImageIcon,
  Star,
  CheckSquare,
  Square
} from 'lucide-react';
import { api } from '../../../api/client.js';

const empty = {
  title: '',
  description: '',
  type: 'Apartamento',
  price: 0,
  currency: 'BRL',
  address: '',
  city: '',
  state: 'SC',
  country: 'Brasil',
  zipCode: '',
  latitude: null,
  longitude: null,
  area: 0,
  beds: 0,
  baths: 0,
  guests: 0,
  amenities: '[]',
  style: '',
  images: '[]',
  mainImage: '',
  rating: 0,
  reviewCount: 0,
  published: false,
  featured: false
};

const PROPERTY_TYPES = [
  'Apartamento',
  'Casa',
  'Cobertura',
  'Terreno',
  'Kitnet',
  'Sobrado',
  'Chácara',
  'Comercial',
  'Loft'
];

const STYLES = [
  'Moderno',
  'Rústico',
  'Minimalista',
  'Clássico',
  'Industrial',
  'Colonial',
  'Container',
  'Luxo',
  'Contemporâneo',
  'Tropical'
];

const AMENITIES_LIST = [
  'Piscina',
  'Churrasqueira',
  'Academia',
  'Salão de festas',
  'Elevador',
  'Ar-condicionado',
  'Aquecedor',
  'Wi-Fi',
  'TV a cabo',
  'Garagem',
  'Portaria 24h',
  'Câmeras de segurança',
  'Playground',
  'Quadra esportiva',
  'Sauna',
  'Jardim',
  'Varanda',
  'Vista para o mar',
  'Pet friendly',
  'Mobiliado'
];

export default function AdminPropertyForm() {
  const { id } = useParams();
  const [model, setModel] = useState(empty);
  const [imagesText, setImagesText] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/${id}`);
        setModel(data);
        
        // Parse images
        const imgs = Array.isArray(data.images) 
          ? data.images 
          : typeof data.images === 'string' 
            ? JSON.parse(data.images || '[]') 
            : [];
        setImagesText(imgs.join('\n'));
        
        // Parse amenities
        const amen = typeof data.amenities === 'string' 
          ? JSON.parse(data.amenities || '[]') 
          : Array.isArray(data.amenities) 
            ? data.amenities 
            : [];
        setSelectedAmenities(amen);
      } catch (error) {
        console.error('Erro ao carregar imóvel:', error);
        setError('Erro ao carregar dados do imóvel');
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [id]);

  function update(field, value) { 
    setModel((m) => ({ ...m, [field]: value })); 
  }

  function toggleAmenity(amenity) {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  }

  async function submit(e) {
    e.preventDefault(); 
    setSaving(true); 
    setError('');
    
    try {
      const images = imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
      
      console.log('📸 Processamento de imagens:');
      console.log('   - Texto bruto:', imagesText);
      console.log('   - Array final:', images);
      console.log('   - Quantidade:', images.length);
      
      // Se mainImage não está definida mas há imagens, usar a primeira
      const mainImage = model.mainImage || (images.length > 0 ? images[0] : '');
      
      const payload = { 
        ...model,
        images: JSON.stringify(images),
        amenities: JSON.stringify(selectedAmenities),
        mainImage: mainImage || '',
        latitude: model.latitude ? parseFloat(model.latitude) : null,
        longitude: model.longitude ? parseFloat(model.longitude) : null,
        price: parseFloat(model.price) || 0,
        area: parseInt(model.area) || 0,
        beds: parseInt(model.beds) || 0,
        baths: parseInt(model.baths) || 0,
        guests: parseInt(model.guests) || 0,
        rating: parseFloat(model.rating) || 0,
        reviewCount: parseInt(model.reviewCount) || 0
      };
      
      console.log('📤 Enviando dados:', {
        title: payload.title,
        imagesJSON: payload.images,
        hasImages: images.length > 0,
        mainImage: !!mainImage
      });
      
      if (id) {
        const { data } = await api.put(`/properties/${id}`, payload);
        console.log('✅ Imóvel atualizado:', data);
      } else {
        const { data } = await api.post('/properties', payload);
        console.log('✅ Imóvel criado:', data);
      }
      navigate('/admin/properties');
    } catch (e) {
      const msg = e?.response?.data?.error || e?.response?.data?.errors?.[0]?.msg || 'Erro ao salvar';
      setError(msg);
      console.error('❌ Erro ao salvar:', e);
      console.error('Detalhes:', e?.response?.data);
    } finally { 
      setSaving(false); 
    }
  }

  const imageUrls = imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Home className="text-emerald-600" size={32} />
          <h1 className="text-3xl font-bold text-slate-900">
            {id ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h1>
        </div>
        <p className="text-slate-600">
          {id ? 'Atualize as informações do imóvel' : 'Preencha os dados para cadastrar um novo imóvel'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
          <X className="flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium">Erro ao salvar</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Home size={24} className="text-emerald-600" />
            Informações Básicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Título do Anúncio *
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.title} 
                onChange={(e) => update('title', e.target.value)} 
                placeholder="Ex: Apartamento Moderno com Vista para o Mar"
                required 
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Descrição
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={5} 
                value={model.description || ''} 
                onChange={(e) => update('description', e.target.value)}
                placeholder="Descreva as características e diferenciais do imóvel..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Imóvel *
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.type} 
                onChange={(e) => update('type', e.target.value)}
                required
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estilo Arquitetônico
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.style || ''} 
                onChange={(e) => update('style', e.target.value)}
              >
                <option value="">Selecione...</option>
                {STYLES.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Localização */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={24} className="text-emerald-600" />
            Localização
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Endereço Completo
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.address || ''} 
                onChange={(e) => update('address', e.target.value)}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cidade *
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.city} 
                onChange={(e) => update('city', e.target.value)}
                placeholder="Ex: Florianópolis"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Estado *
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.state || ''} 
                onChange={(e) => update('state', e.target.value)}
                placeholder="Ex: SC"
                maxLength={2}
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                País *
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.country} 
                onChange={(e) => update('country', e.target.value)}
                placeholder="Ex: Brasil"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                CEP
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.zipCode || ''} 
                onChange={(e) => update('zipCode', e.target.value)}
                placeholder="88000-000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Latitude
              </label>
              <input 
                type="number"
                step="any"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.latitude || ''} 
                onChange={(e) => update('latitude', e.target.value)}
                placeholder="-27.5954"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Longitude
              </label>
              <input 
                type="number"
                step="any"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.longitude || ''} 
                onChange={(e) => update('longitude', e.target.value)}
                placeholder="-48.5480"
              />
            </div>
          </div>
        </div>

        {/* Preço e Características */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign size={24} className="text-emerald-600" />
            Preço e Características
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Preço (R$) *
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.price} 
                onChange={(e) => update('price', e.target.value)}
                min={0} 
                placeholder="450000"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Área (m²) *
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.area} 
                onChange={(e) => update('area', e.target.value)}
                min={0}
                placeholder="85"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Moeda
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.currency} 
                onChange={(e) => update('currency', e.target.value)}
              >
                <option value="BRL">BRL - Real</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quartos
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.beds} 
                onChange={(e) => update('beds', e.target.value)}
                min={0}
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Banheiros
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.baths} 
                onChange={(e) => update('baths', e.target.value)}
                min={0}
                placeholder="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Capacidade (hóspedes)
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.guests} 
                onChange={(e) => update('guests', e.target.value)}
                min={0}
                placeholder="4"
              />
            </div>
          </div>
        </div>

        {/* Comodidades */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckSquare size={24} className="text-emerald-600" />
            Comodidades
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {AMENITIES_LIST.map(amenity => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  selectedAmenities.includes(amenity)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {selectedAmenities.includes(amenity) ? (
                  <CheckSquare size={18} className="text-emerald-600" />
                ) : (
                  <Square size={18} className="text-slate-400" />
                )}
                <span className="text-sm font-medium">{amenity}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ImageIcon size={24} className="text-emerald-600" />
            Imagens
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URLs das Imagens (uma por linha)
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                rows={6} 
                value={imagesText} 
                onChange={(e) => setImagesText(e.target.value)}
                placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
              />
              <p className="mt-2 text-sm text-slate-500">
                {imageUrls.length} {imageUrls.length === 1 ? 'imagem adicionada' : 'imagens adicionadas'}
              </p>
            </div>

            {/* Preview de Imagens */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImagem não encontrada%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-medium">#{idx + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Avaliações e Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star size={24} className="text-emerald-600" />
            Avaliações e Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Avaliação Média (0-5)
              </label>
              <input 
                type="number"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.rating || 0} 
                onChange={(e) => update('rating', e.target.value)}
                min={0}
                max={5}
                placeholder="4.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Número de Avaliações
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.reviewCount || 0} 
                onChange={(e) => update('reviewCount', e.target.value)}
                min={0}
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Imagem Principal
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.mainImage || ''} 
                onChange={(e) => update('mainImage', e.target.value)}
                placeholder="URL da imagem principal"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                model.published 
                  ? 'bg-emerald-600 border-emerald-600' 
                  : 'border-slate-300 group-hover:border-slate-400'
              }`}>
                {model.published && <CheckSquare size={18} className="text-white" />}
              </div>
              <input 
                id="pub" 
                type="checkbox" 
                className="sr-only"
                checked={!!model.published} 
                onChange={(e) => update('published', e.target.checked)} 
              />
              <span className="text-sm font-medium text-slate-700">
                Publicar Imóvel (visível para usuários)
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                model.featured 
                  ? 'bg-amber-500 border-amber-500' 
                  : 'border-slate-300 group-hover:border-slate-400'
              }`}>
                {model.featured && <Star size={18} className="text-white" fill="currentColor" />}
              </div>
              <input 
                id="featured" 
                type="checkbox" 
                className="sr-only"
                checked={!!model.featured} 
                onChange={(e) => update('featured', e.target.checked)} 
              />
              <span className="text-sm font-medium text-slate-700">
                Imóvel em Destaque (aparece na home)
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <button 
            type="button" 
            onClick={() => navigate('/admin/properties')}
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <X size={20} />
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={saving} 
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={20} />
            {saving ? 'Salvando...' : id ? 'Atualizar Imóvel' : 'Criar Imóvel'}
          </button>
        </div>
      </form>
    </div>
  );
}
