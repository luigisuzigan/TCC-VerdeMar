
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
  Square,
  Building2,
  Leaf,
  HelpCircle
} from 'lucide-react';
import { api } from '../../../api/client.js';
import { 
  shouldShowField, 
  isFieldRequired, 
  PROPERTY_TYPES_BY_CATEGORY 
} from '../../../utils/propertyFieldsHelper.js';

const empty = {
  title: '',
  description: '',
  category: 'Residencial',
  type: 'Casa',
  price: 0,
  currency: 'BRL',
  address: '',
  city: '',
  state: 'SC',
  country: 'Brasil',
  neighborhood: '',
  zipCode: '',
  latitude: null,
  longitude: null,
  area: 0,
  beds: 0,
  baths: 0,
  // guests: removido - campo não existe mais no schema
  suites: 0,
  parkingSpaces: 0,
  floor: null,
  totalFloors: null,
  condoFee: null,
  iptu: null,
  homeInsurance: null,
  yearBuilt: null,
  propertyCondition: '',
  lotSize: null,
  amenities: '[]',
  naturalConditions: '[]',
  style: '',
  images: '[]',
  mainImage: '',
  rating: 0,
  published: false
  // featured: removido - campo não existe no schema
  // reviewCount: removido - campo não existe no schema
};

const CATEGORIES = [
  'Residencial',
  'Comercial',
  'Industrial',
  'Terreno',
  'Especial'
];

const STYLES = [
  'Moderno',
  'Clássico',
  'Rústico',
  'Industrial',
  'Minimalista',
  'Colonial',
  'Contemporâneo',
  'Tropical',
  'Container',
  'Steel Frame',
  'Madeira',
  'Sustentável',
  'Luxo',
  'Compacto',
  'Loft'
];

const PROPERTY_CONDITIONS = [
  'Novo',
  'Seminovo',
  'Usado',
  'Reformado'
];

const AMENITIES_LIST = [
  // Lazer
  'Piscina', 'Piscina Aquecida', 'Hidromassagem/Jacuzzi', 'Academia', 'Sauna', 'Spa',
  'Churrasqueira', 'Área Gourmet', 'Forno Pizza', 'Jardim', 'Varanda', 'Sacada', 
  'Terraço', 'Deck', 'Gazebo', 'Quadra Poliesportiva', 'Quadra Tênis', 'Campo Futebol',
  'Playground', 'Salão Jogos', 'Salão Festas', 'Cinema/Home Theater', 'Brinquedoteca',
  
  // Tecnologia
  'WiFi', 'Fibra Óptica', 'TV Cabo', 'Smart TV', 'Som Integrado', 'Automação',
  'Interfone', 'Vídeo Porteiro', 'Portão Eletrônico',
  
  // Climatização
  'Ar-condicionado', 'AC Central', 'AC Split', 'Aquecedor', 'Aquecedor Gás',
  'Aquecedor Solar', 'Ventilador Teto', 'Lareira', 'Lareira Lenha', 'Lareira Gás',
  
  // Garagem
  'Garagem Coberta', 'Garagem Descoberta', '1 Vaga', '2 Vagas', '3 Vagas', 
  '4+ Vagas', 'Vaga Visitantes', 'Carregador Elétrico',
  
  // Cozinha
  'Cozinha Equipada', 'Cozinha Planejada', 'Cozinha Gourmet', 'Ilha/Bancada',
  'Geladeira', 'Freezer', 'Fogão', 'Cooktop', 'Forno Elétrico', 'Forno Gás',
  'Micro-ondas', 'Lava-louças', 'Máquina Lavar', 'Máquina Secar', 'Adega', 
  'Coifa', 'Purificador Água',
  
  // Segurança
  'Portaria 24h', 'Segurança 24h', 'Câmeras', 'CFTV', 'Alarme', 'Cerca Elétrica',
  'Muros Altos', 'Grades', 'Porta Blindada', 'Cofre',
  
  // Acessibilidade
  'Elevador', 'Elevador Social', 'Elevador Serviço', 'Acessível Cadeirantes',
  'Rampa', 'Banheiro Adaptado', 'Corrimãos',
  
  // Pets
  'Aceita Pets', 'Aceita Cães', 'Aceita Gatos', 'Pet Place', 'Área Kids',
  
  // Condomínio
  'Salão Festas', 'Coworking', 'Bicicletário', 'Lavanderia', 'Depósito', 'Zelador',
  
  // Utilidades
  'Caixa d\'água', 'Cisterna', 'Aquecimento Solar', 'Bomba', 'Gerador', 'Energia Solar',
  
  // Quartos
  'Suíte Master', 'Closet', 'Banheira', 'Box Blindex', 'Ducha', 
  'Armários Embutidos', 'Guarda-roupas',
  
  // Acabamentos
  'Pé-direito Alto', 'Piso Frio', 'Piso Laminado', 'Piso Madeira', 'Porcelanato',
  'Gesso/Sancas', 'Molduras', 'Papel Parede', 'Pintura Nova'
];

