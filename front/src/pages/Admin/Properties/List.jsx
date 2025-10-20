import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff,
  MapPin,
  Home,
  Filter,
  CheckSquare,
  Square,
  X
} from 'lucide-react';
import { api } from '../../../api/client';

export default function AdminPropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, published, unpublished
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 1000; // Mostrar todos
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [searchTerm, filter, page]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm || undefined,
        published: filter === 'published' ? true : filter === 'unpublished' ? false : undefined,
        limit,
        offset: (page - 1) * limit
      };
      
      const { data } = await api.get('/properties', { params });
      
      // Adaptar resposta para diferentes formatos
      const items = data.items || data.properties || [];
      const totalCount = data.total || items.length;
      
      setProperties(items);
      setTotal(totalCount);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
      setProperties([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      await api.patch(`/properties/${id}`, { published: !currentStatus });
      fetchProperties();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status da propriedade');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta propriedade?')) return;
    
    try {
      await api.delete(`/properties/${id}`);
      setSelectedIds(new Set()); // Limpar seleção
      fetchProperties();
    } catch (error) {
      console.error('Erro ao deletar propriedade:', error);
      alert('Erro ao deletar propriedade');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    
    setShowDeleteConfirm(false);
    
    try {
      // Deletar todos os selecionados
      await Promise.all(
        Array.from(selectedIds).map(id => api.delete(`/properties/${id}`))
      );
      setSelectedIds(new Set());
      fetchProperties();
    } catch (error) {
      console.error('Erro ao deletar propriedades:', error);
      alert('Erro ao deletar algumas propriedades');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === properties.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(properties.map(p => p.id)));
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const isAllSelected = properties.length > 0 && selectedIds.size === properties.length;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(value);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Imóveis</h1>
          <p className="text-slate-600 mt-1">{total} propriedades cadastradas</p>
        </div>
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
        >
          <Plus size={20} />
          Novo Imóvel
        </Link>
      </div>

      {/* Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-emerald-600" size={20} />
            <span className="font-medium text-slate-900">
              {selectedIds.size} {selectedIds.size === 1 ? 'imóvel selecionado' : 'imóveis selecionados'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <Trash2 size={18} />
              Excluir Selecionados
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
            >
              <X size={18} />
              Limpar
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirmar Exclusão</h3>
            <p className="text-slate-600 mb-6">
              Tem certeza que deseja excluir {selectedIds.size} {selectedIds.size === 1 ? 'imóvel' : 'imóveis'}? 
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteSelected}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sim, Excluir
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Select All Checkbox */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
            >
              {isAllSelected ? (
                <CheckSquare className="text-emerald-600" size={20} />
              ) : (
                <Square className="text-slate-400" size={20} />
              )}
              <span className="font-medium text-slate-700">
                {isAllSelected ? 'Desmarcar Todos' : 'Selecionar Todos'}
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por título ou cidade..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Filter by Status */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todos os imóveis</option>
              <option value="published">Publicados</option>
              <option value="unpublished">Não publicados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <Home className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
          <p className="text-slate-600 mb-6">Comece adicionando seu primeiro imóvel</p>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors"
          >
            <Plus size={20} />
            Adicionar Imóvel
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => {
              const isSelected = selectedIds.has(property.id);
              
              return (
                <div
                  key={property.id}
                  className={`bg-white rounded-2xl overflow-hidden border-2 transition-all ${
                    isSelected 
                      ? 'border-emerald-500 shadow-lg' 
                      : 'border-slate-200 hover:shadow-lg'
                  }`}
                >
                  {/* Image with Checkbox Overlay */}
                  <div className="relative h-48 bg-slate-200">
                    {(() => {
                      try {
                        const imgs = typeof property.images === 'string' 
                          ? JSON.parse(property.images) 
                          : property.images;
                        const firstImage = Array.isArray(imgs) && imgs.length > 0 ? imgs[0] : null;
                        
                        return firstImage ? (
                          <img
                            src={firstImage}
                            alt={property.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="text-slate-400" size={48} />
                          </div>
                        );
                      } catch {
                        return (
                          <div className="w-full h-full flex items-center justify-center">
                            <Home className="text-slate-400" size={48} />
                          </div>
                        );
                      }
                    })()}
                    
                    {/* Fallback para erro de imagem */}
                    <div className="w-full h-full items-center justify-center" style={{ display: 'none' }}>
                      <Home className="text-slate-400" size={48} />
                    </div>
                    
                    {/* Checkbox */}
                    <div className="absolute top-3 left-3">
                      <button
                        onClick={() => toggleSelect(property.id)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white/90 text-slate-600 hover:bg-white'
                        }`}
                      >
                        {isSelected ? (
                          <CheckSquare size={20} />
                        ) : (
                          <Square size={20} />
                        )}
                      </button>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          property.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {property.published ? 'Publicado' : 'Não publicado'}
                      </span>
                    </div>
                  </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-600 text-sm mb-3">
                    <MapPin size={16} />
                    <span className="line-clamp-1">{property.city}, {property.state}</span>
                  </div>
                  
                  <p className="text-2xl font-bold text-emerald-600 mb-4">
                    {formatCurrency(property.price)}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTogglePublish(property.id, property.published)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        property.published
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}
                      title={property.published ? 'Despublicar' : 'Publicar'}
                    >
                      {property.published ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="hidden sm:inline">
                        {property.published ? 'Ocultar' : 'Publicar'}
                      </span>
                    </button>
                    
                    <Link
                      to={`/admin/properties/${property.id}`}
                      className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Pagination - Removida pois mostramos todos */}
        </>
      )}
    </div>
  );
}
