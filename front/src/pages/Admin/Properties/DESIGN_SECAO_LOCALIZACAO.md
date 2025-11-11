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

---

# 💰 Design da Seção de Preço e Custos

## 📋 Layout Proposto

```
┌─────────────────────────────────────────────────────────────────┐
│              💰 PREÇO E CUSTOS MENSAIS                           │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  💵 Valor de Venda *                                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Preço de Venda *                                         │   │
│  │  ┌───────────────────────────────────────────────────┐  │   │
│  │  │  R$ 850000                                         │  │   │
│  │  └───────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│ ─────────────────────────────────────────────────────────────── │
│                                                                   │
│  💵 Custos Mensais do Imóvel                                     │
│  ┌─────────────────────────────┐ ┌─────────────────────────┐   │
│  │ 🏢 Condomínio               │ │ 📋 IPTU (anual)         │   │
│  │ R$ 850                      │ │ R$ 1440                 │   │
│  └─────────────────────────────┘ └─────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  📊 RESUMO DE CUSTOS MENSAIS                              │   │
│  │                                                            │   │
│  │  🏢 Condomínio:        R$ 850,00                          │   │
│  │  📋 IPTU (mensal):     R$ 120,00                          │   │
│  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                          │   │
│  │  💰 TOTAL/MÊS:         R$ 970,00                          │   │
│  │                                                            │   │
│  │  💡 Custo mensal total do imóvel                         │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 Estrutura da Seção:

### **🎨 VISUAL: Card único com gradiente amarelo-dourado**

```jsx
<div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  {/* Header com gradiente amarelo-dourado */}
  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-6 text-center">
    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
      <DollarSign size={32} />
      💰 PREÇO E CUSTOS MENSAIS
    </h2>
    <p className="text-amber-50 text-sm mt-2">Valor de venda e custos mensais do imóvel</p>
  </div>

  <div className="p-8 space-y-6">
    
    {/* 1. VALOR DE VENDA (full width) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <DollarSign size={20} className="text-amber-600" />
          💵 Valor de Venda
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório
        </span>
      </label>
      <input 
        type="number"
        step="1"
        placeholder="850000"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-lg font-semibold"
        required
      />
      <p className="text-sm text-slate-500 mt-2">
        💡 Digite apenas números, sem pontos ou vírgulas
      </p>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 2. CUSTOS MENSAIS (Grid 3 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Home size={20} className="text-slate-600" />
          💵 Custos Mensais do Imóvel
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Opcional
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Condomínio */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            🏢 Condomínio (R$/mês)
          </label>
          <input 
            type="number"
            step="0.01"
            placeholder="850"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
          />
        </div>

        {/* IPTU */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            📋 IPTU (R$/ano)
          </label>
          <input 
            type="number"
            step="0.01"
            placeholder="1440"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
          />
          <p className="text-xs text-slate-500 mt-1">
            Valor anual será dividido por 12 para exibição mensal
          </p>
        </div>

        {/* Seguro */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            🛡️ Seguro (R$/mês)
          </label>
          <input 
            type="number"
            step="0.01"
            placeholder="150"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all"
          />
        </div>
      </div>
    </div>

    {/* 3. CARD DE RESUMO (só aparece se tiver custos preenchidos) */}
    {(condominio > 0 || iptu > 0 || seguro > 0) && (
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
          <Calculator size={20} />
          📊 Resumo de Custos Mensais
        </h3>
        
        <div className="space-y-2">
          {condominio > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700">🏢 Condomínio:</span>
              <span className="font-bold text-slate-900">R$ {condominio.toFixed(2)}</span>
            </div>
          )}
          
          {iptu > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700">📋 IPTU (mensal):</span>
              <span className="font-bold text-slate-900">R$ {(iptu / 12).toFixed(2)}</span>
            </div>
          )}
          
          {seguro > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-700">🛡️ Seguro:</span>
              <span className="font-bold text-slate-900">R$ {seguro.toFixed(2)}</span>
            </div>
          )}
          
          <div className="border-t-2 border-emerald-300 my-3"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-emerald-900">💰 TOTAL/MÊS:</span>
            <span className="text-xl font-bold text-emerald-700">
              R$ {(condominio + (iptu / 12) + seguro).toFixed(2)}
            </span>
          </div>
        </div>

        <p className="text-xs text-emerald-700 mt-4 flex items-center gap-1">
          <Info size={12} />
          Custo mensal total que o comprador pagará
        </p>
      </div>
    )}

  </div>
</div>
```

## ✨ Características do Visual:

### 1️⃣ **💵 VALOR DE VENDA** (obrigatório)
- **Input simples** de número
- **Sem formatação automática** - usuário digita direto
- **Placeholder claro**: `850000`
- **Helper text**: "Digite apenas números, sem pontos ou vírgulas"
- **Badge vermelho**: "Obrigatório"

### 2️⃣ **💵 CUSTOS MENSAIS** (opcional)
- **Grid 2 colunas** (1 col mobile):
  - 🏢 **Condomínio** (R$/mês)
  - 📋 **IPTU** (R$/ano)
- **Inputs simples** de número
- **Helper no IPTU**: "Valor anual será dividido por 12 para exibição mensal"
- **Badge cinza**: "Opcional"

### 3️⃣ **📊 CARD DE RESUMO** (condicional)
- **Só aparece** se pelo menos um custo foi preenchido
- **Fundo verde claro** (#F0FDF4)
- **Border verde** (#10B981)
- **Lista de custos**:
  - Condomínio (se preenchido)
  - IPTU mensal (dividido por 12 automaticamente)
- **Linha divisória** antes do total
- **TOTAL/MÊS** em destaque (verde escuro, fonte maior)
- **Info**: "Custo mensal total que o comprador pagará"

## 🎨 Estilo Visual:

```css
TÍTULO DA SEÇÃO:
- Fonte: 32px, peso 700
- Cor: Gradiente amarelo-dourado (Amber → Yellow)
- Ícone: DollarSign (32px)
- Background: Branco com sombra
- Padding: 2rem
- Centralizado

