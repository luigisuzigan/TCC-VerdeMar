# 🏠 Guia de Exibição Condicional de Informações

Este documento define quais informações devem ser exibidas para cada tipo de imóvel.

## 📋 Princípio Geral

**REGRA DE OURO**: Só mostre o que existe! 

Se um campo não tem valor ou não é aplicável para aquele tipo de imóvel, ele **NÃO DEVE APARECER**.

---

## 🏢 Por Tipo de Imóvel

### 🏠 Casa

**Sempre mostra:**
- Tipo de imóvel
- Preço
- Área construída (m²)
- Quartos
- Banheiros
- Vagas de garagem (se > 0)
- Ano de construção (se existir)
- Suítes (se > 0)

**Mostra APENAS para casas:**
- ✅ Área do terreno/lote
- ✅ Quintal
- ❌ NÃO mostra andar
- ❌ NÃO mostra condomínio (a menos que seja casa em condomínio fechado)

**Exemplo: Casa independente**
```
✅ Tipo: Casa
✅ Ano: 2020
✅ Vagas: 2
✅ Terreno: 300m²
❌ Andar: (não mostra)
❌ Condomínio: (não mostra)
```

**Exemplo: Casa em condomínio fechado**
```
✅ Tipo: Casa em Condomínio
✅ Ano: 2020
✅ Vagas: 2
✅ Terreno: 300m²
✅ Condomínio: R$ 400/mês (mostra porque tem taxa)
❌ Andar: (não mostra)
```

---

### 🏢 Apartamento

**Sempre mostra:**
- Tipo de imóvel
- Preço
- Área construída (m²)
- Quartos
- Banheiros
- Vagas de garagem (se > 0)
- Ano de construção (se existir)
- Suítes (se > 0)

**Mostra APENAS para apartamentos:**
- ✅ Andar (ex: "5º andar de 12")
- ✅ Condomínio (valor mensal)
- ❌ NÃO mostra área do terreno

**Gasto Total:**
Se tem condomínio, mostra:
```
Estimativa mensal: R$ 2.500/mês (financiamento)
Gasto total mensal: R$ 2.950/mês (financiamento + condomínio)
```

**Exemplo: Apartamento padrão**
```
✅ Tipo: Apartamento
✅ Ano: 2021
✅ Vagas: 1
✅ Suítes: 1
✅ Andar: 7º andar de 15
✅ Condomínio: R$ 450/mês
✅ Gasto total: R$ 2.950/mês
❌ Terreno: (não mostra)
```

---

### 🏙️ Cobertura

**Trata como apartamento premium:**
- Todas as regras de apartamento
- Geralmente tem:
  - Múltiplas suítes
  - Vagas de garagem
  - Andar mais alto
  - Condomínio mais caro

**Exemplo: Cobertura**
```
✅ Tipo: Cobertura Duplex
✅ Ano: 2022
✅ Vagas: 4
✅ Suítes: 3
✅ Andar: 10º andar de 10 (último)
✅ Condomínio: R$ 1.200/mês
✅ Gasto total: R$ 8.700/mês
❌ Terreno: (não mostra)
```

---

## 💰 Cálculos Financeiros

### Estimativa Mensal (Financiamento)
```javascript
estimativa = preço × 0.0065
```

Mostra sempre para todos os tipos.

### Gasto Total Mensal
```javascript
gastoTotal = estimativa + condomínio
```

**REGRA**: Só mostra se `condoFee > 0`

**Exemplo:**
```
Apartamento R$ 400.000
Condomínio R$ 450

Estimativa: R$ 2.600/mês
Gasto total: R$ 3.050/mês ✅ (mostra)
```

```
Casa R$ 500.000
Sem condomínio

Estimativa: R$ 3.250/mês
Gasto total: ❌ (não mostra)
```

---

## 🎯 Componentes Condicionais

### PriceAndStats.jsx
```jsx
// Sempre mostra
- Preço
- Preço por m²
- Quartos
- Banheiros
- Área
- Estimativa mensal

// Condicional
{property.condoFee && (
  <div>Gasto total mensal: {estimativa + condoFee}</div>
)}

{property.rating > 0 && (
  <div>Avaliação: {rating}/10</div>
)}
```

### PropertyInfo.jsx
```jsx
// Sempre
- Tipo de imóvel

// Condicionais
{property.yearBuilt && <Card>Ano</Card>}
{property.parkingSpaces > 0 && <Card>Vagas</Card>}
{property.suites > 0 && <Card>Suítes</Card>}

// Apenas apartamentos
{isApartment && property.floor && <Card>Andar</Card>}

// Apenas casas
{isHouse && property.lotSize && <Card>Terreno</Card>}

// Se tem valor
{property.condoFee && <Card>Condomínio</Card>}
{property.iptu && <Card>IPTU</Card>}
```

