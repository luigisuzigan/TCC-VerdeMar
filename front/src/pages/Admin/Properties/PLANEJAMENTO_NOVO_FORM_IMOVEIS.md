# 📋 Planejamento: Novo Formulário de Criar Imóveis

## 🎯 Objetivo
Reorganizar completamente o formulário de criar/editar imóveis, separando os campos em **cartões/cards individuais** ao invés de seções agrupadas, para melhor organização visual e experiência do usuário.

---

## 📊 Análise do Formulário Atual

### ✅ Pontos Positivos:
- Validação condicional por tipo de imóvel funciona bem
- Ícones ajudam na identificação de cada seção
- Helper texts explicam campos complexos
- Preview de imagens funciona
- Cálculo automático de custos totais

### ❌ Problemas Identificados:
1. **Cards muito grandes** com muitos campos juntos
2. **Difícil escanear visualmente** onde preencher
3. **Campos relacionados estão misturados** (ex: beds e baths longe de suites)
4. **Falta separação clara** entre campos obrigatórios e opcionais
5. **Comodidades/Condições ocupam muito espaço** visual
6. **Rolagem excessiva** para ver todos os campos

---

## 🎨 Nova Estrutura Proposta

### **Layout:** Grid 2 colunas responsivo
- Desktop: 2 cards por linha
- Tablet: 2 cards por linha (menores)
- Mobile: 1 card por linha

### **Hierarquia Visual:**
1. **Cards Obrigatórios** (borda vermelha sutil)
2. **Cards Condicionais** (aparecem dinamicamente conforme tipo selecionado)
3. **Cards Opcionais** (borda neutra)

### **⚠️ IMPORTANTE - Campos Condicionais:**
Os campos devem aparecer/desaparecer dinamicamente baseado no tipo de imóvel selecionado:
- Se selecionar **Apartamento** → aparece "Andar"
- Se selecionar **Casa** → "Andar" NÃO aparece
- Se selecionar **Cobertura** → aparece "Andar", "Total de Andares" e "Suítes" (obrigatório)
- Se selecionar **Terreno** → NÃO aparecem "Quartos", "Banheiros", "Suítes"
- Se selecionar **Sobrado** → aparece "Total de Andares da Casa" (quantos andares tem o sobrado)

**Exemplo de Casa Normal com Múltiplos Andares:**
- Uma **Casa** pode ter 2, 3 ou mais andares
- Campo: "Número de Andares da Casa" (opcional para Casa, obrigatório para Sobrado)
- Diferente de "Andar do Imóvel" (que é para apartamentos em prédios)

---

## 📦 Organização dos Cards

---

## 🔢 SEÇÃO 1: IDENTIFICAÇÃO DO IMÓVEL (Obrigatório - sempre visível)

### **Card 1.1: 📝 Título do Anúncio**
```
- Título * (max 120 caracteres)
- Contador de caracteres
- [Preview do título formatado]
```
**Por quê primeiro?** É a identificação principal do imóvel, primeira coisa que usuário vê no anúncio

---

### **Card 1.2: � Descrição Detalhada**
```
- Descrição (textarea 800 chars)
- Contador de caracteres
- [Botão: Usar template por tipo]
```
**Por quê?** Completa a identificação, permite detalhar diferenciais

---

### **Card 1.3: � Imagens do Imóvel**
```
- URLs das Imagens * (textarea, uma por linha)
- Imagem Principal/Capa (input opcional)
- [Preview Grid 4 colunas]
- Contador: X imagens adicionadas
- Aviso se < 3 imagens
```
**Por quê?** Imagens vendem - precisa estar no início para admin ver o que está criando

---

### **Card 1.4: ⭐ Avaliação do Especialista**
```
- Rating 0-10 (input number com slider)
- [Helper: Avaliação considerando localização, estado, infraestrutura]
```
**Por quê?** Destaque de qualidade desde o início

---

## 🔢 SEÇÃO 2: CATEGORIA E TIPO (Obrigatório - controla campos condicionais)

### **🎨 VISUAL: Card único com gradiente azul-indigo**

```jsx
<div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  {/* Header com gradiente azul-indigo */}
  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-8 py-6 text-center">
    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
      <Tag size={32} />
      🏘️ CATEGORIA E TIPO
    </h2>
    <p className="text-blue-50 text-sm mt-2">Define o tipo de imóvel e campos obrigatórios</p>
  </div>

  <div className="p-8 space-y-8">
    {/* 1. CATEGORIA E TIPO (lado a lado - 2 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Tag size={20} className="text-blue-600" />
          Categoria e Tipo do Imóvel
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Categoria */}
        <select>Residencial, Comercial, Industrial, Terreno, Especial</select>
        {/* Tipo */}
        <select>Casa, Apartamento, Sobrado, Cobertura...</select>
      </div>

      {/* Info box quando tipo selecionado */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
        ✅ Tipo selecionado: Casa
        Os campos específicos serão exibidos nas próximas seções
      </div>
    </div>

    {/* Divisor visual */}
    <div className="border-t border-slate-200"></div>

    {/* 2. ESTILO ARQUITETÔNICO (full width) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Palette size={20} className="text-slate-600" />
          🎨 Estilo Arquitetônico
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Opcional
        </span>
      </label>
      <select>Moderno, Clássico, Rústico, Industrial...</select>
    </div>

    {/* Divisor visual */}
    <div className="border-t border-slate-200"></div>

    {/* 3. CONDIÇÃO E ANO (lado a lado - 2 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Shield size={20} className="text-slate-600" />
          ⭐ Condição e Ano de Construção
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Opcional
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Condição */}
        <select>Novo, Seminovo, Usado, Reformado</select>
        {/* Ano */}
        <input type="number" placeholder="Ex: 2020" />
      </div>
    </div>
  </div>
</div>
```

### **✨ Características do Visual:**
- ✅ **Card único grande** com todos os campos da seção
- ✅ **Header com gradiente azul-indigo** (diferente do verde da Seção 1)
- ✅ **Campos lado a lado** (2 colunas no desktop) para economizar espaço
- ✅ **Divisores visuais** (linhas horizontais) entre subseções
- ✅ **Badges claros** (Obrigatório em vermelho, Opcional em cinza)
- ✅ **Info box azul** quando tipo é selecionado
- ✅ **Ícones consistentes** (Tag, Palette, Shield)
- ✅ **Bordas arredondadas** e **sombras suaves**
- ✅ **Hover effect** (sombra aumenta)
- ✅ **Transições suaves** em todos os elementos

### **📐 Layout Responsivo:**
- **Desktop (>768px)**: 2 colunas (Categoria + Tipo lado a lado)
- **Mobile (<768px)**: 1 coluna (empilhado verticalmente)

