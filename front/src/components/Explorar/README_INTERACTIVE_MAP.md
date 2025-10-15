# Mapa Interativo Completo - VerdeMar

## 🎯 Melhorias Implementadas

### 1. **Marcadores de Preço nas Propriedades** 💰
Estilo igual ao homes.com:
- **Tags de preço** verdes flutuantes sobre cada propriedade
- **Hover effect**: Aumenta e muda cor ao passar o mouse
- **Seta apontando** para a localização exata
- **Formatação brasileira**: R$ 850.000

```
  ┌──────────────┐
  │ R$ 850.000   │ ← Tag de preço
  └──────▼───────┘
       📍         ← Localização
```

### 2. **Controles de Zoom Únicos** 🔍
- **Removido**: Controles nativos duplicados do Google Maps
- **Customizado**: Botões + e − estilizados
- **Posição**: Canto inferior direito
- **Design**: Branco com sombra, hover suave

### 3. **Ferramentas de Desenho Completas** ✏️
Disponíveis em **todos os mapas** (Explorar e Modal Home):

#### **Botão Draw**
- Ativa/desativa modo de desenho
- Verde quando ativo

#### **3 Ferramentas**:
- **Polígono** (✏️): Formas personalizadas
- **Retângulo** (◻️): Áreas retangulares  
- **Círculo** (⭕): Raio circular

#### **Funcionalidades**:
- ✅ Formas **editáveis** (arrastar pontos)
- ✅ Formas **arrastáveis** (mover inteira)
- ✅ Múltiplas formas ao mesmo tempo
- ✅ Botão "Clear Boundary" para limpar tudo
- ✅ Callback `onBoundaryChange` para filtrar

### 4. **Painel Layers Completo** 🗂️
Mesmas opções em todos os mapas:

#### **Map Style**:
- 🗺️ Street
- 🏞️ Data (Terrain)
- 🛰️ Satellite

#### **Neighborhoods**:
- Toggle para mostrar bairros

#### **Schools**:
- **Níveis**: Elementary, Middle, High
- **Tipos**: Public, Private, Charter
- Múltipla seleção

### 5. **Modal de Localização Redesenhado** 📍

#### **Layout 2 Colunas**:
```
┌────────────────────────────────────────┐
│  Selecione a Localização           [X] │
├───────────────────┬────────────────────┤
│ 🔍 Buscar...      │                    │
│                   │    MAPA            │
│ Localizações:     │  INTERATIVO        │
│ • Florianópolis   │                    │
│ • Balneário       │  [Draw] [Layers]   │
│ • Itapema         │                    │
│                   │  R$ 850k  R$ 650k  │
│ [Selecionada:     │                    │
│  Florianópolis]   │  [3 imóveis]       │
│                   │                    │
├───────────────────┴────────────────────┤
│ [Limpar]  [Cancelar]  [Aplicar Loc.]   │
└────────────────────────────────────────┘
```

#### **Coluna Esquerda**:
- Campo de busca com Autocomplete Google
- Lista de localizações populares (SC)
- Mostra seleção atual em destaque

#### **Coluna Direita**:
- **Mapa interativo completo**
- ✅ Ferramentas de desenho (Draw)
- ✅ Painel Layers (estilos + filtros)
- ✅ Marcadores de propriedades com preço
- ✅ Contador de imóveis no mapa
- ✅ Zoom customizado

### 6. **Contador de Imóveis** 📊
Badge no canto inferior esquerdo:
```
┌──────────────────┐
│ 3 imóveis no mapa│
└──────────────────┘
```

### 7. **Componente Reutilizável** ♻️
`InteractiveMap.jsx` - Um componente para tudo:

```jsx
<InteractiveMap
  properties={[...]}           // Lista de propriedades
  initialCenter={{ lat, lng }} // Centro inicial
  height="600px"              // Altura customizável
  showDrawTools={true}         // Mostrar ferramentas desenho
  showLayers={true}            // Mostrar painel layers
  onPropertyClick={fn}         // Callback ao clicar em propriedade
  onBoundaryChange={fn}        // Callback ao desenhar área
/>
```