const NATURAL_CONDITIONS = [
  // Vista e Localização
  'Vista para o mar', 'Vista panorâmica do mar', 'Frente para o mar', 'Pé na areia',
  'Vista para a praia', 'Vista para a montanha', 'Vista para o lago', 'Vista para o rio',
  'Vista para a cidade', 'Vista para a natureza', 'Vista para o verde', 'Vista para o parque',
  'Vista desobstruída', 'Vista privilegiada',
  
  // Ventilação
  'Ventilação natural', 'Ventilação cruzada', 'Brisa marítima', 'Brisa constante',
  'Circulação de ar excelente', 'Ambientes arejados', 'Janelas amplas', 'Portas de vidro',
  
  // Iluminação
  'Sol da manhã', 'Sol da tarde', 'Sol o dia todo', 'Muito sol', 
  'Iluminação natural abundante', 'Claridade natural', 'Face norte', 'Face sul',
  'Face leste', 'Face oeste', 'Claraboias / Luz zenital',
  
  // Clima
  'Clima ameno', 'Clima tropical', 'Temperatura agradável', 'Fresco no verão',
  'Quente no inverno', 'Sombra natural de árvores', 'Microclima agradável',
  
  // Natureza
  'Área verde', 'Arborizado', 'Jardim natural', 'Mata nativa', 'Árvores frutíferas',
  'Pomar', 'Horta', 'Contato com a natureza', 'Fauna local', 'Pássaros', 
  'Borboletas', 'Ecossistema preservado',
  
  // Topografia
  'Terreno plano', 'Terreno em declive', 'Terreno em aclive', 'Elevado / Ponto alto',
  'Vista de cima', 'Solo firme', 'Solo drenado',
  
  // Especiais
  'Nascer do sol', 'Pôr do sol', 'Céu estrelado', 'Noite tranquila',
  'Silêncio / Ambiente calmo', 'Privacidade', 'Área isolada', 'Exclusividade',
  
  // Praia
  'A 50m da praia', 'A 100m da praia', 'A 200m da praia', 'A 500m da praia',
  'Caminhada até a praia', 'Acesso direto à praia', 'Praia privativa', 'Som das ondas',
  
  // Água
  'Água de nascente', 'Poço artesiano', 'Rio próximo', 'Córrego', 
  'Cachoeira próxima', 'Lagos naturais',
  
  // Proximidade
  'Próximo a lago', 'Próximo a lagoa', 'Próximo a praça', 'Próximo a parque',
  'Próximo a trilha', 'Próximo a reserva ambiental', 'Próximo a área de preservação',
  'Próximo a bosque', 'Próximo a mata atlântica', 'Próximo a serra', 'Próximo a montanha',
  'Rua arborizada', 'Bairro com praças', 'Ciclovia próxima', 'Calçadão à beira-mar',
  'Orla próxima',
  
  // Sustentabilidade
  'Casa sustentável', 'Bioconstrução', 'Materiais naturais', 'Captação de água da chuva',
  'Compostagem', 'Fossa ecológica', 'Biodigestor', 'Energia renovável', 
  'Baixo impacto ambiental'
];