### **🎯 Diferenças visuais da Seção 1:**
- Gradiente **azul-indigo** (vs verde-teal da Seção 1)
- Ícone **Tag** (vs FileText)
- Emoji **🏘️** (vs 📝)
- Foco em **seleção de tipo** (vs identificação textual)

---

### **Card 2.1: 🏠 Categoria do Imóvel**
```
- Categoria * (dropdown)
  • Residencial
  • Comercial  
  • Industrial
  • Terreno
  • Especial
```
**Por quê?** Define categoria geral e filtra tipos disponíveis

---

### **Card 2.2: 🏘️ Tipo Específico**
```
- Tipo * (dropdown dinâmico baseado na categoria)
- [Info box: "Campos que aparecerão para este tipo"]
```
**Por quê?** Define quais campos condicionais serão exibidos abaixo

---

### **Card 2.3: 🎨 Estilo Arquitetônico**
```
- Estilo (dropdown)
  • Moderno, Clássico, Rústico, Industrial, 
    Minimalista, Colonial, Contemporâneo, Tropical,
    Container, Steel Frame, Madeira, Sustentável, 
    Luxo, Compacto, Loft
```
**Por quê?** Diferencial visual importante para marketing

---

### **Card 2.4: ⭐ Estado de Conservação**
```
- Condição do Imóvel (dropdown)
  • Novo
  • Seminovo
  • Usado
  • Reformado
- Ano de Construção (input number)
```
**Por quê?** Define expectativa de manutenção e valor

---

## 🔢 SEÇÃO 3: LOCALIZAÇÃO COMPLETA (Obrigatório)

### **🎨 VISUAL: Card único com gradiente verde-esmeralda**

```jsx
<div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  {/* Header com gradiente verde-esmeralda */}
  <div className="bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-6 text-center">
    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
      <MapPin size={32} />
      📍 LOCALIZAÇÃO COMPLETA
    </h2>
    <p className="text-emerald-50 text-sm mt-2">Endereço e coordenadas para exibir no mapa</p>
  </div>

  <div className="p-8 space-y-6">
    
    {/* 1. ENDEREÇO COMPLETO (full width) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          🏠 Endereço Completo
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Opcional
        </span>
      </label>
      <input 
        type="text"
        placeholder="Rua das Palmeiras, 123 - Apto 501"
        className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl..."
      />
      <p className="text-sm text-slate-500 mt-2">
        💡 Informe rua, número e complemento
      </p>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 2. CIDADE, BAIRRO, ESTADO (Grid 3 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <MapPin size={20} className="text-emerald-600" />
          Cidade, Bairro e Estado
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Cidade */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Cidade *
          </label>
          <input 
            type="text"
            placeholder="Balneário Camboriú"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>

        {/* Bairro */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Bairro
          </label>
          <input 
            type="text"
            placeholder="Centro"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>

        {/* Estado (UF) */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Estado (UF) *
          </label>
          <input 
            type="text"
            placeholder="SC"
            maxLength={2}
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg uppercase..."
          />
        </div>
      </div>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 3. PAÍS E CEP (Grid 2 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          🌍 País e CEP
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* País */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            País *
          </label>
          <input 
            type="text"
            placeholder="Brasil"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>

        {/* CEP */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            CEP *
          </label>
          <input 
            type="text"
            placeholder="88330-000"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>
      </div>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 4. COORDENADAS GPS (Grid 2 colunas + Info) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          🗺️ Coordenadas GPS
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Opcional
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Latitude */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
            <span>Latitude</span>
            <Info size={14} className="text-slate-400" />
          </label>
          <input 
            type="number"
            step="any"
            placeholder="-26.9906"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1">
            <span>Longitude</span>
            <Info size={14} className="text-slate-400" />
          </label>
          <input 
            type="number"
            step="any"
            placeholder="-48.6480"
            className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg..."
          />
        </div>
      </div>

      {/* Info box sobre coordenadas */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 mt-4">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Info size={20} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-900 mb-1">
            📍 Coordenadas para o Mapa
          </p>
          <p className="text-xs text-emerald-700">
            As coordenadas GPS são usadas para exibir o imóvel no mapa e calcular distâncias.
            Você pode obter as coordenadas no Google Maps.
          </p>
        </div>
      </div>
    </div>

  </div>
</div>
```

### **✨ Características do Visual:**

#### **Layout Otimizado:**
- ✅ **Card único grande** com todos os campos de localização
- ✅ **Header com gradiente verde-esmeralda** (diferente das seções anteriores)
- ✅ **Campos agrupados logicamente**:
  - Endereço completo (full width)
  - Cidade + Bairro + Estado (3 colunas)
  - País + CEP (2 colunas)
  - Latitude + Longitude (2 colunas)
- ✅ **Divisores visuais** entre grupos
- ✅ **Labels menores** para campos em grid (economiza espaço vertical)

#### **Campos Obrigatórios vs Opcionais:**
- **Obrigatórios**: Cidade *, Estado *, País *, CEP *
- **Opcionais**: Endereço, Bairro, Latitude, Longitude

#### **Info Boxes:**
- ✅ **Box verde** explicando para que servem as coordenadas GPS
- ✅ **Ícone em círculo verde** (consistência com Seção 2)

#### **Responsividade:**
- **Desktop (>768px)**: 
  - Endereço: full width
  - Cidade/Bairro/Estado: 3 colunas
  - País/CEP: 2 colunas
  - Lat/Long: 2 colunas
- **Mobile (<768px)**: Tudo empilhado verticalmente (1 coluna)

#### **Cores e Identidade:**
- Gradiente: **Verde-Esmeralda** (Emerald/Green)
- Badge Obrigatório: **Vermelho**
- Badge Opcional: **Cinza**
- Info box: **Verde claro**

#### **Otimização de Espaço:**
- ✅ Campos menores em grids (py-2.5 ao invés de py-4)
- ✅ Labels compactos
- ✅ Grupos bem definidos com divisores
- ✅ ~30% mais compacto que a versão anterior

#### **UX Melhorada:**
- ✅ Estado (UF) com **auto uppercase** e **maxLength={2}**
- ✅ Coordenadas com **step="any"** para aceitar decimais
- ✅ Placeholders claros e exemplos reais
- ✅ Info icons nos campos de coordenadas
- ✅ Helper text explicativo no endereço

---

### **Card 3.1: 📍 Endereço Principal**
```
- Endereço Completo (input)
- Cidade * (input)
- Bairro (input)
```
**Por quê?** Grupo lógico de endereço físico

---

### **Card 3.2: 🌍 Região**
```
- Estado (UF) * (input 2 chars, auto uppercase)
- País * (input)
- CEP * (input com máscara)
```
**Por quê?** Informações de região e busca por CEP

---

