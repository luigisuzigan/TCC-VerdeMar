# Nova Página Explorar - Sistema de Filtros Inteligente

## 🎯 Visão Geral

A página Explorar foi completamente reformulada com um sistema de filtros moderno e intuitivo, inspirado no Airbnb e em sites imobiliários premium.

## ✨ Funcionalidades Principais

### **1. Barra de Filtros no Topo (TopFiltersBar)**
- **Localização**: Ao clicar, abre o modal de localização com mapa interativo
- **Preço**: Abre modal com controles de faixa de preço
- **Tipo de Imóvel**: Seleção de múltiplos tipos (Casa, Apartamento, etc.)
- **Quartos e Banheiros**: Filtros rápidos
- **Mais Filtros**: Abre modal completo com todos os filtros
- **Buscar**: Campo de busca por endereço/bairro

### **2. Botão Flutuante Sticky (StickyFilterButton)**
Quando o usuário rola a página e a barra de filtros sai da tela:
- ✅ Aparece um botão flutuante no topo da página
- ✅ Mostra contador de filtros ativos
- ✅ Ao clicar, abre o modal de filtros completo
- ✅ Animação suave de entrada/saída

### **3. Modal de Filtros Completo (FiltersModal)**
Modal expansivo que ocupa a tela com todos os filtros:

#### **Filtros Disponíveis:**
- 📍 **Localização** - Integrado com mapa do Google Maps
- 💰 **Faixa de Preço** - Min/Max + opções rápidas
- 🏠 **Tipo de Imóvel** - Checkboxes para múltipla seleção
- 📐 **Área (m²)** - Min/Max
- 🛏️ **Quartos** - Botões 1+ até 5+
- 🚿 **Banheiros** - Botões 1+ até 4+
- 🚗 **Vagas de Garagem** - Botões 1+ até 4+
- ✨ **Comodidades** - Grid com múltiplas opções

#### **Ações do Modal:**
- **Limpar tudo**: Remove todos os filtros
- **Cancelar**: Fecha sem aplicar
- **Aplicar filtros**: Aplica e atualiza a listagem

### **4. Pills de Filtros Ativos (ActiveFilters)**
- Exibe todos os filtros aplicados
- Permite remover filtros individualmente
- Botão "Limpar tudo" para reset completo

### **5. Toggle Lista/Mapa**
- **Lista**: Grid de 3 colunas com cards de imóveis
- **Mapa**: Visualização interativa com markers

## 🎨 Design e UX

### **Cores e Estilo**
- **Primária**: Azul (#2563EB) - Filtros ativos e botões principais
- **Secundária**: Slate/Cinza - UI neutra
- **Hover States**: Transições suaves em todos os botões
- **Bordas Arredondadas**: 12px (rounded-xl) para visual moderno

### **Responsividade**
- 📱 **Mobile**: Filtros essenciais colapsados
- 💻 **Tablet/Desktop**: Barra completa de filtros inline
- 🖥️ **Desktop Grande**: Grid de 3 colunas

### **Animações**
- Sticky button com `slide-in-from-top`
- Hover com `scale-105` nos botões
- Transições suaves (`transition-all`)

## 🔧 Componentes Criados

### 1. **TopFiltersBar.jsx**
```jsx
<TopFiltersBar
  filters={filters}
  onFilterClick={handleFilterClick}
  onSearch={handleSearch}
/>
```

**Props:**
- `filters`: Objeto com filtros ativos
- `onFilterClick`: Callback quando clica em um filtro
- `onSearch`: Callback para busca por texto

### 2. **StickyFilterButton.jsx**
```jsx
<StickyFilterButton
  onClick={() => setShowFiltersModal(true)}
  filterCount={activeFiltersCount}
/>
```

**Props:**
- `onClick`: Callback ao clicar no botão
- `filterCount`: Número de filtros ativos (badge)

### 3. **FiltersModal.jsx**
```jsx
<FiltersModal
  isOpen={showFiltersModal}
  onClose={() => setShowFiltersModal(false)}
  filters={filters}
  onApplyFilters={applyFilters}
/>
```

**Props:**
- `isOpen`: Controla visibilidade do modal
- `onClose`: Callback para fechar
- `filters`: Filtros atuais
- `onApplyFilters`: Callback com novos filtros

## 📋 Fluxo de Uso

### **Cenário 1: Usuário Inicia Busca**
1. Entra na página Explorar
2. Vê a barra de filtros no topo
3. Clica em "Localização" → Abre mapa interativo
4. Seleciona área no mapa ou digita cidade
5. Clica em "Preço" → Define faixa
6. Clica em "Buscar" → Atualiza resultados

### **Cenário 2: Usuário Explora Resultados**
1. Rola a página para ver imóveis
2. Barra de filtros sai da tela
3. **Botão flutuante aparece no topo**
4. Usuário clica no botão flutuante
5. Modal completo abre com todos os filtros
6. Ajusta filtros avançados
7. Clica "Aplicar filtros"
8. Modal fecha e lista atualiza

### **Cenário 3: Ajuste Rápido**
1. Vê pills de filtros ativos
2. Clica no X de um filtro específico
3. Filtro removido instantaneamente
4. Lista atualiza automaticamente

## 🔄 Sincronização com URL

Todos os filtros são sincronizados com a URL:
```
/explorar?location=Florianópolis&priceMin=500000&priceMax=1000000&bedrooms=3
```

**Benefícios:**
- ✅ Compartilhamento de buscas
- ✅ Bookmarks funcionam
- ✅ Navegação back/forward preserva filtros

## 🚀 Performance

- **Lazy Loading**: Filtros modais só renderizam quando abertos
- **Debounce**: Busca por texto com debounce de 300ms
- **Scroll Optimization**: Listener de scroll otimizado com cleanup
- **Ref API**: Uso de `useRef` para detecção de scroll eficiente

## 🎯 Próximos Passos

- [ ] Adicionar filtros de "Favoritos"
- [ ] Salvar buscas do usuário
- [ ] Histórico de filtros recentes
- [ ] Sugestões automáticas na busca
- [ ] Filtros por bairro com autocomplete
- [ ] Integração com backend para contagem de resultados por filtro

## 📸 Screenshots

### Estado Inicial
- Barra de filtros limpa no topo
- Campo de busca à esquerda
- Filtros principais inline
- Botão "Mais filtros"

### Após Scroll
- Botão flutuante com badge de contagem
- Posicionado centralmente no topo
- Sombra e animação de entrada

### Modal de Filtros
- Grid 2 colunas responsivo
- Todos os filtros visíveis
- Footer fixo com ações
- Scroll interno se necessário

---

**Desenvolvido com ❤️ usando React, Tailwind CSS e Headless UI**