### CondoInfo.jsx
```jsx
// Só renderiza se tem ALGUMA info
if (!condoFee && !iptu && !floor && !yearBuilt && !propertyCondition) {
  return null;
}

// Cada item é condicional
{condoFee && <Card>Condomínio</Card>}
{iptu && <Card>IPTU</Card>}
{floor && <Card>Andar</Card>}
{yearBuilt && <Card>Ano</Card>}
{propertyCondition && <Card>Condição</Card>}
```

---

## 📊 Matriz de Exibição

| Campo | Casa Independente | Casa em Condomínio | Apartamento | Cobertura |
|-------|-------------------|--------------------|--------------| ----------|
| **Tipo** | ✅ | ✅ | ✅ | ✅ |
| **Preço** | ✅ | ✅ | ✅ | ✅ |
| **Área (m²)** | ✅ | ✅ | ✅ | ✅ |
| **Quartos** | ✅ | ✅ | ✅ | ✅ |
| **Banheiros** | ✅ | ✅ | ✅ | ✅ |
| **Vagas** | ✅ (se > 0) | ✅ (se > 0) | ✅ (se > 0) | ✅ (se > 0) |
| **Suítes** | ✅ (se > 0) | ✅ (se > 0) | ✅ (se > 0) | ✅ (se > 0) |
| **Ano** | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) |
| **Terreno** | ✅ | ✅ | ❌ | ❌ |
| **Andar** | ❌ | ❌ | ✅ | ✅ |
| **Condomínio** | ❌ | ✅ | ✅ | ✅ |
| **IPTU** | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) |
| **Gasto Total** | ❌ | ✅ | ✅ | ✅ |
| **Condição** | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) | ✅ (se existe) |

---

## 🎨 Exemplos Visuais

### Casa Independente (Campeche)
```
🏠 Casa Térrea
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
R$ 600.000  |  R$ 4.000/m²
3 qts | 2 ba | 150 m²

Estimativa mensal: R$ 3.900/mês

📋 Informações
┌─────────────┬─────────────┬─────────────┐
│ Tipo: Casa  │ Ano: 2019   │ Vagas: 2    │
│ Suítes: 1   │ Terreno:    │ IPTU:       │
│             │ 300m²       │ R$ 1.500/ano│
└─────────────┴─────────────┴─────────────┘

❌ NÃO MOSTRA:
- Andar
- Condomínio
- Gasto total
```

### Apartamento (Lagoa)
```
🏢 Apartamento Moderno
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
R$ 450.000  |  R$ 5.625/m²
2 qts | 2 ba | 80 m²

Estimativa mensal: R$ 2.925/mês
Gasto total: R$ 3.375/mês ✅
(Financiamento + Condomínio)

📋 Informações
┌─────────────┬─────────────┬─────────────┐
│ Tipo: Apto  │ Ano: 2020   │ Vagas: 2    │
│ Suítes: 1   │ Andar: 5º/12│ Condo:      │
│             │             │ R$ 450/mês  │
└─────────────┴─────────────┴─────────────┘

❌ NÃO MOSTRA:
- Terreno
```

---

## 🔄 Lógica de Detecção

```javascript
// Detectar tipo de imóvel
const isApartment = property.type?.toLowerCase().includes('apartamento') || 
                    property.type?.toLowerCase().includes('cobertura');

const isHouse = property.type?.toLowerCase().includes('casa');

// Detectar se é condomínio
const hasCondoFee = property.condoFee && property.condoFee > 0;

// Renderização condicional
{isApartment && property.floor && (
  <AndarCard />
)}

{isHouse && property.lotSize && (
  <TerrenoCard />
)}

{hasCondoFee && (
  <GastoTotalCard />
)}
```

---

## ✅ Checklist de Validação

Ao implementar ou revisar, verificar:

- [ ] Casa independente NÃO mostra andar
- [ ] Casa independente NÃO mostra condomínio
- [ ] Casa independente NÃO mostra gasto total
- [ ] Casa independente MOSTRA terreno
- [ ] Apartamento MOSTRA andar
- [ ] Apartamento MOSTRA condomínio
- [ ] Apartamento MOSTRA gasto total
- [ ] Apartamento NÃO mostra terreno
- [ ] Campos vazios/null NÃO aparecem
- [ ] Valores zero são tratados (ex: 0 vagas = não mostra)
- [ ] Textos plurais corretos (1 vaga vs 2 vagas)

---

## 🚀 Impacto nos Componentes

### Modificados:
1. **PriceAndStats.jsx** - Adicionado gasto total condicional
2. **PropertyInfo.jsx** - Totalmente condicional por tipo
3. **CondoInfo.jsx** - Já era condicional, mantido

### Mantidos:
- PropertyCategory.jsx
- PropertyStyle.jsx
- PropertyAmenitiesEnhanced.jsx
- NaturalConditions.jsx
- NearbyPlacesSection.jsx

---

**Última atualização**: 20 de Outubro de 2025  
**Versão**: 2.0  
**Projeto**: VerdeMar - Sistema Condicional