### **Card 3.3: 🗺️ Coordenadas GPS**
```
- Latitude (input number, helper)
- Longitude (input number, helper)
- [Botão: Buscar coordenadas pelo endereço] ✅
- [Botão: Usar Minha Localização] ✅
- [Botão: Limpar Coordenadas] ✅
- [Preview: Mini-mapa mostrando localização] ✅
- [Aviso se Google Maps API não configurada] ✅
```
**Por quê?** Necessário para exibir no mapa e calcular locais próximos

**✨ Funcionalidades Implementadas:**
- ✅ **Buscar Coordenadas**: Converte endereço em lat/lng usando Google Maps Geocoding API
- ✅ **Minha Localização**: Usa geolocation do navegador para pegar coordenadas atuais
- ✅ **Preview do Mapa**: iframe do Google Maps mostrando pin na localização exata
- ✅ **Coordenadas no Preview**: Exibe lat/lng formatadas com 6 casas decimais
- ✅ **Validação**: Aviso se API key não estiver configurada

---

## 🔢 SEÇÃO 4: PREÇO E CUSTOS DE VENDA (Obrigatório)

### **Card 4.1: 💰 Valor do Imóvel**
```
- Preço * (R$) (input number)
- Moeda (dropdown: BRL/USD/EUR)
- [Preview grande formatado: R$ XXX.XXX,XX]
- [Cálculo automático: Preço por m²]
```
**Por quê?** Informação mais importante do anúncio

---

## 🔢 SEÇÃO 5: CUSTOS MENSAIS (Condicionais por tipo)

### **Card 5.1: 🏘️ Condomínio**
```
- Condomínio (R$/mês) * [obrigatório para Apartamento, Cobertura, Sala comercial]
- [Helper: Valor da taxa mensal de condomínio]
```
**Por quê?** Custo recorrente importante

---

### **Card 5.2: 🏛️ IPTU**
```
- IPTU (R$/ano) (input number)
- [Info: Será exibido como R$/mês (dividido por 12)]
```
**Por quê?** Imposto obrigatório, importante para custos totais

---

### **Card 5.3: 🛡️ Seguro Residencial**
```
- Seguro (R$/mês) (input number, opcional)
- [Helper: Valor estimado de seguro residencial]
```

---

### **Card 5.4: 💵 Resumo de Custos** (card verde destacado)
```
💰 Custo Mensal Total Estimado
R$ X.XXX,XX

Detalhamento:
• Condomínio: R$ XXX
• IPTU (R$/mês): R$ XXX
• Seguro: R$ XXX
───────────────────
Total: R$ XXX,XX
```
**Por quê?** Visão clara do custo total mensal

---

## 🔢 SEÇÃO 6: CARACTERÍSTICAS DO IMÓVEL (Condicionais)

### **🎨 VISUAL: Card único com gradiente roxo-violeta**

```jsx
<div className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
  {/* Header com gradiente roxo-violeta */}
  <div className="bg-gradient-to-r from-purple-500 to-violet-500 px-8 py-6 text-center">
    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
      <Home size={32} />
      🏠 CARACTERÍSTICAS DO IMÓVEL
    </h2>
    <p className="text-purple-50 text-sm mt-2">Áreas, cômodos e estrutura do imóvel</p>
  </div>

  <div className="p-8 space-y-6">
    
    {/* 1. ÁREAS (Grid 2 colunas) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Ruler size={20} className="text-purple-600" />
          📐 Áreas do Imóvel
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Área Total */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Área Total (m²) *
          </label>
          <input 
            type="number"
            step="0.01"
            placeholder="250.00"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg"
          />
          <p className="text-xs text-slate-500 mt-1">
            💡 Área total do terreno/lote
          </p>
        </div>

        {/* Área Construída */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Área Construída (m²) *
          </label>
          <input 
            type="number"
            step="0.01"
            placeholder="180.00"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg"
          />
          <p className="text-xs text-slate-500 mt-1">
            💡 Área edificada do imóvel
          </p>
        </div>
      </div>

      {/* Info dinâmica por tipo */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-4">
        <p className="text-xs text-purple-700">
          <strong>Apartamento:</strong> Área construída = área útil do apartamento<br/>
          <strong>Casa/Sobrado:</strong> Área total = lote, área construída = edificação<br/>
          <strong>Terreno:</strong> Área construída pode ser 0 se não tiver construção
        </p>
      </div>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 2. CÔMODOS - Grid 4 colunas (condicional para residenciais) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <DoorOpen size={20} className="text-slate-600" />
          🛏️ Cômodos
        </span>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">
          Obrigatório para residenciais
        </span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card Quartos */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bed size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-blue-900 mb-1">
                Quartos *
              </label>
              <input 
                type="number"
                min="0"
                placeholder="3"
                className="w-full px-3 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-2xl font-bold text-blue-900 text-center bg-white"
              />
            </div>
          </div>
        </div>

        {/* Card Suítes */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Crown size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-purple-900 mb-1">
                Suítes
              </label>
              <input 
                type="number"
                min="0"
                placeholder="1"
                className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-2xl font-bold text-purple-900 text-center bg-white"
              />
            </div>
          </div>
        </div>

        {/* Card Banheiros */}
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-2 border-cyan-200 rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bath size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-900 mb-1">
                Banheiros *
              </label>
              <input 
                type="number"
                min="0"
                placeholder="2"
                className="w-full px-3 py-2 border-2 border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-2xl font-bold text-cyan-900 text-center bg-white"
              />
            </div>
          </div>
        </div>

        {/* Card Vagas */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-5 hover:shadow-lg transition-all">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Car size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-orange-900 mb-1">
                Vagas
              </label>
              <input 
                type="number"
                min="0"
                placeholder="2"
                className="w-full px-3 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-2xl font-bold text-orange-900 text-center bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
        <Info size={12} />
        Esses campos não aparecem para terrenos vazios e imóveis comerciais
      </p>
    </div>

    {/* Divisor */}
    <div className="border-t border-slate-200"></div>

    {/* 3. ANDARES (condicional por tipo) */}
    <div>
      <label className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Building2 size={20} className="text-slate-600" />
          🏗️ Informações de Andares
        </span>
        <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-semibold">
          Condicional
        </span>
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Andar do Imóvel (Apartamento/Sala) */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            🏢 Andar do Imóvel
          </label>
          <input 
            type="number"
            min="0"
            placeholder="Ex: 5"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg"
          />
          <p className="text-xs text-slate-500 mt-1">
            💡 Para apartamentos/salas: qual andar? (0 = térreo)
          </p>
        </div>

        {/* Total de Andares */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            📊 Total de Andares
          </label>
          <input 
            type="number"
            min="1"
            placeholder="Ex: 12"
            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-lg"
          />
          <p className="text-xs text-slate-500 mt-1">
            💡 Apartamento: andares do prédio | Sobrado: andares da casa
          </p>
        </div>
      </div>

      {/* Info por tipo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
        <p className="text-xs text-blue-700">
          <strong>🏢 Apartamento/Sala:</strong> "Andar" = em qual andar está? | "Total" = quantos andares tem o prédio?<br/>
          <strong>🏠 Sobrado:</strong> "Total" = quantos andares tem a casa? (obrigatório, mínimo 2)<br/>
          <strong>🏡 Casa:</strong> "Total" = opcional, informe se tiver mais de 1 andar<br/>
          <strong>🏗️ Terreno:</strong> Não se aplica (campos ocultos)
        </p>
      </div>
    </div>

  </div>
</div>
```

