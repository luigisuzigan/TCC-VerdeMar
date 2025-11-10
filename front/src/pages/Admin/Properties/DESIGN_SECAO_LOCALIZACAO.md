# 🗺️ Design da Seção de Localização

## 📋 Layout Proposto

```
┌─────────────────────────────────────────────────────────────────┐
│              📍 LOCALIZAÇÃO COMPLETA                             │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🏠 Endereço Completo (Opcional)                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Rua das Palmeiras, 123 - Apto 501                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│  💡 Informe rua, número e complemento                           │
│                                                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  📍 Cidade, Bairro e Estado *                                    │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐   │
│  │ Cidade *         │ │ Bairro           │ │ Estado (UF) *│   │
│  │ Balneário        │ │ Centro           │ │ SC           │   │
│  │ Camboriú         │ │                  │ │              │   │
│  └──────────────────┘ └──────────────────┘ └──────────────┘   │
│                                                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  🌍 País e CEP *                                                 │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │ País *                      │ │ CEP *                   │   │
│  │ Brasil                      │ │ 88330-000               │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🔍 BUSCAR ENDEREÇO AUTOMATICAMENTE                         │ │
│  │                                                             │ │
│  │ ┌───────────────────────────────┐  ┌──────────────────┐  │ │
│  │ │ Digite o CEP: 88330-000       │  │ 🔍 Buscar CEP   │  │ │
│  │ └───────────────────────────────┘  └──────────────────┘  │ │
│  │                                                             │ │
│  │ 💡 Preenche automaticamente: Cidade, Bairro, Estado, e     │ │
│  │    busca as coordenadas GPS                                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  🗺️ Coordenadas GPS (Opcional)                                  │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │ Latitude                    │ │ Longitude               │   │
│  │ -26.9906                    │ │ -48.6480                │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🌐 BUSCAR COORDENADAS AUTOMATICAMENTE                      │ │
│  │                                                             │ │
│  │ ┌────────────────────────────────────────────────────────┐│ │
│  │ │ 📍 Endereço Completo ou Cidade                        ││ │
│  │ │ Rua das Palmeiras, 123, Balneário Camboriú - SC       ││ │
│  │ └────────────────────────────────────────────────────────┘│ │
│  │                                                             │ │
│  │ [🔍 Buscar Coordenadas]  [🗑️ Limpar Coordenadas]          │ │
│  │                                                             │ │
│  │ 💡 Usa Google Maps Geocoding para buscar latitude e        │ │
│  │    longitude baseado no endereço informado                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  🗺️ VISUALIZAÇÃO NO MAPA                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                             │ │
│  │                    🗺️ GOOGLE MAPS                          │ │
│  │                                                             │ │
│  │         ┌───────────────────────────────┐                  │ │
│  │         │                               │                  │ │
│  │         │        🌊 Oceano              │                  │ │
│  │         │                               │                  │ │
│  │         │            📍 Imóvel          │  Zoom: [+] [-]  │ │
│  │         │         (Lat, Long)           │                  │ │
│  │         │                               │  [🔄 Atualizar] │ │
│  │         │     🏢 Cidade                 │                  │ │
│  │         │                               │  [📍 Meu Local] │ │
│  │         └───────────────────────────────┘                  │ │
│  │                                                             │ │
│  │  Altura: 300px (responsivo)                                │ │
│  │  Marcador: Pin vermelho na localização exata              │ │
│  │  Interativo: Zoom, Pan, Street View                        │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 💡 DICA: O mapa será atualizado automaticamente quando     │ │
│  │ você preencher as coordenadas GPS ou buscar pelo endereço  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 O que você quer:

### ✅ ESTRUTURA EM UM ÚNICO BLOCO/CARD
- **Tudo dentro do mesmo card branco** com borda
- **Título da seção centralizado** no topo: "📍 LOCALIZAÇÃO COMPLETA"
- Campos organizados verticalmente com divisores

### 📝 ORDEM DOS CAMPOS:

1. **🏠 Endereço Completo** (opcional, full width)
   - Input simples
   - Helper: "Informe rua, número e complemento"

2. **📍 Cidade, Bairro e Estado** (obrigatório, 3 colunas)
   - Cidade * (obrigatório)
   - Bairro (opcional)
   - Estado/UF * (obrigatório, auto uppercase, max 2 chars)

3. **🌍 País e CEP** (obrigatório, 2 colunas)
   - País * (obrigatório)
   - CEP * (obrigatório)

4. **🔍 BOX: BUSCAR ENDEREÇO AUTOMATICAMENTE**
   - Input para CEP
   - Botão "🔍 Buscar CEP"
   - **Funcionalidade**: 
     - Chama API ViaCEP
     - Auto-preenche: Cidade, Bairro, Estado
     - Depois chama Google Maps Geocoding para buscar coordenadas
   - Info: "Preenche automaticamente cidade, bairro, estado e coordenadas"

5. **🗺️ Coordenadas GPS** (opcional, 2 colunas)
   - Latitude (input number, step="any")
   - Longitude (input number, step="any")

6. **🌐 BOX: BUSCAR COORDENADAS AUTOMATICAMENTE**
   - Input para endereço completo (pega o que já foi preenchido)
   - Botão "🔍 Buscar Coordenadas"
   - Botão "🗑️ Limpar Coordenadas"
   - **Funcionalidade**:
     - Usa Google Maps Geocoding API
     - Busca lat/long baseado no endereço
     - Preenche automaticamente os campos
   - Info: "Usa Google Maps para buscar latitude e longitude"

7. **🗺️ VISUALIZAÇÃO NO MAPA** (preview do Google Maps)
   - Mini mapa embutido (300px altura)
   - Marcador vermelho na posição do imóvel
   - Controles de zoom (+/-)
   - Botão "🔄 Atualizar Mapa"
   - Botão "📍 Usar Minha Localização"
   - **Atualiza automaticamente** quando:
     - Preenche lat/long manualmente
     - Clica em "Buscar Coordenadas"
     - Clica em "Buscar CEP"

## 🎯 COMO FUNCIONA:

### 🔍 Buscar por CEP (API ViaCEP):
1. Usuário digita CEP: `88330-000`
2. Clica em "🔍 Buscar CEP"
3. **Sistema faz**:
   - Chama `https://viacep.com.br/ws/88330000/json/`
   - Auto-preenche: Cidade, Bairro, Estado
   - Depois chama Google Maps Geocoding com o endereço
   - Auto-preenche: Latitude, Longitude
   - Atualiza o mapa automaticamente
