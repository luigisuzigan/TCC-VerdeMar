# 🧪 TESTE COMPLETO DE FILTROS - Guia Passo a Passo

## ⚙️ Configuração Inicial

1. **Abra o Console do Navegador** (F12) e vá para a aba "Console"
2. **Acesse** `http://localhost:5173/explorar`
3. **Limpe todos os filtros** clicando no botão "Limpar Filtros" (se houver)

---

## 📊 LOGS IMPLEMENTADOS

Agora o sistema tem logs COMPLETOS em cada etapa:

### 🔍 Ao aplicar cada filtro:
- **PriceModal**: `💰 PriceModal - handleApply chamado`
- **PropertyTypeModal**: `🏠 handlePropertyTypeApply recebeu`
- **RoomsModal**: `🛏️ handleRoomsApply recebeu`
- **AreaModal**: `📏 handleAreaApply recebeu`

### ⚙️ No applyFilters:
- `⚙️ applyFilters chamado com: {...}`
- `⚙️ Filters atuais ANTES do set: {...}`
- `⚙️ URL params gerados: ...`

### 🔧 No buildApiQuery:
- `🔧 buildApiQuery recebeu filters: {...}`
- `💰 Adicionando minPrice: ...`
- `💰 Adicionando maxPrice: ...`
- `🏠 Adicionando types: [...]`
- `🛏️ Adicionando minBedrooms: ...`
- `🔧 Query final construída: ...`
- `🔧 Parâmetros individuais: {...}`

### 🔍 Ao clicar em Buscar:
- `🔍 Botão Buscar clicado - disparando busca`
- `📊 Filtros atuais: {...}`

---

## 🧪 TESTES A REALIZAR

### 1️⃣ TESTE: Filtro de Preço

#### Cenário A: Preço Mínimo apenas
1. Clique no botão **"Preço"**
2. Digite `500000` no campo "Preço Mínimo"
3. Clique em **"Aplicar Filtro"**
4. **Clique no botão "Buscar" (verde com lupa)**

**✅ VERIFICAR NO CONSOLE:**
```
💰 PriceModal - handleApply chamado
💰 minPrice (raw): 500000
💰 Enviando filtro: {priceMin: "500000", priceMax: ""}
💰 handlePriceApply recebeu: {priceMin: "500000", priceMax: ""}
⚙️ applyFilters chamado com: {...priceMin: "500000"...}
```

**Depois ao clicar em BUSCAR:**
```
🔧 buildApiQuery recebeu filters: {...}
💰 Adicionando minPrice: 500000
🔧 Query final construída: published=true&limit=24&_t=...&minPrice=500000
```

#### Cenário B: Preço Máximo apenas
1. Limpe os filtros
2. Clique em **"Preço"**
3. Digite `1000000` no campo "Preço Máximo"
4. Clique em **"Aplicar Filtro"**
5. **Clique em "Buscar"**

**✅ VERIFICAR:**
```
💰 maxPrice (raw): 1000000
💰 Adicionando maxPrice: 1000000
🔧 Query: ...&maxPrice=1000000
```

#### Cenário C: Faixa de Preço (Min e Max)
1. Limpe os filtros
2. Clique em **"Preço"**
3. Min: `500000`, Max: `1500000`
4. Clique em **"Aplicar Filtro"**
5. **Clique em "Buscar"**

**✅ VERIFICAR:**
```
💰 minPrice (raw): 500000
💰 maxPrice (raw): 1500000
💰 Adicionando minPrice: 500000
💰 Adicionando maxPrice: 1500000
🔧 Query: ...&minPrice=500000&maxPrice=1500000
```

#### Cenário D: Opções Rápidas
1. Limpe os filtros
2. Clique em **"Preço"**
3. Clique em **"500k - 1M"**
4. Verifique se os campos foram preenchidos automaticamente
5. Clique em **"Aplicar Filtro"**
6. **Clique em "Buscar"**

**✅ VERIFICAR:**
```
💰 minPrice (raw): 500000
💰 maxPrice (raw): 1000000
```

---

### 2️⃣ TESTE: Filtro de Tipo de Imóvel

1. Limpe os filtros
2. Clique em **"Tipo de imóvel"**
3. Selecione **"Casa"** e **"Apartamento"**
4. Clique em **"Aplicar Seleção"**
5. **Clique em "Buscar"**

**✅ VERIFICAR NO CONSOLE:**
```
🏠 handlePropertyTypeApply recebeu: {propertyTypes: ["casa", "apartamento"]}
⚙️ applyFilters chamado com: {...propertyTypes: ["casa", "apartamento"]...}
🏠 Adicionando types: ["casa", "apartamento"]
🔧 Query: ...&types=casa,apartamento
```

---

### 3️⃣ TESTE: Filtro de Quartos/Banheiros

1. Limpe os filtros
2. Clique em **"Quartos e banheiros"**
3. Selecione:
   - **3+ Quartos**
   - **2+ Banheiros**
   - **1+ Suíte**
4. Clique em **"Aplicar"**
5. **Clique em "Buscar"**