### **✨ Características do Visual:**

#### **Layout Otimizado:**
- ✅ **Card único grande** com todas as características
- ✅ **Header roxo-violeta** (diferente das seções anteriores)
- ✅ **3 subseções bem definidas**:
  1. Áreas (2 colunas): Área Total + Área Construída
  2. Cômodos (4 colunas): Quartos + Suítes + Banheiros + Vagas
  3. Andares (2 colunas): Andar do Imóvel + Total de Andares

#### **Áreas:**
- ✅ **Área Total (m²)** - obrigatório para todos
  - Helper: "Área total do terreno/lote"
- ✅ **Área Construída (m²)** - obrigatório para todos
  - Helper: "Área edificada do imóvel"
- ✅ **Info box dinâmica** explicando diferenças por tipo

#### **Cômodos (Grid 4 colunas):**
- ✅ **Campos centralizados** com números grandes
- ✅ **Emojis nos labels** para identificação visual rápida
- ✅ Quartos * (obrigatório para residenciais)
- ✅ Suítes (opcional)
- ✅ Banheiros * (obrigatório para residenciais)
- ✅ Vagas de Garagem (opcional)
- ✅ **Helper text** indicando que não aparecem para terrenos/comerciais

#### **Andares:**
- ✅ **2 campos separados** para diferentes contextos
- ✅ **Helpers específicos** por tipo de imóvel
- ✅ **Info box azul** explicando uso por tipo:
  - Apartamento/Sala: andar onde está + total do prédio
  - Sobrado: total de andares da casa (obrigatório, min 2)
  - Casa: total de andares (opcional)
  - Terreno: campos ocultos

#### **Cores e Identidade:**
- Gradiente: **Roxo-Violeta** (Purple/Violet)
- Badge Obrigatório: **Vermelho**
- Badge Condicional: **Cinza**
- Info boxes: **Roxo claro** e **Azul claro**

#### **Responsividade:**
- **Desktop**: 
  - Áreas: 2 colunas
  - Cômodos: 4 colunas
  - Andares: 2 colunas
- **Mobile**: Tudo em 1 coluna (empilhado)

#### **UX Melhorada:**
- ✅ Inputs de área com `step="0.01"` para casas decimais
- ✅ Inputs de cômodos centralizados para melhor visualização
- ✅ Placeholders com exemplos realistas
- ✅ Helpers contextuais por tipo de imóvel
- ✅ Info boxes educativos

---

### **Card 6.1: 📐 Áreas**
```
- Área Total (m²) * [sempre obrigatório]
- Área Construída (m²) * [sempre obrigatório]
- [Helper dinâmico por tipo]
- [Info box com explicações]
```
**Por quê?** Informações essenciais para precificação e comparação

---

### **Card 6.2: 🛏️ Cômodos** [CONDICIONAL - só aparece para tipos residenciais]
```
- Quartos * [obrigatório para Casa, Sobrado, Apartamento, Cobertura]
- Suítes (opcional, obrigatório para Cobertura)
- Banheiros * [obrigatório para Casa, Sobrado, Apartamento, Cobertura]
- Vagas de Garagem (opcional)
- [Não aparece para: Terrenos, Salas comerciais, Galpões, Lojas]
```

---

### **Card 6.3: 🏗️ Andares** [CONDICIONAL]
```
- Andar do Imóvel * [obrigatório para Apartamento, Cobertura, Sala comercial]
- Total de Andares * [obrigatório para Apartamento (prédio), Sobrado (casa)]
- Total de Andares (opcional para Casa se tiver mais de 1 andar)
- [Helper dinâmico por tipo]
- [Info box explicativa]
- [NÃO aparece para: Terreno]
```
**Por quê separar?**
- **Apartamento**: andar onde está + total do prédio
- **Sobrado**: total de andares da própria casa (min 2)
- **Casa**: total de andares (opcional)

---

## 🔢 SEÇÃO 7: COMODIDADES E AMENIDADES (Opcional para todos)

### 🎨 VISUAL: Card único com gradiente teal-cyan

**HEADER DO CARD:**
- Gradiente: teal → cyan (from-teal-500 to-cyan-500)
- Ícone: Sparkles (32px) + texto "✅ COMODIDADES DO IMÓVEL"
- Subtítulo: "Selecione todas as comodidades disponíveis"
- Badge lateral: "X de 200+ opções selecionadas" (atualiza dinamicamente)
- Botão secundário: "Limpar Todas" (branco outline)

---

### 📦 ESTRUTURA: Categorias Expansíveis (Acordeão)

**CATEGORIA 1: 🏊 Lazer e Área Externa**
- Cor do badge: Blue (azul)
- Ícone: Waves
- Grid: 4 colunas (desktop) | 2 colunas (mobile)
- Checkboxes com ícones personalizados

**Itens:**
- Piscina
- Piscina Aquecida
- Hidromassagem / Jacuzzi
- Academia / Fitness
- Sauna
- Spa
- Churrasqueira
- Área Gourmet
- Forno de Pizza
- Jardim
- Varanda
- Sacada
- Terraço
- Deck
- Gazebo / Pergolado
- Quadra Poliesportiva
- Quadra de Tênis
- Campo de Futebol
- Playground
- Salão de Jogos
- Salão de Festas
- Sala de Cinema / Home Theater
- Brinquedoteca

---

**CATEGORIA 2: 🌐 Tecnologia e Conectividade**
- Cor do badge: Purple (roxo)
- Ícone: Wifi
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- WiFi
- Internet Fibra Óptica
- TV a Cabo
- Smart TV
- Sistema de Som Integrado
- Automação Residencial / Smart Home
- Interfone
- Vídeo Porteiro
- Portão Eletrônico

---

**CATEGORIA 3: ❄️ Climatização**
- Cor do badge: Cyan (ciano)
- Ícone: Snowflake
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Ar-condicionado
- Ar-condicionado Central
- Ar-condicionado Split
- Aquecedor
- Aquecedor a Gás
- Aquecedor Solar
- Ventilador de Teto
- Lareira
- Lareira a Lenha
- Lareira a Gás

---

**CATEGORIA 4: 🚗 Estacionamento e Garagem**
- Cor do badge: Slate (cinza escuro)
- Ícone: Car
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Garagem Coberta
- Garagem Descoberta
- 1 Vaga
- 2 Vagas
- 3 Vagas
- 4+ Vagas
- Vaga para Visitantes
- Carregador para Carro Elétrico

