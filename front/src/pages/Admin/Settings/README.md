# Admin - Configurações do Sistema

## Visão Geral
Painel administrativo completo para gerenciamento de todas as configurações da plataforma VerdeMar.

## Abas Disponíveis

### 🌐 Geral
Configurações básicas do site:
- **Nome do Site** - Título da plataforma
- **URL do Site** - Endereço principal
- **Descrição** - Descrição exibida em meta tags e rodapé
- **Email de Contato** - Email principal para contato
- **Telefone de Suporte** - Telefone para atendimento

### 🗺️ Integrações
APIs e serviços externos:
- **Google Maps API Key** - Para mapas e geolocalização (com campo de senha)
- **Google Analytics ID** - Para rastreamento de visitantes
- **Facebook Pixel ID** - Para rastreamento de conversões

### 📧 Email
Configurações de envio de emails:
- **Servidor SMTP** - Host do servidor de email
- **Porta SMTP** - Porta de conexão (587, 465, etc)
- **Usuário SMTP** - Credenciais de autenticação
- **Senha SMTP** - Senha do servidor
- **Email Remetente** - Email que aparece como remetente

### 🔔 Notificações
Gerenciamento de notificações do sistema:
- ✅ Notificar Novo Imóvel
- ✅ Notificar Novo Usuário
- ✅ Notificar Nova Avaliação
- ✅ Notificações por Email

### 🎨 Aparência
Personalização visual:
- **Cor Primária** - Cor principal do tema (com seletor visual)
- **Cor Secundária** - Cor secundária do tema (com seletor visual)
- **Modo Escuro** - Ativar/desativar tema escuro

### 📋 Imóveis
Configurações específicas de imóveis:
- **Auto-aprovar Imóveis** - Publicar automaticamente sem revisão
- **Máximo de Imagens** - Limite de fotos por imóvel (1-50)
- **Preço Mínimo** - Valor mínimo aceito
- **Preço Máximo** - Valor máximo aceito

### 🔒 Segurança
Configurações de segurança e privacidade:
- **Verificação de Email Obrigatória** - Exigir verificação de email
- **Permitir Cadastro** - Permitir novos usuários
- **Comprimento Mínimo da Senha** - Mínimo de caracteres (6-20)
- **Timeout de Sessão** - Tempo de expiração em horas (1-720)

### 💰 Comissões
Gestão de taxas e comissões:
- **Comissão Padrão (%)** - Para vendedores regulares
- **Comissão Premium (%)** - Para vendedores premium

## Funcionalidades Especiais

### 🛠️ Modo de Manutenção
Seção dedicada para ativar/desativar o modo de manutenção:
- **Toggle ON/OFF** - Ativa o modo de manutenção
- **Mensagem Customizada** - Define o texto exibido aos usuários
- **Ícone de alerta** - Destaque visual para a configuração crítica

### 💾 Persistência de Dados
- **Salvamento automático** - As configurações são salvas no `localStorage`
- **Feedback visual** - Banner verde de sucesso após salvar
- **Loading state** - Indicador durante o processo de salvamento

### 🔄 Restaurar Padrão
- Botão para resetar todas as configurações aos valores iniciais
- Confirmação antes de executar a ação
- Recarrega a página após restaurar

## Interface

### Navegação por Abas
Sistema de abas horizontais com:
- Ícones representativos para cada seção
- Highlight da aba ativa (verde com borda inferior)
- Scroll horizontal em mobile
- Transições suaves

### Campos de Formulário
- **Inputs de texto** - Design consistente com border-radius arredondado
- **Color pickers** - Seletores visuais de cor integrados
- **Checkboxes** - Switches grandes e clicáveis
- **Number inputs** - Com min/max e step configurados
- **Textareas** - Para textos longos

### Alertas Informativos
- **Azul (Info)** - Informações gerais e dicas
- **Amarelo (Warning)** - Recomendações de segurança
- **Verde (Success)** - Confirmação de ações bem-sucedidas

### Campos com Senha
- **Botão toggle** - Mostrar/ocultar senha
- **Ícone de olho** - Eye/EyeOff do lucide-react