CARD PRINCIPAL:
- Fundo: Branco
- Border: 2px cinza claro
- Shadow: lg
- Border-radius: 20px
- Padding: 2rem
- Hover: Shadow xl

VALOR DE VENDA:
- Input grande: py-3, px-4
- Font: 18px, peso 600
- Border: 2px cinza
- Focus: Ring amber-500
- Placeholder: Cinza claro
- Helper text: 14px, cinza

CUSTOS MENSAIS:
- Grid 2 colunas (desktop), 1 coluna (mobile)
- Labels: 14px, peso 600, com emojis
- Inputs: py-2.5, px-3
- Border: 2px cinza
- Focus: Ring slate-500
- Helper IPTU: 12px, cinza, italic

CARD DE RESUMO:
- Fundo: Verde claro (#F0FDF4)
- Border: 2px verde (#10B981)
- Border-radius: 16px
- Padding: 1.5rem
- Título: 18px, peso 700, verde escuro
- Itens: 14px
- Linha divisória: Border top verde
- Total: 20px, peso 700, verde escuro
- Info: 12px, verde escuro, com ícone

BADGES:
- Obrigatório: Fundo vermelho claro, texto vermelho escuro
- Opcional: Fundo cinza claro, texto cinza escuro
- Border-radius: Full
- Padding: 0.25rem 0.75rem
- Font: 12px, peso 600

DIVISORES:
- Border-top: 1px cinza claro (#E5E7EB)
- Margin: 1.5rem vertical
```

## 📊 Validações:

1. **Valor de Venda**:
   - Obrigatório
   - Tipo: number
   - Mínimo: 1000
   - Mensagem de erro: "O valor de venda é obrigatório"

2. **Condomínio**:
   - Opcional
   - Tipo: number
   - Mínimo: 0
   - Step: 0.01 (aceita centavos)

3. **IPTU**:
   - Opcional
   - Tipo: number
   - Mínimo: 0
   - Step: 0.01 (aceita centavos)
   - **Cálculo automático**: Divide por 12 para exibir no resumo

## 🔢 Cálculos Automáticos:

### **IPTU Mensal**:
```javascript
const iptuMensal = iptuAnual / 12;
// Exemplo: 1440 / 12 = 120 por mês
```

### **Total Mensal**:
```javascript
const totalMensal = condominio + (iptuAnual / 12);
// Exemplo: 850 + 120 = 970 por mês
```

### **Exibição Condicional do Resumo**:
```javascript
const mostrarResumo = condominio > 0 || iptuAnual > 0;
// Só mostra card de resumo se pelo menos um custo foi preenchido
```

## 🎯 Agrupamento Visual (seguindo padrão do planejamento):

```
1️⃣ GRUPO: VALOR PRINCIPAL
   └─ Valor de Venda (input simples, obrigatório)

2️⃣ GRUPO: CUSTOS MENSAIS
   └─ Condomínio + IPTU (grid 2 cols, opcional)

3️⃣ GRUPO: RESUMO (condicional)
   └─ Card verde com total calculado
```

## 💡 Diferenças do Design Anterior:

### ❌ **REMOVIDO:**
- ❌ Valor formatado (R$ 850.000,00)
- ❌ Valor por extenso
- ❌ Tipo de Negociação (Venda/Aluguel/Ambos)
- ❌ Valor do Aluguel
- ❌ Seguro Residencial
- ❌ Condições de Negociação (checkboxes)
- ❌ Observações sobre Preço

### ✅ **MANTIDO/SIMPLIFICADO:**
- ✅ Valor de Venda (input direto, sem formatação)
- ✅ Condomínio (R$/mês)
- ✅ IPTU (R$/ano)
- ✅ Resumo de Custos (card verde com cálculo automático)

## 🚀 Funcionalidades:

### 1. **Input Simples e Direto**:
- Usuário digita: `850000`
- Sem máscaras, sem formatação
- Valor é salvo como número no banco

### 2. **Cálculo Automático**:
- IPTU anual → divide por 12 automaticamente
- Total mensal = Condomínio + (IPTU/12)
- Atualiza em tempo real

### 3. **Exibição Condicional**:
- Card de resumo só aparece se houver custos
- Se ambos vazios → não mostra resumo

### 4. **Responsividade**:
- Desktop: Grid 2 colunas para custos
- Mobile: 1 coluna, empilhado

## ❓ Isso está bom agora?

Quer alguma mudança?
- [ ] Adicionar algum campo?
- [ ] Remover IPTU ou Condomínio?
- [ ] Mudar cores?
- [ ] Simplificar ainda mais?