---

**CATEGORIA 5: 🍳 Cozinha e Eletrodomésticos**
- Cor do badge: Orange (laranja)
- Ícone: ChefHat
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Cozinha Equipada
- Cozinha Planejada
- Cozinha Gourmet
- Ilha / Bancada Americana
- Geladeira
- Freezer
- Fogão
- Cooktop
- Forno Elétrico
- Forno a Gás
- Micro-ondas
- Lava-louças
- Máquina de Lavar Roupa
- Máquina de Secar Roupa
- Adega Climatizada
- Coifa / Depurador
- Purificador de Água
- Filtro de Água

---

**CATEGORIA 6: 🔒 Segurança**
- Cor do badge: Red (vermelho)
- Ícone: Shield
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Portaria 24h
- Segurança 24h
- Câmeras de Segurança
- Circuito Fechado de TV (CFTV)
- Alarme
- Cerca Elétrica
- Muros Altos
- Grades nas Janelas
- Porta Blindada
- Cofre

---

**CATEGORIA 7: ♿ Acessibilidade**
- Cor do badge: Indigo (índigo)
- Ícone: Accessibility
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Elevador
- Elevador Social
- Elevador de Serviço
- Acessível para Cadeirantes
- Rampa de Acesso
- Banheiro Adaptado
- Corrimãos

---

**CATEGORIA 8: 🐕 Pets e Família**
- Cor do badge: Pink (rosa)
- Ícone: Dog
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Aceita Pets
- Aceita Cães
- Aceita Gatos
- Pet Place / Área para Pets
- Playground Infantil
- Área Kids

---

**CATEGORIA 9: 🏢 Condomínio e Infraestrutura**
- Cor do badge: Violet (violeta)
- Ícone: Building
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Salão de Festas do Condomínio
- Academia do Condomínio
- Piscina do Condomínio
- Espaço Coworking
- Bicicletário
- Lavanderia Coletiva
- Depósito / Closet Privativo
- Zelador / Síndico

---

**CATEGORIA 10: 🌊 Água e Utilidades**
- Cor do badge: Sky (azul céu)
- Ícone: Droplets
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Caixa d'água
- Cisterna
- Aquecimento Solar
- Bomba d'água
- Gerador
- Energia Solar / Painéis Fotovoltaicos

---

**CATEGORIA 11: 🛏️ Quartos e Banheiros**
- Cor do badge: Rose (rosa escuro)
- Ícone: Bed
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Suíte Master
- Closet
- Banheira
- Box Blindex
- Ducha
- Armários Embutidos
- Guarda-roupas Embutido

---

**CATEGORIA 12: 🏠 Estrutura e Acabamentos**
- Cor do badge: Amber (âmbar)
- Ícone: Home
- Grid: 4 colunas (desktop) | 2 colunas (mobile)

**Itens:**
- Pé-direito Alto
- Piso Frio
- Piso Laminado
- Piso de Madeira
- Piso Porcelanato
- Gesso / Sancas
- Molduras / Rodatetos
- Papel de Parede
- Pintura Nova

---

### 🎯 COMPORTAMENTO DO ACORDEÃO:

**Estados dos Painéis:**
- **Fechado**: Mostra nome da categoria + ícone + badge com "X itens selecionados"
- **Aberto**: Expande e mostra grid de checkboxes
- **Expansão**: Animação suave (transition 300ms)
- **Padrão**: Todas as categorias fechadas inicialmente
- **Múltiplos abertos**: Permitir abrir várias categorias ao mesmo tempo

**Header de Cada Categoria:**
- Fundo: Gradiente suave da cor da categoria (50 → 100)
- Borda lateral esquerda: 4px sólida na cor da categoria
- Hover: Shadow e leve escurecimento
- Cursor: pointer
- Ícone de seta: ChevronDown (rotaciona 180° quando aberto)

**Checkboxes:**
- Tamanho: Grande e fácil de clicar
- Cor de seleção: Cor da categoria
- Label: Texto claro e legível
- Hover: Background suave
- Animação: Check mark suave

**Resumo Visual (Topo do Card):**
- "12 categorias disponíveis"
- "Total: 45 comodidades selecionadas"
- Barra de progresso visual opcional (percentual de seleção)

---

## 🔢 SEÇÃO 8: CONDIÇÕES NATURAIS (Opcional para todos)

### 🎨 VISUAL: Card com tema natural - Gradiente verde-esmeralda

**HEADER DO CARD:**
- Gradiente: verde → esmeralda (from-green-500 to-emerald-500)
- Ícone: Leaf (32px) + texto "🌿 CONDIÇÕES NATURAIS"
- Subtítulo: "Características naturais e ambientais do imóvel"
- Badge lateral: "X de 100+ condições selecionadas" (atualiza dinamicamente)
- Botão secundário: "Limpar Todas" (branco outline)

---

### 🌳 ESTRUTURA: Grid de Cards com Categorias Visuais

**LAYOUT DIFERENCIADO:**
- **NÃO** usar acordeão (diferente das amenidades)
- Todas as categorias visíveis ao mesmo tempo
- Grid de 2 colunas (desktop) | 1 coluna (mobile)
- Cada categoria = Card colorido individual
- Altura uniforme e visual equilibrado

---

### 📦 CATEGORIAS (8 Cards Coloridos):

**CARD 1: 🌊 Vista e Localização**
- Gradiente: Blue → Cyan (from-blue-400 to-cyan-400)
- Ícone grande: Eye (28px)
- Badge: "14 opções"
- Grid interno: 2 colunas de checkboxes
- Borda: 3px azul neon

**Itens:**
- Vista para o mar
- Vista panorâmica do mar
- Frente para o mar
- Pé na areia
- Vista para a praia
- Vista para a montanha
- Vista para o lago
- Vista para o rio
- Vista para a cidade
- Vista para a natureza
- Vista para o verde
- Vista para o parque
- Vista desobstruída
- Vista privilegiada

---

**CARD 2: 💨 Ventilação e Ar**
- Gradiente: Sky → Teal (from-sky-400 to-teal-400)
- Ícone grande: Wind (28px)
- Badge: "8 opções"
- Grid interno: 2 colunas

**Itens:**
- Ventilação natural
- Ventilação cruzada
- Brisa marítima
- Brisa constante
- Circulação de ar excelente
- Ambientes arejados
- Janelas amplas
- Portas de vidro

---

**CARD 3: ☀️ Iluminação Solar**
- Gradiente: Yellow → Orange (from-yellow-400 to-orange-400)
- Ícone grande: Sun (28px)
- Badge: "11 opções"
- Grid interno: 2 colunas

