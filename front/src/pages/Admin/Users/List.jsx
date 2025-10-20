import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Edit2, 
  Trash2, 
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
  Filter,
  Users,
  CheckSquare,
  Square,
  X,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import { api } from '../../../api/client';
import { useAuth } from '../../../context/AuthContext';

const ROLES = {
  USER: { label: 'Usuário', color: 'slate', icon: Shield },
  SELLER: { label: 'Vendedor', color: 'blue', icon: ShieldCheck },
  ADMIN: { label: 'Admin', color: 'emerald', icon: ShieldAlert }
};

export default function AdminUsersList() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // all, USER, SELLER, ADMIN
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, inactive
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, [searchTerm, roleFilter, statusFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm || undefined,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        isActive: statusFilter === 'active' ? true : statusFilter === 'inactive' ? false : undefined,
        limit: 100
      };
      
      const { data } = await api.get('/users', { params });
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      alert('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/users/stats');
      setStats(data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    if (id === currentUser.id) {
      alert('Você não pode desativar sua própria conta!');
      return;
    }

    try {
      await api.put(`/users/${id}/toggle-status`, { isActive: !currentStatus });
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do usuário');
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      setEditingUser(null);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Erro ao atualizar role:', error);
      alert('Erro ao atualizar permissão do usuário');
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser.id) {
      alert('Você não pode deletar sua própria conta!');
      return;
    }

    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      await api.delete(`/users/${id}`);
      setSelectedIds(new Set());
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  };

  const handleDeleteSelected = async () => {
    setShowDeleteConfirm(false);
    
    // Filtrar para não deletar o usuário atual
    const idsToDelete = Array.from(selectedIds).filter(id => id !== currentUser.id);
    
    if (idsToDelete.length === 0) {
      alert('Você não pode deletar sua própria conta!');
      return;
    }

    try {
      await Promise.all(idsToDelete.map(id => api.delete(`/users/${id}`)));
      setSelectedIds(new Set());
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Erro ao deletar usuários:', error);
      alert('Erro ao deletar alguns usuários');
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === users.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(users.map(u => u.id)));
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

  const isAllSelected = users.length > 0 && selectedIds.size === users.length;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Usuários</h1>
          <p className="text-slate-600 mt-1">{total} usuários cadastrados</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Users className="text-slate-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total</p>
                <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <ShieldAlert className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Admins</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.admins}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Vendedores</p>
                <p className="text-2xl font-bold text-blue-600">{stats.sellers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Shield className="text-slate-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Usuários</p>
                <p className="text-2xl font-bold text-slate-900">{stats.users}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="text-emerald-600" size={20} />
            <span className="font-medium text-slate-900">
              {selectedIds.size} {selectedIds.size === 1 ? 'usuário selecionado' : 'usuários selecionados'}
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
              Tem certeza que deseja excluir {selectedIds.size} {selectedIds.size === 1 ? 'usuário' : 'usuários'}? 
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Select All */}
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
                {isAllSelected ? 'Desmarcar' : 'Selecionar'}
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todas as permissões</option>
              <option value="USER">Usuários</option>
              <option value="SELLER">Vendedores</option>
              <option value="ADMIN">Administradores</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
          <Users className="mx-auto text-slate-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Nenhum usuário encontrado</h3>
          <p className="text-slate-600">Tente ajustar os filtros de busca</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Seleção</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Usuário</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Permissão</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Status</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Cadastro</span>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <span className="text-xs font-medium text-slate-600 uppercase">Atividade</span>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <span className="text-xs font-medium text-slate-600 uppercase">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {users.map((user) => {
                  const isSelected = selectedIds.has(user.id);
                  const isCurrentUser = user.id === currentUser.id;
                  const roleInfo = ROLES[user.role] || ROLES.USER;
                  const RoleIcon = roleInfo.icon;

                  return (
                    <tr 
                      key={user.id} 
                      className={`hover:bg-slate-50 transition-colors ${isSelected ? 'bg-emerald-50' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleSelect(user.id)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          {isSelected ? (
                            <CheckSquare className="text-emerald-600" size={20} />
                          ) : (
                            <Square size={20} />
                          )}
                        </button>
                      </td>

                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">
                              {user.name}
                              {isCurrentUser && (
                                <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                  Você
                                </span>
                              )}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-slate-600">
                              <Mail size={14} />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-1 text-sm text-slate-600">
                                <Phone size={14} />
                                {user.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-6 py-4">
                        {editingUser === user.id ? (
                          <select
                            value={user.role}
                            onChange={(e) => handleChangeRole(user.id, e.target.value)}
                            onBlur={() => setEditingUser(null)}
                            autoFocus
                            className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="USER">Usuário</option>
                            <option value="SELLER">Vendedor</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        ) : (
                          <button
                            onClick={() => !isCurrentUser && setEditingUser(user.id)}
                            disabled={isCurrentUser}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                              isCurrentUser 
                                ? 'cursor-not-allowed opacity-60' 
                                : 'hover:opacity-80'
                            } bg-${roleInfo.color}-100 text-${roleInfo.color}-700`}
                          >
                            <RoleIcon size={16} />
                            {roleInfo.label}
                          </button>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(user.id, user.isActive)}
                          disabled={isCurrentUser}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            user.isActive
                              ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          } ${isCurrentUser ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          {user.isActive ? (
                            <>
                              <UserCheck size={16} />
                              Ativo
                            </>
                          ) : (
                            <>
                              <UserX size={16} />
                              Inativo
                            </>
                          )}
                        </button>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>

                      {/* Activity Stats */}
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600">
                          <div>{user._count?.properties || 0} imóveis</div>
                          <div>{user._count?.favorites || 0} favoritos</div>
                          <div>{user._count?.reviews || 0} avaliações</div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isCurrentUser}
                            className={`flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors ${
                              isCurrentUser ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