export default function AdminPropertyForm() {
  const { id } = useParams();
  const [model, setModel] = useState(empty);
  const [imagesText, setImagesText] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedNaturalConditions, setSelectedNaturalConditions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Residencial');
  const [selectedType, setSelectedType] = useState('Casa');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Atualizar tipos disponíveis quando categoria mudar
  const availableTypes = PROPERTY_TYPES_BY_CATEGORY[selectedCategory] || [];

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
        
        // Parse natural conditions
        const natCond = typeof data.naturalConditions === 'string' 
          ? JSON.parse(data.naturalConditions || '[]') 
          : Array.isArray(data.naturalConditions) 
            ? data.naturalConditions 
            : [];
        setSelectedNaturalConditions(natCond);
        
        // Set category and type
        setSelectedCategory(data.category || 'Residencial');
        setSelectedType(data.type || 'Casa');
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

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    // Resetar type para primeiro da nova categoria
    const firstType = PROPERTY_TYPES_BY_CATEGORY[category][0];
    setSelectedType(firstType);
    update('category', category);
    update('type', firstType);
  }

  function handleTypeChange(type) {
    setSelectedType(type);
    update('type', type);
  }

  function toggleAmenity(amenity) {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  }

  function toggleNaturalCondition(condition) {
    setSelectedNaturalConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  }

  async function submit(e) {
    e.preventDefault(); 
    setSaving(true); 
    setError('');
    
    try {
      // Validação prévia de campos obrigatórios
      const validationErrors = [];
      
      if (!model.title || model.title.trim().length === 0) {
        validationErrors.push('Título é obrigatório');
      } else if (model.title.trim().length > 120) {
        validationErrors.push('Título deve ter no máximo 120 caracteres');
      }
      
      if (!model.city || model.city.trim().length === 0) {
        validationErrors.push('Cidade é obrigatória');
      }
      if (!model.price || parseFloat(model.price) <= 0) {
        validationErrors.push('Preço deve ser maior que zero');
      }
      if (!model.area || parseInt(model.area) <= 0) {
        validationErrors.push('Área deve ser maior que zero');
      }
      // guests: removido - campo não existe mais no schema
      
      if (validationErrors.length > 0) {
        setError(validationErrors.join('; '));
        setSaving(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const images = imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
      
      console.log('📸 Processamento de imagens:');
      console.log('   - Texto bruto:', imagesText);
      console.log('   - Array final:', images);
      console.log('   - Quantidade:', images.length);
      
      // Se mainImage não está definida mas há imagens, usar a primeira
      const mainImage = model.mainImage || (images.length > 0 ? images[0] : '');
      
      // Preparar payload com campos obrigatórios e opcionais
      const payload = { 
        // Campos obrigatórios
        title: model.title.trim(),
        price: parseFloat(model.price),
        currency: model.currency || 'BRL',
        city: model.city.trim(),
        country: model.country || 'Brasil',
        area: parseInt(model.area),
        beds: parseInt(model.beds) || 0,
        baths: parseInt(model.baths) || 0,
        // guests: removido - campo não existe mais no schema
        
        // Campos opcionais - texto
        description: model.description || '',
        type: selectedType || 'Casa',
        category: selectedCategory || 'Residencial',
        address: model.address || '',
        state: model.state || '',
        neighborhood: model.neighborhood || '',
        zipCode: model.zipCode || '',
        style: model.style || '',
        propertyCondition: model.propertyCondition || '',
        
        // Campos opcionais - numéricos (só envia se tiver valor)
        ...(model.latitude && { latitude: parseFloat(model.latitude) }),
        ...(model.longitude && { longitude: parseFloat(model.longitude) }),
        ...(model.suites && { suites: parseInt(model.suites) }),
        ...(model.parkingSpaces && { parkingSpaces: parseInt(model.parkingSpaces) }),
        ...(model.floor && { floor: parseInt(model.floor) }),
        ...(model.totalFloors && { totalFloors: parseInt(model.totalFloors) }),
        ...(model.condoFee && { condoFee: parseFloat(model.condoFee) }),
        ...(model.iptu && { iptu: parseFloat(model.iptu) }),
        ...(model.homeInsurance && { homeInsurance: parseFloat(model.homeInsurance) }),
        ...(model.yearBuilt && { yearBuilt: parseInt(model.yearBuilt) }),
        ...(model.lotSize && { lotSize: parseInt(model.lotSize) }),
        
        // Arrays e JSON
        images: JSON.stringify(images),
        amenities: JSON.stringify(selectedAmenities),
        naturalConditions: JSON.stringify(selectedNaturalConditions),
        mainImage: mainImage || '',
        
        // Rating e flags
        rating: parseFloat(model.rating) || 0,
        published: model.published || false
        // featured: removido - campo não existe no schema Prisma
      };
      
      console.log('📤 Enviando dados:', {
        title: payload.title,
        category: payload.category,
        type: payload.type,
        price: payload.price,
        city: payload.city,
        area: payload.area,
        beds: payload.beds,
        baths: payload.baths,
        // guests: removido
        imagesCount: images.length,
        amenitiesCount: selectedAmenities.length,
        naturalConditionsCount: selectedNaturalConditions.length
      });
      
      console.log('📦 Payload completo:', payload);
      
      if (id) {
        console.log(`🔄 Atualizando imóvel ${id}...`);
        const { data } = await api.put(`/properties/${id}`, payload);
        console.log('✅ Imóvel atualizado:', data);
      } else {
        console.log('🆕 Criando novo imóvel...');
        const { data } = await api.post('/properties', payload);
        console.log('✅ Imóvel criado:', data);
      }
      navigate('/admin/properties');
    } catch (e) {
      console.error('❌ Erro ao salvar:', e);
      console.error('Detalhes completos:', e?.response?.data);
      
      let errorMessage = 'Erro ao salvar';
      
      // Se houver erros de validação do backend
      if (e?.response?.data?.errors && Array.isArray(e.response.data.errors)) {
        const errors = e.response.data.errors;
        console.error('Erros de validação:', errors);
        
        // Formatar erros de validação de forma legível
        const errorMessages = errors.map(err => {
          const field = err.param || err.field || 'Campo';
          const message = err.msg || err.message || 'Valor inválido';
          return `${field}: ${message}`;
        });
        
        errorMessage = errorMessages.join('; ');
      } else if (e?.response?.data?.error) {
        errorMessage = e.response.data.error;
      } else if (e?.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e?.message) {
        errorMessage = e.message;
      }
      
      setError(errorMessage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-800 flex items-start gap-3 shadow-sm">
          <X className="flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <p className="font-bold text-base mb-1">❌ Erro ao salvar o imóvel</p>
            <p className="text-sm leading-relaxed whitespace-pre-line">{error}</p>
            <p className="text-xs mt-2 text-red-600">Verifique os campos destacados e tente novamente.</p>
          </div>
        </div>
      )}

      <form onSubmit={submit} className="space-y-8">
        {/* Categoria e Tipo */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Home size={24} className="text-emerald-600" />
            1. Categoria e Tipo
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Categoria *
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={selectedCategory} 
                onChange={(e) => handleCategoryChange(e.target.value)}
                required
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo *
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={selectedType} 
                onChange={(e) => handleTypeChange(e.target.value)}
                required
              >
                {availableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Info sobre campos obrigatórios */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Campos obrigatórios para {selectedType}:</strong> Os campos necessários serão marcados com asterisco (*) conforme o tipo selecionado.
            </p>
          </div>
        </div>

        {/* Informações Básicas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Home size={24} className="text-emerald-600" />
            2. Informações Básicas
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
                Descrição (até 800 caracteres)
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={5} 
                value={model.description || ''} 
                onChange={(e) => update('description', e.target.value)}
                placeholder="Descreva as características e diferenciais do imóvel..."
                maxLength={800}
              />
              <p className="mt-1 text-xs text-slate-500">
                {(model.description || '').length} / 800 caracteres
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Estilo Arquitetônico
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Estilo construtivo do imóvel (Moderno, Rústico, etc.)"
                />
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Estado de Conservação
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Condição atual do imóvel"
                />
              </label>
              <select 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.propertyCondition || ''} 
                onChange={(e) => update('propertyCondition', e.target.value)}
              >
                <option value="">Selecione...</option>
                {PROPERTY_CONDITIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ano de Construção
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.yearBuilt || ''} 
                onChange={(e) => update('yearBuilt', e.target.value)}
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        </div>

        {/* Localização */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin size={24} className="text-emerald-600" />
            3. Localização
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
                Bairro
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.neighborhood || ''} 
                onChange={(e) => update('neighborhood', e.target.value)}
                placeholder="Ex: Lagoa da Conceição"
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
                CEP *
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.zipCode || ''} 
                onChange={(e) => update('zipCode', e.target.value)}
                placeholder="88000-000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Latitude
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Necessário para exibir no mapa"
                />
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
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Longitude
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Necessário para exibir no mapa"
                />
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
            4. Preço e Características
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

            {/* Área do Lote - Condicional */}
            {(selectedType.includes('Casa') || selectedType.includes('Sobrado') || 
              selectedType.includes('Chácara') || selectedType.includes('Sítio') || 
              selectedType.includes('Fazenda') || selectedType.includes('Terreno')) && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  Área do Lote/Terreno (m²) {isFieldRequired(selectedType, 'lotSize') && <span className="text-red-500">*</span>}
                  <HelpCircle 
                    size={16} 
                    className="text-slate-400 cursor-help" 
                    title="Área total do terreno/lote"
                  />
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.lotSize || ''} 
                  onChange={(e) => update('lotSize', e.target.value)}
                  min={0}
                  placeholder="500"
                  required={isFieldRequired(selectedType, 'lotSize')}
                />
              </div>
            )}

            {/* Quartos - Condicional */}
            {shouldShowField(selectedType, 'beds') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quartos {isFieldRequired(selectedType, 'beds') && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.beds || ''} 
                  onChange={(e) => update('beds', e.target.value)}
                  min={0}
                  placeholder="2"
                  required={isFieldRequired(selectedType, 'beds')}
                />
              </div>
            )}

            {/* Banheiros - Condicional */}
            {shouldShowField(selectedType, 'baths') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Banheiros {isFieldRequired(selectedType, 'baths') && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.baths || ''} 
                  onChange={(e) => update('baths', e.target.value)}
                  min={0}
                  placeholder="1"
                  required={isFieldRequired(selectedType, 'baths')}
                />
              </div>
            )}

            {/* guests: removido - campo não existe mais no schema */}

            {/* Suítes - Condicional */}
            {shouldShowField(selectedType, 'suites') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  Suítes {isFieldRequired(selectedType, 'suites') && <span className="text-red-500">*</span>}
                  <HelpCircle 
                    size={16} 
                    className="text-slate-400 cursor-help" 
                    title="Quartos com banheiro privativo"
                  />
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.suites || ''} 
                  onChange={(e) => update('suites', e.target.value)}
                  min={0}
                  placeholder="1"
                  required={isFieldRequired(selectedType, 'suites')}
                />
              </div>
            )}

            {/* Vagas - Condicional */}
            {shouldShowField(selectedType, 'parkingSpaces') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vagas de Garagem {isFieldRequired(selectedType, 'parkingSpaces') && <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="number"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.parkingSpaces || ''} 
                  onChange={(e) => update('parkingSpaces', e.target.value)}
                  min={0}
                  placeholder="2"
                  required={isFieldRequired(selectedType, 'parkingSpaces')}
                />
              </div>
            )}
          </div>
        </div>

        {/* Estrutura do Prédio - Condicional */}
        {(shouldShowField(selectedType, 'floor') || shouldShowField(selectedType, 'totalFloors')) && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 size={24} className="text-emerald-600" />
              5. Estrutura do Prédio
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Andar - Condicional */}
              {shouldShowField(selectedType, 'floor') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    Andar {isFieldRequired(selectedType, 'floor') && <span className="text-red-500">*</span>}
                    <HelpCircle 
                      size={16} 
                      className="text-slate-400 cursor-help" 
                      title="Andar onde está localizado o imóvel"
                    />
                  </label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={model.floor || ''} 
                    onChange={(e) => update('floor', e.target.value)}
                    min={0}
                    placeholder="5"
                    required={isFieldRequired(selectedType, 'floor')}
                  />
                </div>
              )}

              {/* Total de Andares - Condicional */}
              {shouldShowField(selectedType, 'totalFloors') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    Total de Andares {isFieldRequired(selectedType, 'totalFloors') && <span className="text-red-500">*</span>}
                    <HelpCircle 
                      size={16} 
                      className="text-slate-400 cursor-help" 
                      title="Total de andares do prédio (ou da casa para sobrados)"
                    />
                  </label>
                  <input 
                    type="number"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={model.totalFloors || ''} 
                    onChange={(e) => update('totalFloors', e.target.value)}
                    min={1}
                    placeholder="12"
                    required={isFieldRequired(selectedType, 'totalFloors')}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custos Mensais/Anuais */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <DollarSign size={24} className="text-emerald-600" />
            6. Custos Mensais e Anuais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Condomínio - Condicional */}
            {shouldShowField(selectedType, 'condoFee') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  Condomínio (R$/mês) {isFieldRequired(selectedType, 'condoFee') && <span className="text-red-500">*</span>}
                  <HelpCircle 
                    size={16} 
                    className="text-slate-400 cursor-help" 
                    title="Valor mensal do condomínio"
                  />
                </label>
                <input 
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={model.condoFee || ''} 
                  onChange={(e) => update('condoFee', e.target.value)}
                  min={0}
                  placeholder="450.00"
                  required={isFieldRequired(selectedType, 'condoFee')}
                />
              </div>
            )}

            {/* IPTU - Sempre opcional */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                IPTU (R$/ano)
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Valor anual do IPTU (será dividido por 12 para exibição mensal)"
                />
              </label>
              <input 
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.iptu || ''} 
                onChange={(e) => update('iptu', e.target.value)}
                min={0}
                placeholder="1200.00"
              />
            </div>

            {/* Seguro Residencial - Sempre opcional */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Seguro Residencial (R$/mês)
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Valor mensal estimado do seguro residencial"
                />
              </label>
              <input 
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.homeInsurance || ''} 
                onChange={(e) => update('homeInsurance', e.target.value)}
                min={0}
                placeholder="80.00"
              />
            </div>
          </div>

          {/* Cálculo de Custos Totais */}
          {(model.condoFee || model.iptu || model.homeInsurance) && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-sm font-medium text-emerald-900 mb-1">
                💰 Custo Mensal Total Estimado:
              </p>
              <p className="text-2xl font-bold text-emerald-600">
                {new Intl.NumberFormat('pt-BR', { 
                  style: 'currency', 
                  currency: 'BRL' 
                }).format(
                  (parseFloat(model.condoFee) || 0) + 
                  ((parseFloat(model.iptu) || 0) / 12) + 
                  (parseFloat(model.homeInsurance) || 0)
                )}
              </p>
              <p className="text-xs text-emerald-700 mt-1">
                Condomínio + IPTU/12 + Seguro
              </p>
            </div>
          )}
        </div>

        {/* Comodidades */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <CheckSquare size={24} className="text-emerald-600" />
            7. Comodidades e Amenidades
          </h2>
          
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">
              Selecione as comodidades disponíveis no imóvel (piscina, churrasqueira, etc.)
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-slate-700">
                {selectedAmenities.length} {selectedAmenities.length === 1 ? 'selecionada' : 'selecionadas'}
              </span>
              {selectedAmenities.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedAmenities([])}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Limpar todas
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
            {AMENITIES_LIST.map(amenity => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                  selectedAmenities.includes(amenity)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {selectedAmenities.includes(amenity) ? (
                  <CheckSquare size={16} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square size={16} className="text-slate-400 flex-shrink-0" />
                )}
                <span className="text-xs font-medium line-clamp-2">{amenity}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Condições Naturais */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Leaf size={24} className="text-emerald-600" />
            8. Condições Naturais e Ambientais
          </h2>
          
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-3">
              Selecione as características naturais do imóvel (vista, iluminação, ventilação, etc.)
            </p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-slate-700">
                {selectedNaturalConditions.length} {selectedNaturalConditions.length === 1 ? 'selecionada' : 'selecionadas'}
              </span>
              {selectedNaturalConditions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedNaturalConditions([])}
                  className="text-xs text-red-600 hover:text-red-700"
                >
                  Limpar todas
                </button>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
            {NATURAL_CONDITIONS.map(condition => (
              <button
                key={condition}
                type="button"
                onClick={() => toggleNaturalCondition(condition)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-left ${
                  selectedNaturalConditions.includes(condition)
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {selectedNaturalConditions.includes(condition) ? (
                  <CheckSquare size={16} className="text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square size={16} className="text-slate-400 flex-shrink-0" />
                )}
                <span className="text-xs font-medium line-clamp-2">{condition}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ImageIcon size={24} className="text-emerald-600" />
            9. Imagens do Imóvel
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                URLs das Imagens (uma por linha) *
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                rows={6} 
                value={imagesText} 
                onChange={(e) => setImagesText(e.target.value)}
                placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg&#10;https://exemplo.com/imagem3.jpg"
                required
              />
              <p className="mt-2 text-sm text-slate-500">
                {imageUrls.length} {imageUrls.length === 1 ? 'imagem adicionada' : 'imagens adicionadas'} 
                {imageUrls.length < 3 && <span className="text-amber-600 ml-2">⚠️ Recomendado: mínimo 3 imagens</span>}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Imagem Principal/Capa
              </label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.mainImage || ''} 
                onChange={(e) => update('mainImage', e.target.value)}
                placeholder="URL da imagem principal (deixe em branco para usar a primeira)"
              />
              <p className="mt-1 text-xs text-slate-500">
                Se não especificar, será usada a primeira imagem da lista
              </p>
            </div>

            {/* Preview de Imagens */}
            {imageUrls.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-700 mb-3">Preview das Imagens:</p>
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
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded">
                          Capa
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Avaliações e Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star size={24} className="text-emerald-600" />
            10. Avaliação e Publicação
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                Avaliação do Especialista (0-10)
                <HelpCircle 
                  size={16} 
                  className="text-slate-400 cursor-help" 
                  title="Avaliação feita por especialista considerando localização, estado, infraestrutura, etc."
                />
              </label>
              <input 
                type="number"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={model.rating || 0} 
                onChange={(e) => update('rating', e.target.value)}
                min={0}
                max={10}
                placeholder="8.5"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
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
              <div>
                <span className="text-sm font-medium text-slate-700 block">
                  Publicar Imóvel
                </span>
                <span className="text-xs text-slate-500">
                  Marque para tornar o imóvel visível para os usuários
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Nota sobre Campos Obrigatórios */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-900">
              Campos obrigatórios marcados com <span className="text-red-600">*</span>
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Certifique-se de preencher: Título, Cidade, Preço, Área, Quartos e Banheiros antes de salvar.
            </p>
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