**Itens:**
- Sol da manhã
- Sol da tarde
- Sol o dia todo
- Muito sol
- Iluminação natural abundante
- Claridade natural
- Face norte
- Face sul
- Face leste
- Face oeste
- Claraboias / Luz zenital

---

**CARD 4: 🌡️ Clima e Conforto**
- Gradiente: Amber → Rose (from-amber-400 to-rose-400)
- Ícone grande: Thermometer (28px)
- Badge: "7 opções"
- Grid interno: 2 colunas

**Itens:**
- Clima ameno
- Clima tropical
- Temperatura agradável
- Fresco no verão
- Quente no inverno
- Sombra natural de árvores
- Microclima agradável

---

**CARD 5: 🌳 Natureza e Verde**
- Gradiente: Green → Lime (from-green-500 to-lime-400)
- Ícone grande: Trees (28px)
- Badge: "12 opções"
- Grid interno: 2 colunas

**Itens:**
- Área verde
- Arborizado
- Jardim natural
- Mata nativa
- Árvores frutíferas
- Pomar
- Horta
- Contato com a natureza
- Fauna local
- Pássaros
- Borboletas
- Ecossistema preservado

---

**CARD 6: 🏞️ Terreno e Topografia**
- Gradiente: Stone → Slate (from-stone-400 to-slate-500)
- Ícone grande: Mountain (28px)
- Badge: "7 opções"
- Grid interno: 2 colunas

**Itens:**
- Terreno plano
- Terreno em declive
- Terreno em aclive
- Elevado / Ponto alto
- Vista de cima
- Solo firme
- Solo drenado

---

**CARD 7: 🌅 Características Especiais**
- Gradiente: Purple → Pink (from-purple-400 to-pink-400)
- Ícone grande: Sparkles (28px)
- Badge: "10 opções"
- Grid interno: 2 colunas

**Itens:**
- Nascer do sol
- Pôr do sol
- Céu estrelado
- Noite tranquila
- Silêncio / Ambiente calmo
- Privacidade
- Área isolada
- Exclusividade
- Som das ondas
- Acesso direto à praia

---

**CARD 8: 🌿 Sustentabilidade**
- Gradiente: Emerald → Green (from-emerald-500 to-green-600)
- Ícone grande: Recycle (28px)
- Badge: "10 opções"
- Grid interno: 2 colunas

**Itens:**
- Casa sustentável
- Bioconstrução
- Materiais naturais
- Captação de água da chuva
- Compostagem
- Fossa ecológica
- Biodigestor
- Energia renovável
- Baixo impacto ambiental
- Água de nascente / Poço artesiano

---

### 🎯 ESTILO DOS CHECKBOXES:

**Aparência:**
- Checkbox customizado com cor da categoria
- Label com hover effect suave
- Texto: font-medium, text-sm
- Espaçamento generoso entre itens
- Animação de check suave

**Estados:**
- **Não selecionado**: Background branco, borda cinza clara
- **Hover**: Background da cor da categoria (opacity 10%)
- **Selecionado**: Background da cor da categoria (opacity 20%), borda da cor da categoria, texto bold

---

### 🎨 HIERARQUIA VISUAL:

**Header de Cada Card:**
- Gradiente no topo (altura: 80px)
- Ícone centralizado acima do título
- Título: font-bold, text-lg, branco
- Badge: posição absoluta (top-right)
- Sombra suave

**Corpo do Card:**
- Background: branco
- Padding: 6 (24px)
- Border-radius: 2xl
- Shadow: lg com hover:xl
- Border: 2px da cor do gradiente

**Resumo Visual (Rodapé do Card Principal):**
- Mostrar total selecionado por categoria
- Barra de progresso visual opcional
- "8 categorias • 79 opções disponíveis"

---

### 💡 DIFERENCIAIS DESTE DESIGN:

✅ **Não usa acordeão** - Tudo sempre visível
✅ **Cards coloridos individuais** - Cada categoria se destaca
✅ **Grid 2x4** - Layout espacioso e organizado
✅ **Tema natural** - Cores da natureza (verde, azul, amarelo)
✅ **Visual premium** - Gradientes suaves e modernos
✅ **Fácil escaneamento** - Encontra rapidamente a categoria desejada

---

## 🔢 SEÇÃO 9: STATUS DE PUBLICAÇÃO

### **Card 9.1: 🚀 Publicar Imóvel**
```
- Checkbox: "Publicar Imóvel"
- [Info: Marque para tornar visível para os usuários]
- [Toggle grande e destacado]
```
**Por quê?** Controle de visibilidade do anúncio

---

## 🔢 SEÇÃO 10: AÇÕES FINAIS

### **Barra de Ações** (sticky top ou bottom)
```
[Cancelar]  [Salvar Rascunho]  [🚀 Criar/Atualizar Imóvel]
```

---

## 🎨 Estilo dos Cards

### **Card Obrigatório:**
```css
- Borda esquerda vermelha (4px)
- Badge "Obrigatório" no canto superior direito
- Campos com asterisco vermelho (*)
```

### **Card Condicional:**
```css
- Borda esquerda azul (4px)
- Badge "Obrigatório para [Tipo]" 
- Animação de entrada (fade in 300ms)
- Destaque sutil quando aparece
```

### **Card Opcional:**
```css
- Borda cinza clara
- Badge "Opcional" cinza
```

### **Card de Resumo/Info:**
```css
- Fundo colorido (verde para custos, azul para dicas)
- Ícone grande
- Texto destacado
- Sombra suave
```

---

## 📱 Responsividade

### **Desktop (> 1024px):**
- 2 cards por linha (lado a lado)
- Sidebar com índice fixo opcional (jump to section)
- Cards maiores e mais espaçosos

### **Tablet (768px - 1024px):**
- 2 cards por linha (mais estreitos)
- Sem sidebar
- Padding reduzido

### **Mobile (< 768px):**
- 1 card por linha (pilha vertical)
- Cards em full width
- Botões de ação sticky no bottom
- Progress bar no topo

---

## 🔄 Comportamento Dinâmico dos Campos Condicionais

### **Ao mudar Categoria:**
1. Atualizar dropdown "Tipo" com os tipos dessa categoria
2. Resetar "Tipo" para o primeiro da lista
3. Aplicar lógica de campos condicionais do novo tipo

### **Ao mudar Tipo de Imóvel:**
1. **Fade out** dos cards condicionais que não se aplicam mais (300ms)
2. **Fade in** dos novos cards condicionais necessários (300ms)
3. **Reordenar cards**: obrigatórios primeiro, depois opcionais
4. **Scroll automático** para o primeiro campo novo (suave)
5. **Toast de info**: "X novos campos apareceram para [Tipo]"
6. **Destacar** cards novos com borda pulsante por 2s

### **Exemplo Prático - Mudança de Apartamento → Casa:**

**Campos que DESAPARECEM (fade out):**
- ❌ Card "Andar do Imóvel" (não se aplica a Casa)
- ❌ Card "Condomínio" (não obrigatório para Casa)