## Botões de Ação

### Salvar Alterações (Verde)
- Ícone de "Save"
- Estado de loading com spinner
- Desabilitado durante salvamento
- Feedback de sucesso

### Restaurar Padrão (Cinza)
- Ícone de "RefreshCw"
- Confirmação obrigatória
- Resetar tudo aos valores padrão

## Armazenamento

### LocalStorage
As configurações são salvas em `localStorage` com a chave:
```javascript
localStorage.setItem('adminSettings', JSON.stringify(settings))
```

### Carregamento Inicial
Ao montar o componente, verifica se há configurações salvas:
```javascript
const savedSettings = localStorage.getItem('adminSettings');
if (savedSettings) {
  setSettings(JSON.parse(savedSettings));
}
```

## Estrutura do Estado

```javascript
const [settings, setSettings] = useState({
  // Geral
  siteName: 'VerdeMar',
  siteDescription: '...',
  siteUrl: '...',
  contactEmail: '...',
  supportPhone: '...',
  
  // Integrações
  googleMapsApiKey: '',
  googleAnalyticsId: '',
  facebookPixelId: '',
  
  // Email
  smtpHost: '...',
  smtpPort: '587',
  smtpUser: '',
  smtpPassword: '',
  emailFrom: '...',
  
  // Notificações (boolean)
  notifyNewProperty: true,
  notifyNewUser: true,
  notifyNewReview: false,
  emailNotifications: true,
  
  // Aparência
  primaryColor: '#10b981',
  secondaryColor: '#3b82f6',
  darkMode: false,
  
  // Imóveis
  autoApproveProperties: false,
  maxImagesPerProperty: 10,
  minPriceRange: 50000,
  maxPriceRange: 10000000,
  
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
  maintenanceMessage: '...'
});
```

## Rota Frontend
```
/admin/settings
```
Acessível apenas por usuários com role ADMIN.

## Componente Principal

### AdminSettings (`/front/src/pages/Admin/Settings/index.jsx`)

#### Estados Principais:
- `settings` - Objeto com todas as configurações
- `loading` - Estado de salvamento
- `saveSuccess` - Feedback de sucesso
- `activeTab` - Aba ativa atual
- `showApiKey` - Toggle para mostrar/ocultar API key

#### Funções Principais:
- `handleChange(field, value)` - Atualiza um campo específico
- `handleSave()` - Salva todas as configurações
- `handleReset()` - Restaura configurações padrão

## Melhorias Futuras

### Backend Integration
- [ ] Criar endpoint `/api/settings` para persistir no banco
- [ ] Validação server-side das configurações
- [ ] Histórico de alterações de configurações
- [ ] Logs de quem alterou cada configuração

### Funcionalidades Adicionais
- [ ] Import/Export de configurações (JSON)
- [ ] Backup automático antes de mudanças críticas
- [ ] Preview em tempo real de cores
- [ ] Teste de envio de email
- [ ] Validação de API keys

### SEO Avançado
- [ ] Editor de meta tags por página
- [ ] Sitemap generator
- [ ] Robots.txt editor
- [ ] Schema markup configurável

### Analytics
- [ ] Dashboard de métricas integrado
- [ ] Configuração de eventos personalizados
- [ ] Relatórios customizados

### Multi-idioma
- [ ] Configuração de idiomas disponíveis
- [ ] Editor de traduções inline
- [ ] Detecção automática de idioma

## Navegação
O link "Configurações" está disponível no menu lateral do AdminLayout, abaixo de "Usuários".

## Ícones Utilizados
- `Globe` - Geral
- `Map` - Integrações
- `Mail` - Email
- `Bell` - Notificações
- `Palette` - Aparência
- `FileText` - Imóveis
- `Shield` - Segurança
- `DollarSign` - Comissões
- `Database` - Manutenção
- `Save` - Salvar
- `RefreshCw` - Restaurar/Loading
- `CheckCircle` - Sucesso
- `Info` - Informação
- `Lock` - Segurança
- `Eye/EyeOff` - Mostrar/ocultar senha
