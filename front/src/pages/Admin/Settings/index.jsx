import { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Globe,
  Mail,
  Database,
  Shield,
  Palette,
  Map,
  DollarSign,
  FileText,
  Save,
  RefreshCw,
  CheckCircle,
  XCircle,
  Info,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState(false);

  // Estados para as configurações
  const [settings, setSettings] = useState({
    // Geral
    siteName: 'VerdeMar',
    siteDescription: 'Encontre o imóvel perfeito à beira-mar',
    siteUrl: 'https://verdemar.com.br',
    contactEmail: 'contato@verdemar.com.br',
    supportPhone: '+55 11 99999-9999',
    
    // API e Integrações
    googleMapsApiKey: '',
    googleAnalyticsId: '',
    facebookPixelId: '',
    
    // Email
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: 'noreply@verdemar.com.br',
    
    // Aparência
    primaryColor: '#10b981',
    secondaryColor: '#3b82f6',
    darkMode: false,
    
    // Imóveis
    autoApproveProperties: false,
    maxImagesPerProperty: 10,
    minPriceRange: 50000,
    maxPriceRange: 10000000,
    
    // SEO
    metaTitle: 'VerdeMar - Imóveis à Beira-Mar',
    metaDescription: 'Encontre casas, apartamentos e terrenos em localidades paradisíacas',
    metaKeywords: 'imóveis, praia, casa de praia, apartamento beira-mar',
    
    // Segurança
    requireEmailVerification: true,
    allowUserRegistration: true,
    minPasswordLength: 8,
    sessionTimeout: 24,
    
    // Comissões
    defaultCommission: 5,
    premiumCommission: 3,
    
    // Manutenção
    maintenanceMode: false,
    maintenanceMessage: 'Estamos em manutenção. Voltamos em breve!'
  });

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);
    
    try {
      // Simular salvamento (aqui você faria a chamada à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Salvar no localStorage por enquanto
      localStorage.setItem('adminSettings', JSON.stringify(settings));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
      // Restaurar valores padrão
      localStorage.removeItem('adminSettings');
      window.location.reload();
    }
  };

  useEffect(() => {
    // Carregar configurações salvas
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const tabs = [
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'integrations', label: 'Integrações', icon: Map },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'appearance', label: 'Aparência', icon: Palette },
    { id: 'properties', label: 'Imóveis', icon: FileText },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'payments', label: 'Comissões', icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Configurações</h1>
          <p className="text-slate-600 mt-1">Gerencie as configurações do sistema</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} />
            Restaurar Padrão
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save size={18} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="text-emerald-600" size={24} />
          <div>
            <p className="font-medium text-emerald-900">Configurações salvas com sucesso!</p>
            <p className="text-sm text-emerald-700">As alterações foram aplicadas ao sistema.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 overflow-x-auto">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Globe size={24} className="text-emerald-600" />
                Configurações Gerais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nome do Site
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    URL do Site
                  </label>
                  <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleChange('siteUrl', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Descrição do Site
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email de Contato
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Telefone de Suporte
                  </label>
                  <input
                    type="tel"
                    value={settings.supportPhone}
                    onChange={(e) => handleChange('supportPhone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Informações Importantes</p>
                  <p>Essas configurações são exibidas em várias partes do site, incluindo rodapé, páginas de contato e meta tags.</p>
                </div>
              </div>
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Map size={24} className="text-emerald-600" />
                Integrações e APIs
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Maps API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={settings.googleMapsApiKey}
                      onChange={(e) => handleChange('googleMapsApiKey', e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Necessário para funcionalidades de mapas e geolocalização
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Para rastreamento de visitantes e análise de comportamento
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settings.facebookPixelId}
                    onChange={(e) => handleChange('facebookPixelId', e.target.value)}
                    placeholder="123456789012345"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Para rastreamento de conversões em campanhas do Facebook
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Mail size={24} className="text-emerald-600" />
                Configurações de Email
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Servidor SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.smtpHost}
                    onChange={(e) => handleChange('smtpHost', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Porta SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.smtpPort}
                    onChange={(e) => handleChange('smtpPort', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Usuário SMTP
                  </label>
                  <input
                    type="text"
                    value={settings.smtpUser}
                    onChange={(e) => handleChange('smtpUser', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Senha SMTP
                  </label>
                  <input
                    type="password"
                    value={settings.smtpPassword}
                    onChange={(e) => handleChange('smtpPassword', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Remetente (From)
                  </label>
                  <input
                    type="email"
                    value={settings.emailFrom}
                    onChange={(e) => handleChange('emailFrom', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Palette size={24} className="text-emerald-600" />
                Aparência
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cor Primária
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="h-12 w-16 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) => handleChange('primaryColor', e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cor Secundária
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="h-12 w-16 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) => handleChange('secondaryColor', e.target.value)}
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Modo Escuro</p>
                  <p className="text-sm text-slate-600">Ativar tema escuro no site</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => handleChange('darkMode', e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                />
              </label>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText size={24} className="text-emerald-600" />
                Configurações de Imóveis
              </h2>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <div>
                  <p className="font-medium text-slate-900">Auto-aprovar Imóveis</p>
                  <p className="text-sm text-slate-600">Publicar imóveis automaticamente sem revisão manual</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoApproveProperties}
                  onChange={(e) => handleChange('autoApproveProperties', e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                />
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Máximo de Imagens por Imóvel
                  </label>
                  <input
                    type="number"
                    value={settings.maxImagesPerProperty}
                    onChange={(e) => handleChange('maxImagesPerProperty', parseInt(e.target.value))}
                    min="1"
                    max="50"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço Mínimo (R$)
                  </label>
                  <input
                    type="number"
                    value={settings.minPriceRange}
                    onChange={(e) => handleChange('minPriceRange', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preço Máximo (R$)
                  </label>
                  <input
                    type="number"
                    value={settings.maxPriceRange}
                    onChange={(e) => handleChange('maxPriceRange', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Shield size={24} className="text-emerald-600" />
                Segurança e Privacidade
              </h2>

              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-medium text-slate-900">Verificação de Email Obrigatória</p>
                    <p className="text-sm text-slate-600">Usuários precisam verificar email antes de acessar o sistema</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-medium text-slate-900">Permitir Cadastro de Usuários</p>
                    <p className="text-sm text-slate-600">Permitir que novos usuários se cadastrem no sistema</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.allowUserRegistration}
                    onChange={(e) => handleChange('allowUserRegistration', e.target.checked)}
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Comprimento Mínimo da Senha
                    </label>
                    <input
                      type="number"
                      value={settings.minPasswordLength}
                      onChange={(e) => handleChange('minPasswordLength', parseInt(e.target.value))}
                      min="6"
                      max="20"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Timeout de Sessão (horas)
                    </label>
                    <input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                      min="1"
                      max="720"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <Lock className="text-amber-600 flex-shrink-0" size={20} />
                <div className="text-sm text-amber-900">
                  <p className="font-medium mb-1">Recomendações de Segurança</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use senhas de pelo menos 8 caracteres</li>
                    <li>Mantenha a verificação de email ativada</li>
                    <li>Configure timeout de sessão adequado</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <DollarSign size={24} className="text-emerald-600" />
                Comissões e Pagamentos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Comissão Padrão (%)
                  </label>
                  <input
                    type="number"
                    value={settings.defaultCommission}
                    onChange={(e) => handleChange('defaultCommission', parseFloat(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Comissão para vendedores regulares
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Comissão Premium (%)
                  </label>
                  <input
                    type="number"
                    value={settings.premiumCommission}
                    onChange={(e) => handleChange('premiumCommission', parseFloat(e.target.value))}
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Comissão para vendedores premium
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
                <Info className="text-blue-600 flex-shrink-0" size={20} />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Sobre Comissões</p>
                  <p>As comissões são aplicadas automaticamente em todas as transações realizadas na plataforma. Vendedores premium têm taxas reduzidas.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Database className="text-amber-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Modo de Manutenção</h3>
            <p className="text-slate-600 mb-4">
              Ative o modo de manutenção para realizar atualizações no sistema. O site ficará temporariamente indisponível para usuários.
            </p>
            
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
              />
              <span className="font-medium text-slate-900">Ativar Modo de Manutenção</span>
            </label>

            {settings.maintenanceMode && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mensagem de Manutenção
                </label>
                <textarea
                  value={settings.maintenanceMessage}
                  onChange={(e) => handleChange('maintenanceMessage', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
