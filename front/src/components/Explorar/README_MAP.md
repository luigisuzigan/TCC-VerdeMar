# Mapa Interativo - Explorar Imóveis

## 🗺️ Funcionalidades Implementadas

### 1. **Botão Draw (Desenhar no Mapa)**
- Clique em "Draw" para ativar o modo de desenho
- **3 ferramentas de desenho disponíveis**:
  - **Polígono** (✏️): Desenhe formas personalizadas clicando em vários pontos
  - **Retângulo** (◻️): Desenhe áreas retangulares
  - **Círculo** (⭕): Desenhe áreas circulares
  
- **Recursos**:
  - Formas editáveis após desenhar (arrastar pontos)
  - Cor verde (#059669) com transparência
  - Botão "Clear Boundary" para limpar todos os desenhos
  - Pode desenhar múltiplas formas ao mesmo tempo

### 2. **Painel Layers (Camadas)**
Acesse clicando no botão "Layers" no canto superior direito.

#### **Map Style (Estilo do Mapa)**
3 opções visuais:
- **Street** 🗺️: Mapa de ruas tradicional
- **Data** 🏞️: Mapa com relevo/terreno
- **Satellite** 🛰️: Vista de satélite

#### **Neighborhoods (Bairros)**
- Toggle para mostrar/ocultar limites de bairros
- Útil para identificar zonas específicas

#### **Schools (Escolas)**
Filtros avançados em 2 categorias:

**Nível de Ensino:**
- Elementary (Fundamental I)
- Middle (Fundamental II)
- High (Ensino Médio)

**Tipo de Escola:**
- Public (Pública)
- Private (Particular)
- Charter (Especial)

**Como usar:**
1. Ative o toggle "Schools"
2. Selecione os filtros desejados (clique para ativar/desativar)
3. Escolas correspondentes aparecem no mapa
4. Clique em "Clear All" para limpar todos os filtros
5. Clique em "Done" para fechar o painel

### 3. **Toggle Lista/Mapa**
Alterne entre:
- **Lista** 📋: Grid de cards com imóveis
- **Mapa** 🗺️: Visualização geográfica com marcadores

### 4. **Marcadores de Propriedades**
- Círculos verdes indicam localização dos imóveis
- Clique em um marcador para ir aos detalhes do imóvel
- Apenas imóveis com latitude/longitude aparecem no mapa

### 5. **Controles do Mapa**
- **Zoom +/-**: Botões no canto inferior direito
- **Fullscreen**: Botão nativo do Google Maps
- **Street View**: Disponível quando habilitado
- **Arrastar**: Clique e arraste para mover o mapa

## 🎨 Interface

### Draw Mode (Modo Desenho)
```
┌─────────────────────────────────────┐
│ [Draw]  [✏️] [◻️] [⭕] [🗑️]        │
│                                     │
│         MAPA INTERATIVO             │
│                                     │
│  Clique no mapa para desenhar       │
└─────────────────────────────────────┘
```

### Layers Panel (Painel de Camadas)
```
┌──────────────────────┐
│ Layers               │
├──────────────────────┤
│ Map Style            │
│ [Street][Data][Sat]  │
│                      │
│ Neighborhoods   [🔘] │
│                      │
│ Schools         [🔘] │
│ ├─ Elementary        │
│ ├─ Middle            │
│ ├─ High              │
│ │                    │
│ ├─ Public            │
│ ├─ Private           │
│ └─ Charter           │
│                      │
│ [Clear All]          │
│ [Done]               │
└──────────────────────┘
```

## 🔧 Dependências

```json
{
  "@react-google-maps/api": "^2.20.7",
  "lucide-react": "^0.513.0"
}
```

## 📍 Configuração

### Variável de Ambiente
Adicione no `.env`:
```
VITE_GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### APIs Necessárias no Google Cloud
1. Maps JavaScript API
2. **Drawing Library** (para desenhar)
3. **Places API** (para autocomplete - futuro)

## 🚀 Como Usar

### No Explorar
1. Acesse `/explorar`
2. Clique no botão **"Mapa"** no canto superior direito
3. Use os controles:
   - **Draw**: Desenhe áreas de interesse
   - **Layers**: Altere estilo e filtros
   - **Marcadores**: Clique para ver detalhes

### Fluxo de Trabalho Típico
```
1. Abrir página Explorar
   ↓
2. Clicar em "Mapa"
   ↓
3. (Opcional) Desenhar área de busca
   ↓
4. (Opcional) Ativar camadas (bairros, escolas)
   ↓
5. Clicar em marcadores para ver imóveis
   ↓
6. Ir para PropertyDetails
```

## 🎯 Casos de Uso

### 1. Buscar por Região Específica
- Desenhe um polígono na área desejada
- Sistema filtra imóveis dentro da forma (futuro)

### 2. Procurar Perto de Escolas
- Ative o toggle "Schools"
- Selecione nível e tipo
- Veja escolas no mapa
- Imóveis próximos ficam destacados

### 3. Explorar Bairros
- Ative "Neighborhoods"
- Limites dos bairros aparecem
- Identifique zonas específicas

### 4. Comparar Vista Satélite
- Troque para "Satellite"
- Veja foto aérea real
- Identifique praias, vegetação, infraestrutura

## 💡 Dicas

1. **Desenho Preciso**: Use zoom alto antes de desenhar
2. **Múltiplas Formas**: Desenhe várias áreas para comparar
3. **Edição**: Após desenhar, arraste os pontos para ajustar
4. **Limpar Rápido**: Use "Clear Boundary" para começar de novo
5. **Vista Híbrida**: Satellite mostra ruas + foto aérea

## 🔮 Futuras Melhorias

- [ ] Filtrar imóveis dentro das formas desenhadas
- [ ] Salvar desenhos no perfil do usuário
- [ ] Marcar escolas reais da API do Google
- [ ] Heatmap de preços
- [ ] Clusters de marcadores para muitos imóveis
- [ ] Informações de trânsito em tempo real
- [ ] Calcular distância até pontos de interesse

---

**Criado em**: $(date)
**Status**: ✅ Funcionando - Pronto para uso!