4. **Feedback visual**: Loading spinner + Toast "✅ Endereço encontrado!"

### 🌐 Buscar Coordenadas por Endereço (Google Maps Geocoding):
1. Sistema monta endereço completo: `Rua das Palmeiras, 123, Balneário Camboriú - SC, Brasil`
2. Clica em "🔍 Buscar Coordenadas"
3. **Sistema faz**:
   - Chama Google Maps Geocoding API
   - Retorna: Latitude, Longitude
   - Preenche campos automaticamente
   - Move o marcador no mapa
4. **Feedback visual**: Loading spinner + Toast "✅ Coordenadas encontradas!"

### 🗺️ Mini Mapa do Google Maps:
- **Componente**: `<GoogleMap>` embedded
- **Props**:
  - center: { lat: -26.9906, lng: -48.6480 }
  - zoom: 15
  - marker: Pin vermelho na localização
- **Interações**:
  - Zoom in/out
  - Pan (arrastar)
  - Clique no mapa → atualiza coordenadas
  - Botão "📍 Usar Minha Localização" → pega GPS do navegador
- **Atualização automática**:
  - Quando lat/long mudam
  - Quando busca por CEP
  - Quando busca por endereço

## 🎨 Estilo Visual:

```css
TÍTULO DA SEÇÃO:
- Fonte: 32px
- Weight: 700 (extra bold)
- Cor: Gradiente emerald → green
- Padding: 1.5rem
- Border-bottom: 2px gradient
- Centralizado

CARD PRINCIPAL:
- Fundo: branco
- Border: 2px cinza
- Shadow: lg com emerald glow
- Border-radius: 20px
- Padding: 2rem

DIVISORES:
- Border-top: 1px cinza claro
- Margin: 1.5rem vertical

BOXES DE BUSCA (ViaCEP + Google Maps):
- Fundo: azul claro (#F0F9FF)
- Border: 2px azul (#3B82F6)
- Border-radius: 16px
- Padding: 1.5rem
- Ícone: 🔍 grande (24px)
- Botões: azul vibrante com hover escuro

MINI MAPA:
- Altura: 300px
- Border: 2px emerald
- Border-radius: 16px
- Shadow: lg
- Loading state: Skeleton cinza pulsante
- Controles customizados (botões)

LABELS & BADGES:
- Obrigatório (*): vermelho vibrante
- Opcional: cinza suave
- Helper texts: slate-500, 14px
- Ícones de info: 16px, slate-400

INPUTS:
- Border: 2px slate-300
- Border-radius: 12px
- Padding: 12px 16px
- Focus: ring emerald-500
- Font-size: 14px

BOTÕES:
- "Buscar CEP": azul (#3B82F6)
- "Buscar Coordenadas": azul (#3B82F6)
- "Limpar Coordenadas": vermelho (#EF4444)
- "Atualizar Mapa": emerald (#10B981)
- "Minha Localização": amber (#F59E0B)
- Todos com hover: escurecer 10%

FEEDBACK VISUAL:
- Loading: Spinner azul + "Buscando..."
- Sucesso: Toast verde + "✅ Encontrado!"
- Erro: Toast vermelho + "❌ Não encontrado"
- Coordenadas preenchidas: Border verde nos inputs
```