**Campos que APARECEM (fade in):**
- ✅ Card "Área do Lote" (obrigatório para Casa)
- ✅ Card "Número de Andares da Casa" (opcional, caso tenha mais de 1 andar)

**Toast exibido:**
```
ℹ️ Campos atualizados para Casa
• Área do Lote agora é obrigatória
• Andar do Imóvel foi removido (não se aplica)
```

### **Exemplo Prático - Mudança de Casa → Sobrado:**

**Campos que MUDAM:**
- 🔄 "Número de Andares da Casa" passa de OPCIONAL → OBRIGATÓRIO
- Badge do card muda de "Opcional" para "Obrigatório para Sobrado"
- Borda do card muda de cinza para azul

---

## ✅ Validação por Card

### **Validação em Tempo Real:**
- ✅ Check verde no canto do card quando todos os campos obrigatórios preenchidos
- ❌ X vermelho quando há campos vazios obrigatórios
- ⚠️ Alerta amarelo quando há avisos (ex: menos de 3 imagens)

### **Validação ao Submeter:**
1. Verificar todos os cards obrigatórios
2. Se houver erro:
   - **Shake animation** no card com erro
   - **Scroll automático** para o primeiro card com erro
   - **Destacar** campos específicos com problema
   - **Toast de erro**: "Preencha os campos obrigatórios"

### **Exemplo de Card com Validação:**
```jsx
<Card className={`
  ${isComplete ? 'border-green-500' : ''}
  ${hasError ? 'border-red-500 animate-shake' : ''}
  ${isRequired ? 'border-l-4 border-l-red-500' : ''}
`}>
  <CardHeader>
    <Badge>{isRequired ? 'Obrigatório' : 'Opcional'}</Badge>
    {isComplete && <CheckCircle className="text-green-500" />}
    {hasError && <XCircle className="text-red-500" />}
  </CardHeader>
  ...
</Card>
```

---

## 🚀 Melhorias Adicionais

### **1. Progress Indicator (Barra de Progresso)**
```
[Progresso: 45%]  ●●●●●○○○○○
"5 de 10 seções completas"
```
- Localização: Topo fixo do formulário
- Atualiza em tempo real conforme campos preenchidos
- Mostra quantas seções faltam

### **2. Salvamento Automático (Draft)**
```
"Último salvamento: há 2 minutos"
[Draft salvo automaticamente a cada 30s]
```
- Salva no localStorage a cada 30 segundos
- Permite recuperar em caso de fechamento acidental
- Botão "Restaurar rascunho" ao abrir o form novamente

### **3. Busca de Endereço via CEP (API ViaCEP)**
```
[Input CEP] → [Botão: Buscar] → Auto-preenche:
  • Cidade
  • Bairro
  • Estado
  • (Latitude/Longitude via Google Maps Geocoding)
```
- Economiza tempo do admin
- Reduz erros de digitação
- Busca coordenadas automaticamente

### **4. Upload de Imagens (além de URLs)**
```
- Drag & Drop de múltiplas imagens
- Upload direto para servidor/CDN
- Gera URLs automaticamente
- Preview instantâneo
- Reordenar imagens (drag & drop)
```

### **5. Templates de Descrição**
```
Botão: "Usar template de descrição"
Opções:
  • Casa de Praia
  • Apartamento Moderno
  • Terreno para Construção
  • Imóvel Comercial
  • Chácara Rural
```
- Preenche automaticamente descrição base
- Admin só precisa personalizar detalhes

### **6. Cálculos Automáticos e Insights**
```
📊 Análise Automática:
• Preço por m²: R$ 4.250/m²
• Comparado ao mercado: 5% acima da média
• Estimativa de aluguel: R$ 3.500/mês
• ROI estimado: 0.4% ao mês
```
- Ajuda admin a precificar melhor
- Mostra se está competitivo

---

## 📋 Ordem de Implementação Sugerida

### **Fase 1: Estrutura Base** (2-3h)
1. ✅ Criar componente `PropertyCard.jsx` reutilizável
2. ✅ Criar layout grid 2 colunas responsivo
3. ✅ Implementar sistema de badges (Obrigatório/Opcional/Condicional)

### **Fase 2: Cards Básicos Obrigatórios** (3-4h)
4. ✅ Card: Título do Anúncio
5. ✅ Card: Descrição
6. ✅ Card: Imagens (com preview)
7. ✅ Card: Avaliação
8. ✅ Card: Categoria
9. ✅ Card: Tipo
10. ✅ Card: Estilo Arquitetônico
11. ✅ Card: Estado de Conservação

### **Fase 3: Cards de Localização** (2h)
12. ✅ Card: Endereço Principal
13. ✅ Card: Região (Estado/País/CEP)
14. ✅ Card: Coordenadas GPS

### **Fase 4: Cards de Preço e Custos** (2h)
15. ✅ Card: Valor do Imóvel
16. ✅ Card: Condomínio (condicional)
17. ✅ Card: IPTU
18. ✅ Card: Seguro
19. ✅ Card: Resumo de Custos (calculado)

### **Fase 5: Cards de Características (CONDICIONAIS)** (4-5h)
20. ✅ Implementar lógica de exibição/ocultação por tipo
21. ✅ Card: Áreas (construída + lote)
22. ✅ Card: Quartos
23. ✅ Card: Banheiros
24. ✅ Card: Suítes
25. ✅ Card: Vagas de Garagem
26. ✅ Card: Andar do Imóvel
27. ✅ Card: Total de Andares
28. ✅ Testar todas as combinações de tipos

### **Fase 6: Cards Complexos** (3h)
29. ✅ Card: Comodidades (grid de checkboxes)
30. ✅ Card: Condições Naturais (grid de checkboxes)

### **Fase 7: Finalização e UX** (3h)
31. ✅ Card: Status de Publicação
32. ✅ Barra de ações (Cancelar/Salvar/Criar)
33. ✅ Progress indicator
34. ✅ Validação por card (check verde)
35. ✅ Animações de transição (fade in/out)
36. ✅ Scroll automático para erros
37. ✅ Toast notifications

### **Fase 8: Melhorias Opcionais** (5-8h)
38. ⚠️ Salvamento automático (draft)
39. ⚠️ Busca por CEP (ViaCEP API)
40. ⚠️ Busca de coordenadas por endereço (Google Maps Geocoding)
41. ⚠️ Templates de descrição
42. ⚠️ Upload de imagens (drag & drop)
43. ⚠️ Cálculos automáticos (preço/m², ROI)
44. ⚠️ Reordenar imagens (drag & drop)

### **Fase 9: Testes e Refinamento** (2-3h)
45. ✅ Testar todos os 28 tipos de imóveis
46. ✅ Testar validações condicionais
47. ✅ Testar responsividade (desktop/tablet/mobile)
48. ✅ Corrigir bugs identificados
49. ✅ Ajustar estilos e animações
50. ✅ Documentar mudanças