**✅ VERIFICAR NO CONSOLE:**
```
🛏️ handleRoomsApply recebeu: {bedrooms: 3, bathrooms: 2, suites: 1}
⚙️ applyFilters chamado com: {...bedrooms: 3, bathrooms: 2, suites: 1...}
🛏️ Adicionando minBedrooms: 3
🚿 Adicionando minBathrooms: 2
🛁 Adicionando minSuites: 1
🔧 Query: ...&minBedrooms=3&minBathrooms=2&minSuites=1
```

---

### 4️⃣ TESTE: Filtro de Área

1. Limpe os filtros
2. Clique em **"Área"**
3. Digite:
   - Área Mínima: `100`
   - Área Máxima: `300`
4. Clique em **"Aplicar Filtro"**
5. **Clique em "Buscar"**

**✅ VERIFICAR NO CONSOLE:**
```
📏 handleAreaApply recebeu: {areaMin: "100", areaMax: "300"}
⚙️ applyFilters chamado com: {...areaMin: "100", areaMax: "300"...}
📏 Adicionando minArea: 100
📏 Adicionando maxArea: 300
🔧 Query: ...&minArea=100&maxArea=300
```

---

### 5️⃣ TESTE COMBINADO: Múltiplos Filtros

1. Limpe os filtros
2. Aplique:
   - **Preço**: 500k - 1.5M
   - **Tipo**: Casa e Apartamento
   - **Quartos**: 3+
   - **Área**: 100 - 300 m²
3. **IMPORTANTE: NÃO clique em Buscar ainda**
4. Verifique no console que os filtros foram salvos mas NÃO dispararam busca

**✅ VERIFICAR:**
```
⚙️ Filters salvos no estado - aguardando clique em Buscar
```

5. Agora **CLIQUE EM BUSCAR**

**✅ VERIFICAR:**
```
🔍 Botão Buscar clicado - disparando busca
📊 Filtros atuais: {
  priceMin: "500000",
  priceMax: "1500000",
  propertyTypes: ["casa", "apartamento"],
  bedrooms: 3,
  areaMin: "100",
  areaMax: "300"
}
🔧 buildApiQuery recebeu filters: {...}
💰 Adicionando minPrice: 500000
💰 Adicionando maxPrice: 1500000
🏠 Adicionando types: ["casa", "apartamento"]
🛏️ Adicionando minBedrooms: 3
📏 Adicionando minArea: 100
📏 Adicionando maxArea: 300
🔧 Query final: ...&minPrice=500000&maxPrice=1500000&types=casa,apartamento&minBedrooms=3&minArea=100&maxArea=300
```

---

## 🐛 PROBLEMAS CONHECIDOS A VERIFICAR

### Problema 1: Preço não filtra
**Sintoma**: Query mostra `minPrice=500000` mas retorna imóveis de qualquer preço

**Debug**:
1. Copie a query completa do console
2. Verifique se `minPrice` e `maxPrice` estão na URL
3. Verifique se há erros no backend (terminal do backend)

**Possível causa**: 
- Backend não está recebendo os parâmetros
- Conversão de string para número falhando
- Campo `price` no banco de dados com valor null

### Problema 2: Tipos não filtra
**Sintoma**: Query mostra `types=casa,apartamento` mas retorna todos os tipos

**Debug**:
1. Verifique se o array está sendo convertido para string separada por vírgulas
2. No backend, verifique se `types.split(',')` está funcionando
3. Verifique se o campo `type` no banco tem valores corretos

### Problema 3: Filtro limpa sozinho
**Sintoma**: Ao aplicar filtro, ele some imediatamente

**Debug**:
1. Verifique se `applyFilters` está sendo chamado
2. Verifique se `setFilters` está recebendo o objeto correto
3. Procure por `setFilters({})` sendo chamado sem querer

---

## 📋 CHECKLIST DE TESTES

- [ ] Preço Mínimo funciona
- [ ] Preço Máximo funciona
- [ ] Faixa de preço (min + max) funciona
- [ ] Opções rápidas de preço funcionam
- [ ] Tipo de imóvel (único) funciona
- [ ] Tipo de imóvel (múltiplos) funciona
- [ ] Quartos funciona
- [ ] Banheiros funciona
- [ ] Suítes funciona
- [ ] Área mínima funciona
- [ ] Área máxima funciona
- [ ] Faixa de área (min + max) funciona
- [ ] Múltiplos filtros combinados funcionam
- [ ] Botão Buscar dispara a busca
- [ ] Aplicar filtro NÃO dispara busca automática
- [ ] Limpar filtro funciona
- [ ] URL atualiza com os filtros
- [ ] Recarregar página mantém filtros da URL

---

## 📤 COMO REPORTAR PROBLEMAS

Se encontrar algum problema, copie do console:

1. **Os logs do filtro que falhou** (ex: logs com 💰 para preço)
2. **A query final** (linha com `🔧 Query final construída:`)
3. **Os parâmetros individuais** (linha com `🔧 Parâmetros individuais:`)
4. **Quais imóveis foram retornados** (linha com `✅ Propriedades recebidas da API:`)

Cole tudo aqui ou me envie para eu analisar!

---

## 🎯 PRÓXIMOS PASSOS

Depois de testar tudo:
1. Identifique quais filtros **FUNCIONAM** ✅
2. Identifique quais filtros **NÃO FUNCIONAM** ❌
3. Para os que não funcionam, me envie os logs
4. Vou corrigir cada problema identificado

---

**Bora testar! 🚀**
