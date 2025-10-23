import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Lock, Camera, Save, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import ImageCropModal from '../../components/ImageCropModal.jsx';

export default function Settings() {
  const navigate = useNavigate();
  const { user, updateUserData } = useAuth();
  const fileInputRef = useRef(null);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(user?.avatar || '');
  const [tempImage, setTempImage] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sincronizar com o avatar do usuário
  useEffect(() => {
    if (user?.avatar) {
      setImagePreview(user.avatar);
    }
  }, [user?.avatar]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um arquivo de imagem válido.');
      return;
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.');
      return;
    }

    setImageFile(file);
    
    // Criar preview e abrir modal de edição
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImage(reader.result);
      setShowCropModal(true);
    };
    reader.readAsDataURL(file);
  }

  function handleCropSave(croppedImage) {
    setImagePreview(croppedImage);
    setImageFile(croppedImage);
    setShowCropModal(false);
    setTempImage(null);
  }

  function handleCropCancel() {
    setShowCropModal(false);
    setTempImage(null);
    setImageFile(null);
    // Limpar input de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function handleRemoveImage() {
    setImagePreview('');
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function triggerFileInput() {
    fileInputRef.current?.click();
  }

  function getInitials(name) {
    if (!name) return 'U';
    const parts = name.trim().split(' ').filter(Boolean);
    const first = parts[0]?.[0] || '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!name.trim()) {
        throw new Error('O nome não pode estar vazio.');
      }

      const updates = { name: name.trim() };
      
      // Se houver um arquivo de imagem, converter para base64 ou enviar para servidor
      // Se a imagem foi removida, enviar null
      if (imageFile && imagePreview) {
        updates.avatar = imagePreview; // base64 string
      } else if (!imagePreview && user?.avatar) {
        // Usuário removeu a foto
        updates.avatar = null;
      }

      console.log('Enviando dados para:', `/users/${user.id}`);
      console.log('User ID:', user.id, 'Tipo:', typeof user.id);
      console.log('Dados:', { name: updates.name, hasAvatar: !!updates.avatar });

      const response = await api.put(`/users/${user.id}`, updates);
      console.log('Resposta:', response.data);
      
      setSuccess('Perfil atualizado com sucesso!');
      
      // Atualizar o contexto de autenticação (atualiza em todo o site)
      // IMPORTANTE: usar os dados retornados pelo servidor
      const updatedUserData = {
        ...response.data,
        name: response.data.name,
        avatar: response.data.avatar
      };
      
      console.log('Atualizando contexto com:', updatedUserData);
      updateUserData(updatedUserData);
      
      // Atualizar o preview local também
      if (response.data.avatar) {
        setImagePreview(response.data.avatar);
      }
      
      // Limpar estado de imagem temporária
      setImageFile(null);
      
    } catch (err) {
      console.error('Erro completo:', err);
      console.error('Response data:', err?.response?.data);
      
      // Extrair mensagem de erro mais detalhada
      let errorMsg = 'Erro ao atualizar perfil';
      
      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        // Se houver múltiplos erros, mostrar o primeiro ou concatenar
        const errors = err.response.data.errors;
        errorMsg = errors.map(e => `${e.path || e.param}: ${e.msg}`).join(', ');
      } else if (err?.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!currentPassword) {
        throw new Error('Informe a senha atual.');
      }
      if (newPassword.length < 6) {
        throw new Error('A nova senha deve ter pelo menos 6 caracteres.');
      }
      if (newPassword !== confirmPassword) {
        throw new Error('As senhas não conferem.');
      }

      await api.put(`/users/${user.id}/password`, {
        currentPassword,
        newPassword,
      });

      setSuccess('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50">
      {/* Modal de edição de imagem */}
      {showCropModal && tempImage && (
        <ImageCropModal
          image={tempImage}
          onSave={handleCropSave}
          onClose={handleCropCancel}
        />
      )}

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow hover:bg-white"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
        </div>

        {/* Mensagens de feedback */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <div className="space-y-6">
          {/* Card: Informações do Perfil */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-2">
                <User className="text-emerald-800" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Informações do Perfil</h2>
            </div>

            <form onSubmit={handleUpdateProfile}>
              <div className="flex flex-col gap-6 md:flex-row">
                {/* Foto de Perfil - Esquerda */}
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {/* Círculo da foto */}
                    <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-slate-200">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Perfil"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'grid';
                          }}
                        />
                      ) : null}
                      <div 
                        className="absolute inset-0 grid place-items-center bg-gradient-to-br from-emerald-400 to-sky-500 text-white text-3xl font-bold"
                        style={{ display: imagePreview ? 'none' : 'grid' }}
                      >
                        {getInitials(name)}
                      </div>
                    </div>
                    
                    {/* Botão de câmera sobre a foto */}
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 grid h-10 w-10 place-items-center rounded-full bg-emerald-800 text-white shadow-lg ring-4 ring-white hover:brightness-110 transition"
                      title="Alterar foto"
                    >
                      <Camera size={18} />
                    </button>
                  </div>
                  
                  {/* Input escondido */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-slate-500 text-center max-w-[140px]">
                      JPG, PNG ou GIF. Máx. 5MB
                    </p>
                    
                    {/* Botão remover foto */}
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition"
                      >
                        <Trash2 size={14} />
                        Remover foto
                      </button>
                    )}
                  </div>
                </div>

                {/* Informações - Direita */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                      Nome do Perfil
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="w-full rounded-lg border border-slate-300 bg-slate-100 px-4 py-2.5 text-slate-600 cursor-not-allowed"
                      title="O email não pode ser alterado"
                    />
                    <p className="mt-1 text-xs text-slate-500">O email não pode ser alterado</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-6 py-2.5 font-semibold text-white hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Card: Alterar Senha */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-2">
                <Lock className="text-emerald-800" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-slate-900">Alterar Senha</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="mb-1 block text-sm font-medium text-slate-700">
                  Senha Atual
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  autoComplete="current-password"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-slate-700">
                  Nova Senha
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-slate-700">
                  Confirmar Nova Senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white"
                  autoComplete="new-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-800 px-6 py-2.5 font-semibold text-white hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Lock size={18} />
                {loading ? 'Alterando...' : 'Alterar Senha'}
              </button>
            </form>
          </div>

          {/* Card: Informações da Conta */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">Informações da Conta</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Tipo de Conta:</span>
                <span className="font-medium text-slate-900">{user?.role || 'USER'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">ID:</span>
                <span className="font-mono text-xs text-slate-900">{user?.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
