# 🏡 Sistema de Busca de Imóveis VerdeMar

Sistema completo de busca e filtragem de imóveis para venda, com interface moderna e intuitiva.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Tecnologias](#tecnologias)
- [Como Usar](#como-usar)
- [Documentação](#documentação)
- [Próximos Passos](#próximos-passos)

## 🎯 Visão Geral

Sistema de busca de imóveis com:
- **QuickSearch** na home page (4 filtros principais + avançados)
- **Página Explorar** com filtros laterais e grid de resultados
- **Sincronização automática** entre filtros e URL
- **Design responsivo** (desktop, tablet, mobile)
- **Filtros avançados** estilo Airbnb

### Fluxo Principal

```
Home Page → QuickSearch → Explorar (com filtros) → Detalhes do Imóvel
```

## ✨ Funcionalidades

### 🔍 Busca Rápida (QuickSearch)

Localizada na home page, permite busca rápida com:

1. **Tipo do Imóvel** - 9 tipos disponíveis (Casa, Apartamento, etc.)
2. **Local** - Busca por cidade com Google Maps (planejado)
3. **Faixa de Preço** - Slider dual R$ 0 - R$ 5.000.000
4. **Tamanho (m²)** - Slider dual 0 - 500 m²
5. **Mais Filtros** - Modal completo com todos os filtros

### 🎛️ Filtros Avançados

Modal completo com:
- **Quartos**: 1, 2, 3, 4, 5+
- **Banheiros**: 1, 2, 3, 4+
- **Vagas de Garagem**: 0, 1, 2, 3, 4+
- **Suítes**: 0, 1, 2, 3+
- **10 Comodidades do Imóvel** (sacada, churrasqueira, vista mar, etc.)
- **11 Comodidades do Condomínio** (piscina, academia, portaria, etc.)
- **Estado do Imóvel**: Novo, Seminovo, Usado, A reformar

### 📱 Página Explorar

#### Desktop (≥1024px)
- **Sidebar lateral** com todos os filtros
- **Grid de 3 colunas** de imóveis
- **Ordenação** por preço, área, data
- **Filtros ativos** exibidos no topo (removíveis)

#### Mobile (<1024px)
- **Botão flutuante** verde no canto inferior direito
- **Modal bottom sheet** com filtros
- **Badge** mostrando quantidade de filtros ativos
- **Grid de 1 coluna** adaptado

### 🏠 Card de Imóvel

Cada card exibe:
- Imagem principal com hover effect
- Badge do tipo de imóvel
- Botão de favoritar
- Título do imóvel
- Localização com ícone
- Detalhes (quartos, banheiros, área)
- Preço em destaque
- Avaliação (estrelas)

Ao clicar, navega para `/property/:id`

## 📁 Estrutura de Arquivos

### Componentes Criados

```
front/src/
├── components/
│   ├── Search/
│   │   ├── QuickSearch.jsx              # Busca rápida da home
│   │   └── Modals/
│   │       ├── PropertyTypeModal.jsx    # Modal de tipos
│   │       ├── LocationModal.jsx        # Modal de localização
│   │       ├── PriceRangeModal.jsx      # Modal de preço
│   │       ├── AreaModal.jsx            # Modal de área
│   │       └── AdvancedFiltersModal.jsx # Modal filtros avançados
│   └── Explorar/
│       ├── MobileFilters.jsx            # Modal de filtros mobile
│       └── ActiveFilters.jsx            # Pills de filtros ativos
│
├── pages/
│   └── Explorar/
│       ├── index.jsx                    # Página principal
│       └── README.md                    # Documentação da página
│
├── utils/
│   └── filterHelpers.js                 # Funções utilitárias
│
└── styles/
    └── slider-custom.css                # Estilos customizados
```

### Documentação

```
/
├── BACKEND_INTEGRATION.md    # Integração com backend
├── USAGE_EXAMPLES.md          # Exemplos de uso
└── front/src/
    └── components/Search/
        └── README.md          # Documentação do QuickSearch
```

## 🛠️ Tecnologias

### Frontend
- **React 18** - Framework principal
- **React Router DOM v6** - Roteamento e query params
- **TailwindCSS** - Estilização
- **Headless UI** - Modais acessíveis
- **Lucide React** - Ícones
- **rc-slider** - Sliders de range

### Backend (Integração Planejada)
- **Node.js + Express** ou **Next.js API Routes**
- **Prisma ORM** - Banco de dados
- **PostgreSQL** ou **MongoDB** - Persistência

### Futuro
- **Google Maps API** - Mapas e localização
- **React Query** - Cache e gerenciamento de estado
- **Framer Motion** - Animações

## 🚀 Como Usar

### 1. Instalação

```bash
cd front
npm install
```

### 2. Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### 3. Testar Busca

1. Vá para a home page
2. Use o QuickSearch para definir filtros
3. Clique em "Buscar"
4. Você será redirecionado para `/explorar` com os filtros aplicados

### 4. Ajustar Filtros

Na página Explorar:
- **Desktop**: Use a sidebar lateral
- **Mobile**: Clique no botão flutuante verde

Filtros atualizam a URL e resultados automaticamente.

### 5. Remover Filtros

- Clique no **X** em cada pill de filtro ativo
- Ou clique em **"Limpar todos"** para resetar tudo

## 📚 Documentação

### Documentos Principais

1. **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)**
   - Especificação completa da API
   - Query parameters esperados
   - Formato de resposta
   - Exemplo de implementação (Node.js/Prisma)
   - Schema do banco de dados

2. **[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)**
   - Cenários de busca reais
   - Exemplos de código
   - Fluxos do usuário
   - Checklist de testes
   - Troubleshooting

3. **[front/src/components/Search/README.md](./front/src/components/Search/README.md)**
   - Documentação do QuickSearch
   - Como integrar o Google Maps
   - Próximos passos

4. **[front/src/pages/Explorar/README.md](./front/src/pages/Explorar/README.md)**
   - Documentação da página Explorar
   - Gestão de filtros
   - Customização

### Funções Úteis

#### filterHelpers.js

```javascript
// Converter URL params em filtros
parseFiltersFromUrl(searchParams)

// Converter filtros em URL params
filtersToUrlParams(filters)

// Gerar descrições legíveis
getFilterDescriptions(filters)

// Contar filtros ativos
countActiveFilters(filters)

// Limpar todos os filtros
clearAllFilters()
```

## 🎨 Design

### Cores Principais
- **Primary**: Emerald 600 (`#059669`)
- **Hover**: Emerald 700 (`#047857`)
- **Background**: White / Slate 50
- **Border**: Slate 200
- **Text**: Slate 900 / Slate 600

### Breakpoints
- **Mobile**: < 768px (1 coluna)
- **Tablet**: 768px - 1279px (2 colunas)
- **Desktop**: ≥ 1280px (3 colunas + sidebar)

### Componentes UI
- Modais: Headless UI Dialog
- Sliders: rc-slider customizado
- Cards: Hover effects e shadows
- Botões: Rounded-lg com transitions

## 🔄 Próximos Passos

### Curto Prazo (Essencial)

- [ ] **Conectar com Backend**
  - Implementar endpoint `/properties`
  - Suportar todos os filtros
  - Adicionar paginação

- [ ] **Paginação**
  - Infinite scroll ou botão "Carregar mais"
  - Mostrar total de páginas

- [ ] **Loading & Error States**
  - Skeleton loaders refinados
  - Mensagens de erro amigáveis
  - Retry automático

### Médio Prazo (Importante)

- [ ] **Google Maps Integration**
  - Autocomplete de localização
  - Visualização em mapa
  - Markers clicáveis

- [ ] **Favoritos**
  - Sistema de salvamento
  - Lista de favoritos
  - Persistência (localStorage/backend)

- [ ] **Busca Salva**
  - Salvar combinações de filtros
  - Nomear buscas
  - Alertas de novos imóveis

### Longo Prazo (Melhorias)

- [ ] **SEO**
  - Meta tags dinâmicas
  - URLs amigáveis
  - Schema markup

- [ ] **Analytics**
  - Rastrear buscas populares
  - Filtros mais usados
  - Taxa de conversão

- [ ] **Compartilhamento**
  - Gerar links curtos
  - Compartilhar em redes sociais
  - WhatsApp integration

- [ ] **Performance**
  - React Query para cache
  - Lazy loading de imagens
  - Code splitting

- [ ] **Acessibilidade**
  - Screen reader support
  - Navegação por teclado
  - WCAG AA compliance

## 🧪 Testes

### Checklist Manual

- [x] QuickSearch abre todos os modais
- [x] Filtros sincronizam com URL
- [x] Navegação para /explorar funciona
- [x] Sidebar de filtros (desktop)
- [x] Modal de filtros (mobile)
- [x] Filtros ativos removíveis
- [x] Ordenação funciona
- [x] Grid responsivo
- [x] Cards navegam para detalhes
- [ ] API retorna resultados corretos
- [ ] Paginação funciona
- [ ] Performance com 100+ imóveis

### Testes Automatizados (Futuro)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é parte do TCC VerdeMar.

## 👥 Equipe

- Desenvolvido para o projeto VerdeMar
- Sistema de busca de imóveis para venda

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a documentação em `/docs`
2. Verifique os exemplos em `USAGE_EXAMPLES.md`
3. Revise a integração em `BACKEND_INTEGRATION.md`

---

**Versão**: 1.0.0  
**Última atualização**: Janeiro 2025  
**Status**: ✅ Frontend completo | ⏳ Aguardando integração backend