## 📦 Agrupamento Visual:

```
1️⃣ GRUPO: ENDEREÇO FÍSICO
   └─ Endereço Completo (full width)

2️⃣ GRUPO: LOCALIZAÇÃO BÁSICA  
   └─ Cidade + Bairro + Estado (3 cols)

3️⃣ GRUPO: REGIÃO
   └─ País + CEP (2 cols)

4️⃣ BOX: BUSCA AUTOMÁTICA POR CEP
   └─ Input CEP + Botão Buscar

5️⃣ GRUPO: COORDENADAS GPS
   └─ Latitude + Longitude (2 cols)

6️⃣ BOX: BUSCA AUTOMÁTICA DE COORDENADAS
   └─ Input Endereço + Botões (Buscar + Limpar)

7️⃣ MAPA: VISUALIZAÇÃO
   └─ Google Maps embedded com marcador
```

## 🚀 Funcionalidades Avançadas:

### 1. **Auto-preenchimento inteligente**:
- Usuário digita CEP → Sistema preenche tudo
- Sistema monta endereço automaticamente
- Não precisa digitar nada manualmente

### 2. **Validação em tempo real**:
- CEP inválido → Border vermelha + erro
- Coordenadas fora do Brasil → Aviso
- Campos obrigatórios vazios → Destaque

### 3. **Feedback visual rico**:
- Loading spinners
- Toast notifications
- Borders coloridas (verde = preenchido, vermelho = erro)
- Mapa atualiza com animação

### 4. **Responsividade**:
- Desktop: 3 colunas → 2 colunas → full width
- Mobile: Tudo empilhado (1 coluna)
- Mapa: 300px altura em todos os tamanhos

### 5. **Acessibilidade**:
- Botão "📍 Usar Minha Localização" → Pede permissão GPS
- Se negar, mostra mensagem amigável
- Se permitir, preenche coordenadas automaticamente

## 🔗 APIs Necessárias:

### 1. **ViaCEP API** (grátis, sem limite)
```
GET https://viacep.com.br/ws/{cep}/json/
Retorna: {
  "cep": "88330-000",
  "logradouro": "Rua das Palmeiras",
  "bairro": "Centro",
  "localidade": "Balneário Camboriú",
  "uf": "SC"
}
```

### 2. **Google Maps Geocoding API** (requer API Key)
```
GET https://maps.googleapis.com/maps/api/geocode/json?address={endereco}&key={API_KEY}
Retorna: {
  "results": [{
    "geometry": {
      "location": {
        "lat": -26.9906,
        "lng": -48.6480
      }
    }
  }]
}
```

### 3. **Google Maps JavaScript API** (para o mapa embedded)
```jsx
<GoogleMap
  center={{ lat: -26.9906, lng: -48.6480 }}
  zoom={15}
  mapContainerStyle={{ height: '300px', borderRadius: '16px' }}
>
  <Marker position={{ lat: -26.9906, lng: -48.6480 }} />
</GoogleMap>
```

## ⚡ Fluxo de Uso Ideal:

### **Caminho 1: Buscar por CEP (mais rápido)**
1. Digite CEP: `88330-000`
2. Clique "🔍 Buscar CEP"
3. ✅ **Sistema preenche**: Cidade, Bairro, Estado, Lat, Long
4. ✅ **Mapa atualiza** automaticamente
5. ✅ **Pronto!** Todos os campos preenchidos

### **Caminho 2: Preencher Manualmente + Buscar Coordenadas**
1. Digite: Endereço, Cidade, Estado, País
2. Clique "🔍 Buscar Coordenadas"
3. ✅ **Sistema preenche**: Lat, Long
4. ✅ **Mapa atualiza** automaticamente
5. ✅ **Pronto!**

### **Caminho 3: Usar Minha Localização (para imóveis próximos)**
1. Clique "📍 Usar Minha Localização"
2. Navegador pede permissão GPS
3. ✅ **Sistema preenche**: Lat, Long (sua localização atual)
4. ✅ **Mapa atualiza** mostrando onde você está
5. **Ajuste manual**: Digite endereço correto
6. Clique "🔍 Buscar Coordenadas" para corrigir

## ❓ Isso é o que você quer?

Se SIM, vou implementar este design exatamente assim.
Se NÃO, me diga o que mudar:
- [ ] Mapa muito pequeno? (aumentar altura?)
- [ ] Remover algum botão?
- [ ] Adicionar mais campos?
- [ ] Mudar ordem dos grupos?
- [ ] Simplificar as buscas automáticas?
- [ ] Outro tipo de visualização do mapa?
