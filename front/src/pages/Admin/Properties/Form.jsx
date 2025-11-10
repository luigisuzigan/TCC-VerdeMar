import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Home } from 'lucide-react';
import { api } from '../../../api/client.js';
import { shouldShowField, isFieldRequired, PROPERTY_TYPES_BY_CATEGORY } from '../../../utils/propertyFieldsHelper.js';
import { CATEGORIES, STYLES, PROPERTY_CONDITIONS, AMENITIES_LIST, NATURAL_CONDITIONS } from './constants.js';
import IdentificationSection from './FormSections/IdentificationSection.jsx';
import CategoryTypeSection from './FormSections/CategoryTypeSection.jsx';
import LocationSection from './FormSections/LocationSection.jsx';
import PriceSection from './FormSections/PriceSection.jsx';
import MonthlyCostsSection from './FormSections/MonthlyCostsSection.jsx';
import CharacteristicsSection from './FormSections/CharacteristicsSection.jsx';
import AmenitiesSection from './FormSections/AmenitiesSection.jsx';
import NaturalConditionsSection from './FormSections/NaturalConditionsSection.jsx';
import PublicationSection from './FormSections/PublicationSection.jsx';

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
  architecturalStyle: '',
  images: '[]',
  mainImage: '',
  rating: 0,
  published: false
};

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

  const availableTypes = PROPERTY_TYPES_BY_CATEGORY[selectedCategory] || [];

  useEffect(() => {
    async function fetchItem() {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await api.get(`/properties/${id}`);
        setModel(data);
        const imgs = Array.isArray(data.images) ? data.images : typeof data.images === 'string' ? JSON.parse(data.images || '[]') : [];
        setImagesText(imgs.join('\n'));
        const amen = typeof data.amenities === 'string' ? JSON.parse(data.amenities || '[]') : Array.isArray(data.amenities) ? data.amenities : [];
        setSelectedAmenities(amen);
        const natCond = typeof data.naturalConditions === 'string' ? JSON.parse(data.naturalConditions || '[]') : Array.isArray(data.naturalConditions) ? data.naturalConditions : [];
        setSelectedNaturalConditions(natCond);
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

  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);
    const firstType = PROPERTY_TYPES_BY_CATEGORY[category][0];
    setSelectedType(firstType);
    update('category', category);
    update('type', firstType);
  }

  function handleTypeChange(e) {
    const type = e.target.value;
    setSelectedType(type);
    update('type', type);
  }

  function toggleAmenity(amenity) {
    setSelectedAmenities(prev => prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]);
  }

  function toggleNaturalCondition(condition) {
    setSelectedNaturalConditions(prev => prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]);
  }

  async function submit(e) {
    e.preventDefault(); 
    setSaving(true); 
    setError('');
    
    try {
      const errorsBySections = {
        '1. Identificação': [],
        '2. Categoria e Tipo': [],
        '3. Localização': [],
        '4. Preço e Área': [],
        '5. Custos Mensais': [],
        '6. Características': []
      };
      
      // Seção 1: Identificação
      if (!model.title || model.title.trim().length === 0) {
        errorsBySections['1. Identificação'].push('Título é obrigatório');
      } else if (model.title.trim().length > 120) {
        errorsBySections['1. Identificação'].push('Título deve ter no máximo 120 caracteres');
      }
      
      // Seção 3: Localização
      if (!model.city || model.city.trim().length === 0) {
        errorsBySections['3. Localização'].push('Cidade é obrigatória');
      }
      if (!model.zipCode || model.zipCode.trim().length === 0) {
        errorsBySections['3. Localização'].push('CEP é obrigatório');
      }
      if (!model.state || model.state.trim().length === 0) {
        errorsBySections['3. Localização'].push('Estado é obrigatório');
      }
      
      // Seção 4: Preço e Área
      if (!model.price || parseFloat(model.price) <= 0) {
        errorsBySections['4. Preço e Área'].push('Preço deve ser maior que zero');
      }
      if (!model.area || parseInt(model.area) <= 0) {
        errorsBySections['4. Preço e Área'].push('Área deve ser maior que zero');
      }
      
      // Seção 5: Custos Mensais
      if (isFieldRequired(selectedType, 'condoFee') && !model.condoFee) {
        errorsBySections['5. Custos Mensais'].push(`Condomínio é obrigatório para ${selectedType}`);
      }
      
      // Seção 6: Características
      if (isFieldRequired(selectedType, 'beds') && (!model.beds && model.beds !== 0)) {
        errorsBySections['6. Características'].push(`Quartos é obrigatório para ${selectedType}`);
      }
      if (isFieldRequired(selectedType, 'baths') && (!model.baths && model.baths !== 0)) {
        errorsBySections['6. Características'].push(`Banheiros é obrigatório para ${selectedType}`);
      }
      if (isFieldRequired(selectedType, 'suites') && (!model.suites && model.suites !== 0)) {
        errorsBySections['6. Características'].push(`Suítes é obrigatório para ${selectedType}`);
      }
      if (isFieldRequired(selectedType, 'parkingSpaces') && (!model.parkingSpaces && model.parkingSpaces !== 0)) {
        errorsBySections['6. Características'].push(`Vagas de garagem é obrigatório para ${selectedType}`);
      }
      if (isFieldRequired(selectedType, 'floor') && !model.floor && model.floor !== 0) {
        errorsBySections['6. Características'].push(`Andar é obrigatório para ${selectedType}`);
      }
      if (isFieldRequired(selectedType, 'totalFloors') && !model.totalFloors) {
        errorsBySections['6. Características'].push(`Total de andares é obrigatório para ${selectedType}`);
      }
      // lotSize NÃO é obrigatório - removido para não bloquear salvamento
      
      // Verificar se há erros
      const allErrors = [];
      Object.entries(errorsBySections).forEach(([section, errors]) => {
        if (errors.length > 0) {
          allErrors.push(`\n📍 ${section}:`);
          errors.forEach(err => allErrors.push(`   • ${err}`));
        }
      });
      
      if (allErrors.length > 0) {
        setError('Preencha os campos obrigatórios abaixo:' + allErrors.join('\n'));
        setSaving(false);
        // NÃO rola para o topo, mantém o usuário onde está
        return;
      }
      
      const images = imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
      const mainImage = model.mainImage || (images.length > 0 ? images[0] : '');
      
      const payload = { 
        title: model.title.trim(),
        price: parseFloat(model.price),
        currency: model.currency || 'BRL',
        city: model.city.trim(),
        country: model.country || 'Brasil',
        area: parseInt(model.area),
        category: selectedCategory || 'Residencial',
        type: selectedType || 'Casa',
        ...(shouldShowField(selectedType, 'beds') && { beds: parseInt(model.beds) || 0 }),
        ...(shouldShowField(selectedType, 'baths') && { baths: parseInt(model.baths) || 0 }),
        ...(shouldShowField(selectedType, 'parkingSpaces') && { parkingSpaces: parseInt(model.parkingSpaces) || 0 }),
        description: model.description || '',
        address: model.address || '',
        state: model.state || '',
        neighborhood: model.neighborhood || '',
        zipCode: model.zipCode || '',
        style: model.architecturalStyle || '',
        propertyCondition: model.propertyCondition || '',
        ...(model.latitude && { latitude: parseFloat(model.latitude) }),
        ...(model.longitude && { longitude: parseFloat(model.longitude) }),
        ...(shouldShowField(selectedType, 'suites') && model.suites && { suites: parseInt(model.suites) }),
        ...(shouldShowField(selectedType, 'floor') && model.floor && { floor: parseInt(model.floor) }),
        ...(shouldShowField(selectedType, 'totalFloors') && model.totalFloors && { totalFloors: parseInt(model.totalFloors) }),
        ...(shouldShowField(selectedType, 'condoFee') && model.condoFee && { condoFee: parseFloat(model.condoFee) }),
        ...(model.iptu && { iptu: parseFloat(model.iptu) }),
        ...(model.homeInsurance && { homeInsurance: parseFloat(model.homeInsurance) }),
        ...(model.yearBuilt && { yearBuilt: parseInt(model.yearBuilt) }),
        ...(shouldShowField(selectedType, 'lotSize') && model.lotSize && { lotSize: parseInt(model.lotSize) }),
        images: JSON.stringify(images),
        amenities: JSON.stringify(selectedAmenities),
        naturalConditions: JSON.stringify(selectedNaturalConditions),
        mainImage: mainImage || '',
        rating: parseFloat(model.rating) || 0,
        published: model.published || false
      };
      
      console.log('🚀 PAYLOAD ENVIADO:', payload);
      console.log('📸 Images array:', images);
      console.log('🖼️ MainImage:', mainImage);
      console.log('🔍 PAYLOAD COMPLETO (stringificado):', JSON.stringify(payload, null, 2));
      
      if (id) {
        await api.put(`/properties/${id}`, payload);
      } else {
        await api.post('/properties', payload);
      }
      navigate('/admin/properties');
    } catch (e) {
      console.error('❌ Erro ao salvar:', e);
      console.error('📛 Resposta do servidor:', e?.response?.data);
      console.error('📊 Status:', e?.response?.status);
      console.error('📋 Headers:', e?.response?.headers);
      let errorMessage = 'Erro ao salvar';
      
      if (e?.response?.data?.errors && Array.isArray(e.response.data.errors)) {
        const errors = e.response.data.errors;
        const errorMessages = errors.map(err => {
          const field = err.param || err.field || 'Campo';
          const message = err.msg || err.message || 'Valor inválido';
          return `• ${field}: ${message}`;
        });
        errorMessage = 'Erros de validação:\n' + errorMessages.join('\n');
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

      <form onSubmit={submit} className="space-y-6">
        <IdentificationSection 
          model={model}
          update={update}
          imagesText={imagesText}
          setImagesText={setImagesText}
          imageUrls={imageUrls}
        />

        <CategoryTypeSection 
          model={model}
          update={update}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedType={selectedType}
          handleCategoryChange={handleCategoryChange}
          handleTypeChange={handleTypeChange}
        />

        <LocationSection 
          model={model}
          update={update}
        />

        <PriceSection 
          model={model}
          update={update}
          area={model.area}
          price={model.price}
        />

        <MonthlyCostsSection 
          model={model}
          update={update}
          selectedType={selectedType}
          condoFee={model.condoFee}
          iptu={model.iptu}
          homeInsurance={model.homeInsurance}
        />

        <CharacteristicsSection 
          model={model}
          update={update}
          selectedType={selectedType}
        />

        <AmenitiesSection 
          selectedAmenities={selectedAmenities}
          toggleAmenity={toggleAmenity}
          setSelectedAmenities={setSelectedAmenities}
          AMENITIES_LIST={AMENITIES_LIST}
        />

        <NaturalConditionsSection 
          selectedNaturalConditions={selectedNaturalConditions}
          toggleNaturalCondition={toggleNaturalCondition}
          setSelectedNaturalConditions={setSelectedNaturalConditions}
          NATURAL_CONDITIONS={NATURAL_CONDITIONS}
        />

        <PublicationSection 
          model={model}
          update={update}
        />

        <div className="flex items-center justify-end gap-4 pt-4 border-t-2 border-slate-200">
          <button 
            type="button" 
            onClick={() => navigate('/admin/properties')}
            className="px-8 py-3.5 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 hover:border-slate-400 transition-all flex items-center gap-2 shadow-sm"
          >
            <X size={20} />
            Cancelar
          </button>
          <button 
            type="submit"
            disabled={saving} 
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-emerald-200"
          >
            <Save size={20} />
            {saving ? 'Salvando...' : id ? 'Atualizar Imóvel' : 'Criar Imóvel'}
          </button>
        </div>
      </form>

      {/* Banner de erro fixo na parte inferior */}
      {error && (
        <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-6 shadow-2xl z-50 animate-slide-up">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-white text-red-600 rounded-full p-2">
                <X size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">❌ Não foi possível salvar o imóvel</h3>
                <div className="text-sm leading-relaxed whitespace-pre-line bg-red-700 bg-opacity-50 rounded-lg p-4 font-mono">
                  {error}
                </div>
              </div>
              <button
                onClick={() => setError('')}
                className="flex-shrink-0 bg-white text-red-600 hover:bg-red-50 rounded-lg p-2 transition-colors"
                title="Fechar"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
