# 📚 Documentação VerdeMar

Índice completo da documentação do projeto.

## 🚀 Getting Started

### Guias Iniciais
- [GUIA_COMPLETO.md](GUIA_COMPLETO.md) - **📘 Documentação Completa do Projeto**
- [IMPLEMENTACAO_COMPLETA.md](IMPLEMENTACAO_COMPLETA.md) - Detalhes de implementação

### Setup e Configuração
- [Google Maps Setup](setup/GOOGLE_MAPS_SETUP.md) - Configurar integração com Google Maps
- [Deploy Vercel - Geral](setup/DEPLOY_VERCEL_GERAL.md) - Guia geral de deploy (Backend + Frontend)
- [Deploy Vercel - Frontend](setup/DEPLOY_VERCEL_FRONTEND.md) - Guia específico do frontend

## 📖 Backend

### Documentação de API e Configuração
Documentação oficial em [`/back/docs/`](../back/docs/):

- [Quick Start](../back/docs/QUICK_START.md) - Início rápido
- [Setup Completo](../back/docs/SETUP.md) - Configuração detalhada
- [Property Parameters](../back/docs/PROPERTY_PARAMETERS.md) - **Parâmetros de imóveis**
- [Amenities & Conditions](../back/docs/AMENITIES_AND_CONDITIONS.md) - Comodidades e condições
- [Style System](../back/docs/STYLE_SYSTEM_README.md) - Sistema de estilos
- [Users API](../back/docs/USERS_API.md) - API de usuários
- [CRUD Users Summary](../back/docs/CRUD_USERS_SUMMARY.md) - Gestão de usuários
- [Deploy Backend](../back/docs/DEPLOY_VERCEL_BACKEND.md) - Deploy do backend

### Scripts e Serviços
Documentação técnica em [`/docs/backend/`](backend/):

- [Scripts](backend/SCRIPTS.md) - Scripts utilitários
- [Seed Data](backend/SEED_DATA.md) - Dados de teste
- [Nearby Places Service](backend/NEARBY_PLACES_SERVICE.md) - Google Maps API

## 🎨 Frontend

Documentação de componentes e páginas em [`/docs/frontend/`](frontend/):

### Páginas
- [Admin Panel](frontend/pages/ADMIN_PANEL.md) - Painel administrativo
- [Admin Dashboard](frontend/pages/ADMIN_DASHBOARD.md) - Dashboard e métricas
- [Explorar](frontend/pages/EXPLORAR.md) - Página de exploração

### Componentes
- [Search](frontend/components/SEARCH.md) - Sistema de busca
- [Maps](frontend/components/EXPLORAR_MAP.md) - Mapas interativos
- [Property Details](frontend/components/PROPERTY_CONDITIONAL_DISPLAY.md) - Detalhes de imóveis

📄 **Índice completo:** [Frontend README](frontend/README.md)

## 🎨 Features e Funcionalidades

Documentação de features em [`/docs/features/`](features/):

- [Sistema de Filtros](features/FILTROS_ATIVOS_README.md) - Filtros ativos e funcionamento
- [Análise de Filtros](features/ANALISE_FILTRO_LOCALIZACAO.md) - Análise do filtro de localização
- [Dashboard](features/DASHBOARD_DADOS_REAIS_README.md) - Painel administrativo
- [Design Premium](features/DESIGN_PREMIUM_FILTROS.md) - Interface e design
- [Guia de Filtros](features/FILTROS_ATIVOS_GUIA.md) - Guia de uso de filtros
- [Preview de Filtros](features/FILTROS_ATIVOS_PREVIEW.md) - Preview do sistema
- [Busca Manual](features/FILTROS_BUSCA_MANUAL.md) - Busca manual de imóveis
- [Filtros Corrigidos](features/FILTROS_CORRIGIDOS.md) - Correções implementadas

## 🧪 Testing

Documentação de testes em [`/docs/testing/`](testing/):

- [Relatório Final](testing/RELATORIO_FINAL_TESTES_FILTROS.md) - Relatório completo de testes
- [Teste Completo](testing/TESTE_COMPLETO_FILTROS.md) - Testes dos filtros
- [Teste Manual](testing/TESTE_FILTROS_MANUAL.md) - Guia de testes manuais

## 🐛 Troubleshooting

- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - **Solução de problemas comuns**

## 📁 Estrutura de Pastas

```
docs/
├── README.md                    # Este arquivo
├── GUIA_COMPLETO.md            # 📘 Documentação completa
├── IMPLEMENTACAO_COMPLETA.md   # Detalhes de implementação
├── TROUBLESHOOTING.md          # Solução de problemas
│
├── setup/                      # Guias de configuração
│   ├── GOOGLE_MAPS_SETUP.md
│   ├── DEPLOY_VERCEL_GERAL.md
│   └── DEPLOY_VERCEL_FRONTEND.md
│
├── features/                   # Documentação de features
│   ├── FILTROS_ATIVOS_README.md
│   ├── DASHBOARD_DADOS_REAIS_README.md
│   └── ...
│
├── testing/                    # Relatórios de testes
│   ├── RELATORIO_FINAL_TESTES_FILTROS.md
│   └── ...
│
├── frontend/                   # 🎨 Docs do frontend
│   ├── README.md               # Índice frontend
│   ├── pages/                  # Documentação de páginas
│   │   ├── ADMIN_PANEL.md
│   │   ├── ADMIN_DASHBOARD.md
│   │   └── ...
│   └── components/             # Documentação de componentes
│       ├── SEARCH.md
│       ├── EXPLORAR_MAP.md
│       └── ...
│
└── backend/                    # 🔧 Docs técnicos do backend
    ├── README.md               # Índice backend
    ├── SCRIPTS.md
    ├── SEED_DATA.md
    └── NEARBY_PLACES_SERVICE.md
```

## 🔗 Links Rápidos

### Essenciais
- 📘 [Documentação Completa](GUIA_COMPLETO.md)
- 🚀 [Quick Start Backend](../back/docs/QUICK_START.md)
- 📋 [Property Parameters](../back/docs/PROPERTY_PARAMETERS.md)
- 🐛 [Troubleshooting](TROUBLESHOOTING.md)

### Backend
- 🔧 [Scripts Backend](backend/SCRIPTS.md)
- 🗄️ [Seed Data](backend/SEED_DATA.md)
- 🗺️ [Nearby Places](backend/NEARBY_PLACES_SERVICE.md)

### Frontend
- 🎨 [Frontend Overview](frontend/README.md)
- 📊 [Admin Dashboard](frontend/pages/ADMIN_DASHBOARD.md)
- 🔍 [Sistema de Busca](frontend/components/SEARCH.md)

### Features
- 🔍 [Sistema de Filtros](features/FILTROS_ATIVOS_README.md)
- 📊 [Dashboard](features/DASHBOARD_DADOS_REAIS_README.md)
- 🗺️ [Google Maps](setup/GOOGLE_MAPS_SETUP.md)

### Deploy
- ☁️ [Deploy Geral (Backend + Frontend)](setup/DEPLOY_VERCEL_GERAL.md)
- 🎨 [Deploy Frontend](setup/DEPLOY_VERCEL_FRONTEND.md)
- 🔧 [Deploy Backend](../back/docs/DEPLOY_VERCEL_BACKEND.md)

---

💡 **Dica**: Comece pelo [GUIA_COMPLETO.md](GUIA_COMPLETO.md) para ter uma visão geral do projeto!