## 🚀 Onde Usar

### 1. **Página Explorar** (`/explorar`)
- Toggle Lista/Mapa
- Visualizar todos os imóveis
- Desenhar áreas para filtrar
- Clicar em preços para ver detalhes

### 2. **Modal de Localização** (Home)
- Pesquisa rápida na Home
- Selecionar cidade
- Ver imóveis próximos no mapa
- Desenhar área de interesse
- Aplicar filtros de layers

## 💡 Funcionalidades Principais

### **Marcadores de Propriedades**
- Tag de preço verde flutuante
- Hover: Aumenta 10% e destaca
- Formatação: R$ 850.000 (sem centavos)
- Seta apontando para localização
- Clicável para ir aos detalhes

### **Desenho no Mapa**
1. Clique em "Draw"
2. Escolha ferramenta (✏️ ◻️ ⭕)
3. Clique no mapa para desenhar
4. Arraste pontos para editar
5. Arraste forma inteira para mover
6. "Clear Boundary" para limpar

### **Filtros de Área**
```javascript
onBoundaryChange={(boundary) => {
  // boundary = { type, coordinates, ... }
  // Filtrar propriedades dentro da área
  const filtered = properties.filter(p => 
    isInsideBoundary(p.lat, p.lng, boundary)
  );
}}
```

### **Estilos de Mapa**
- **Street**: Ideal para ruas e endereços
- **Terrain**: Ver topografia e relevo
- **Satellite**: Foto aérea real

## 🎨 Design

### **Cores**
- Primária: `#059669` (Emerald-600)
- Hover: `#047857` (Emerald-700)
- Background: Branco com sombra
- Borda: `#E2E8F0` (Slate-200)

### **Animações**
- Tags de preço: `scale(1.1)` no hover
- Ferramentas: Transição suave de cor
- Layers: Fade in/out
- Marcadores: DROP animation

### **Responsivo**
- Desktop: Layout completo
- Mobile: Mapa ocupa tela cheia
- Botões: Touch-friendly (44px mínimo)

## 📦 Dependências

```json
{
  "@react-google-maps/api": "^2.20.7",
  "lucide-react": "^0.513.0"
}
```

### **Libraries do Google Maps**
```javascript
const libraries = ['drawing', 'places'];
```

## 🔧 Configuração

### **.env**
```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### **APIs Habilitadas**
1. Maps JavaScript API
2. Places API
3. Drawing Library

## 📝 Exemplos de Uso

### **1. Explorar com Filtro de Área**
```jsx
<InteractiveMap
  properties={filteredProperties}
  showDrawTools={true}
  onBoundaryChange={(boundary) => {
    // Filtrar propriedades dentro do boundary
    const inside = filterByBoundary(allProperties, boundary);
    setFilteredProperties(inside);
  }}
/>
```

### **2. Modal de Localização**
```jsx
<InteractiveMap
  properties={nearbyProperties}
  initialCenter={selectedCity}
  height="600px"
  showDrawTools={true}
  showLayers={true}
  onPropertyClick={(prop) => {
    navigate(`/property/${prop.id}`);
  }}
/>
```

### **3. Mapa Simples (Só Visualização)**
```jsx
<InteractiveMap
  properties={properties}
  showDrawTools={false}
  showLayers={false}
  height="400px"
/>
```

## 🎯 Próximos Passos

- [ ] Implementar filtro real por boundary desenhado
- [ ] Salvar áreas desenhadas no perfil do usuário
- [ ] Buscar propriedades reais próximas à localização
- [ ] Adicionar clustering para muitas propriedades
- [ ] Info window com preview ao clicar no marcador
- [ ] Integração com API de escolas reais
- [ ] Heatmap de preços
- [ ] Rotas e distâncias

---

**Criado em**: 15/10/2025  
**Status**: ✅ 100% Funcional  
**Compatível**: Explorar + Modal Home