---

## 🎯 Resultado Esperado

### **Antes:**
- ❌ 10 seções grandes e confusas
- ❌ Difícil escanear onde preencher
- ❌ Campos misturados sem lógica
- ❌ Rolagem excessiva
- ❌ Campos não aplicáveis aparecendo sempre
- ❌ Difícil saber o que é obrigatório

### **Depois:**
- ✅ ~20 cards pequenos e focados
- ✅ Fácil identificar o que preencher
- ✅ Campos agrupados logicamente por seção
- ✅ Navegação visual clara com progress bar
- ✅ Campos condicionais aparecem/desaparecem dinamicamente
- ✅ Badges claros (Obrigatório/Opcional/Condicional)
- ✅ Validação visual por card (check verde)
- ✅ Melhor UX mobile (1 card por linha)
- ✅ Animações suaves de transição
- ✅ Toast notifications informativas

---

## ⚠️ ALERTAS IMPORTANTES - NÃO QUEBRAR O FUNCIONAMENTO

### **🚨 CUIDADOS AO IMPLEMENTAR:**

1. **NÃO MUDAR a lógica de validação do backend**
   - ✅ Apenas reorganizar campos visualmente
   - ❌ Não alterar `propertyFieldsConfig.js`
   - ❌ Não alterar validações em `routes.js`

2. **NÃO MUDAR os nomes dos campos**
   - ✅ Manter `beds`, `baths`, `suites`, etc.
   - ❌ Não renomear para `bedrooms`, `bathrooms`
   - Os nomes devem corresponder exatamente ao schema Prisma

3. **NÃO MUDAR a estrutura de dados enviados**
   - ✅ Manter payload idêntico ao atual
   - ✅ Continuar enviando JSON stringificado para `amenities`, `naturalConditions`, `images`
   - ❌ Não mudar formato de envio

4. **TESTAR SALVAR APÓS CADA MUDANÇA**
   - ✅ Após implementar cada card, testar salvamento
   - ✅ Verificar console do navegador para erros
   - ✅ Verificar se dados chegam no backend corretamente

5. **USAR FUNÇÕES EXISTENTES**
   - ✅ Continuar usando `shouldShowField()` e `isFieldRequired()`
   - ✅ Continuar usando `PROPERTY_TYPES_BY_CATEGORY`
   - ❌ Não reescrever do zero

6. **MANTER COMPATIBILIDADE COM EDIÇÃO**
   - ✅ Formulário deve funcionar tanto para CRIAR quanto EDITAR
   - ✅ Ao editar, preencher corretamente os valores existentes
   - ✅ Parsear JSON de `amenities`, `naturalConditions`, `images`

### **✅ PODE FAZER SEM PROBLEMAS:**
- ✅ Reorganizar ordem dos campos
- ✅ Separar em cards menores
- ✅ Adicionar badges, ícones, helpers
- ✅ Melhorar estilos (cores, bordas, sombras)
- ✅ Adicionar animações CSS
- ✅ Adicionar progress bar
- ✅ Adicionar toast notifications
- ✅ Melhorar responsividade
- ✅ Adicionar tooltips explicativos

---

## 🤔 Próximos Passos

**Perguntas para você:**
1. ✅ Concorda com a ordem das seções (1. Título/Imagens primeiro, 2. Categoria/Tipo, 3. Localização, etc.)?
2. ✅ Entendeu a diferença entre "Andar do Imóvel" (Apartamento) vs "Número de Andares da Casa" (Sobrado)?
3. ✅ Quer implementar tudo de uma vez ou fase por fase?
4. ✅ Há alguma melhoria opcional que quer priorizar? (busca CEP, upload imagens, etc.)
5. ✅ Posso começar a implementar agora?

---

## 📝 Campos Adicionados/Corrigidos Conforme PROPERTY_PARAMETERS.md

Após análise do documento `PROPERTY_PARAMETERS.md`, identifiquei:

### **✅ Já implementado corretamente:**
- `lotSize` - obrigatório para Casa, Sobrado, Terrenos, Galpões
- `suites` - obrigatório para Cobertura
- `totalFloors` - obrigatório para Sobrado (número de andares da casa)
- `state` e `zipCode` - obrigatórios
- `condoFee`, `iptu`, `homeInsurance` - conforme regras condicionais

### **⚠️ NOVO - Campo para Casa com múltiplos andares:**
No PROPERTY_PARAMETERS.md vi que:
- **Casa normal**: pode ter 1, 2 ou mais andares (campo `totalFloors` OPCIONAL)
- **Sobrado**: tem 2+ andares por definição (campo `totalFloors` OBRIGATÓRIO)

**Implementação no formulário:**
```jsx
// Card 6.7: Total de Andares
{(selectedType === 'Casa' || selectedType === 'Sobrado') && (
  <Card>
    <Label>
      Número de Andares da Casa
      {selectedType === 'Sobrado' && <span className="text-red-500">*</span>}
    </Label>
    <Input 
      type="number"
      min={1}
      value={formData.totalFloors || ''}
      onChange={(e) => setFormData(prev => ({ ...prev, totalFloors: e.target.value }))}
      required={selectedType === 'Sobrado'}
      placeholder={selectedType === 'Sobrado' ? 'Ex: 2 andares' : 'Deixe vazio se casa térrea'}
    />
    <Helper>
      {selectedType === 'Sobrado' 
        ? 'Obrigatório: Quantos andares tem este sobrado? (mínimo 2)'
        : 'Opcional: Quantos andares tem esta casa? Deixe vazio se for casa térrea (1 andar)'}
    </Helper>
  </Card>
)}

// Card 6.6: Andar do Imóvel (DIFERENTE - só para Apartamento/Sala)
{(selectedType === 'Apartamento' || selectedType === 'Cobertura' || selectedType === 'Sala comercial / Escritório') && (
  <Card>
    <Label>
      Andar do Imóvel *
    </Label>
    <Input 
      type="number"
      min={0}
      value={formData.floor || ''}
      onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
      required
      placeholder="Ex: 5º andar"
    />
    <Helper>
      Em qual andar do prédio está localizado este imóvel? (0 = térreo)
    </Helper>
  </Card>
)}
```

### **🎯 Diferença importante:**
- **`floor`**: Andar do prédio onde está o imóvel (Apartamento no 5º andar)
- **`totalFloors`** (Apartamento): Total de andares do prédio (prédio de 12 andares)
- **`totalFloors`** (Sobrado/Casa): Número de andares da própria casa (sobrado de 2 andares)

---

**Status:** 📝 Documento atualizado e pronto para implementação  
**Próxima ação:** Aguardando sua confirmação para começar a codificar! 🚀

