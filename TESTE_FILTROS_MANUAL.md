# 🧪 Guia de Teste - Filtros com Busca Manual

## Como Testar as Mudanças

### 1️⃣ Verificar Remoção do Campo de Busca

1. Abrir página `/explorar`
2. ✅ **Verificar**: Campo de busca por endereço/bairro NÃO aparece mais
3. ✅ **Verificar**: Apenas botões de filtro + botão verde "Buscar"

---

### 2️⃣ Testar Aplicação de Filtros SEM Busca

#### Teste 1: Filtro de Preço
```
1. Clicar no botão "Preço"
2. Definir: Min = 500000, Max = 1000000
3. Clicar "Aplicar"
4. ✅ Modal fecha
5. ✅ Chip aparece: "💰 R$ 500.000 - R$ 1.000.000"
6. ✅ URL atualiza: /explorar?priceMin=500000&priceMax=1000000
7. ⚠️ IMPORTANTE: Propriedades NÃO mudam ainda (não busca)
```

#### Teste 2: Filtro de Quartos
```
1. Clicar no botão "Quartos"
2. Selecionar: 3 quartos
3. Clicar "Aplicar"
4. ✅ Chip aparece: "🛏️ 3 quartos"
5. ✅ URL atualiza: /explorar?priceMin=...&bedrooms=3
6. ⚠️ IMPORTANTE: Ainda sem buscar
```

#### Teste 3: Múltiplos Filtros
```
1. Aplicar Preço (como acima)
2. Aplicar Quartos (como acima)
3. Aplicar Tipo (ex: Apartamento)
4. ✅ 3 chips aparecem
5. ✅ URL tem todos os parâmetros
6. ⚠️ IMPORTANTE: Resultados ainda são os da busca inicial
```

---

### 3️⃣ Testar Botão "Buscar"

```
1. Aplicar alguns filtros (sem buscar)
2. Clicar no botão verde "Buscar"
3. ✅ Loading aparece
4. ✅ Console mostra: "🔍 Botão Buscar clicado - disparando busca"
5. ✅ Console mostra: "=== useEffect FETCH iniciado ==="
6. ✅ Propriedades são carregadas com os filtros aplicados
7. ✅ Contador atualiza: "X imóveis encontrados"
```

---

### 4️⃣ Testar Remoção de Filtros

#### Remover Individual
```
1. Aplicar 3 filtros diferentes
2. Clicar no "X" de um dos chips
3. ✅ Chip desaparece
4. ✅ URL atualiza (sem aquele parâmetro)
5. ⚠️ IMPORTANTE: Ainda não busca
6. Clicar "Buscar"
7. ✅ Agora busca sem aquele filtro
```

#### Limpar Todos
```
1. Aplicar vários filtros
2. Clicar "Limpar Todos"
3. ✅ Todos os chips desaparecem
4. ✅ URL volta para /explorar (sem parâmetros)
5. ⚠️ IMPORTANTE: Ainda não busca
6. Clicar "Buscar"
7. ✅ Busca todos os imóveis (sem filtros)
```

---

### 5️⃣ Testar Filtro de Localização

```
1. Clicar "Localização"
2. Mapa flutuante abre
3. Desenhar uma área no mapa
4. Clicar "Aplicar Área"
5. ✅ Mapa fecha
6. ✅ Filtro de área é salvo
7. ✅ Toast aparece: "🎯 X imóveis encontrados na área desenhada"
8. ⚠️ IMPORTANTE: Ainda não busca os resultados
9. Clicar "Buscar"
10. ✅ Mostra apenas imóveis na área desenhada
```

---

### 6️⃣ Verificar Console

Ao aplicar filtros (ANTES de clicar "Buscar"):
```javascript
// ✅ NÃO deve aparecer:
"=== useEffect FETCH iniciado ==="
"Query final: ..."
```

Ao clicar "Buscar":
```javascript
// ✅ DEVE aparecer:
"🔍 Botão Buscar clicado - disparando busca"
"=== useEffect FETCH iniciado ==="
"Query final: ..."
"✅ Propriedades recebidas da API: X"
```

---

### 7️⃣ Testar Comportamento Inicial

```
1. Abrir /explorar pela primeira vez
2. ✅ Busca automática acontece (carrega todos os imóveis)
3. ✅ Console mostra: "=== useEffect FETCH iniciado ==="
4. ✅ Propriedades são exibidas
```

---

### 8️⃣ Testar URL Direta

```
1. Abrir: /explorar?priceMin=500000&bedrooms=3
2. ✅ URL é lida corretamente
3. ✅ Chips aparecem com os filtros da URL
4. ✅ Busca automática acontece (no mount)
5. ✅ Resultados já aparecem filtrados
```

---

### 9️⃣ Testar Paginação

```
1. Aplicar filtro de preço
2. Clicar "Buscar"
3. Ver resultados da página 1
4. Clicar "Próxima Página"
5. ✅ Busca página 2 com os mesmos filtros
6. ✅ URL atualiza: /explorar?priceMin=...&page=2
```

---

## 🐛 Bugs Esperados (Não Devem Acontecer)

### ❌ Busca ao Aplicar Filtro
```
ERRO: Clicar "Aplicar" no modal e as propriedades mudarem
CAUSA: setShouldSearch(true) em lugar errado
SOLUÇÃO: Verificar updateFilter e applyFilters
```

### ❌ Não Busca ao Clicar "Buscar"
```
ERRO: Clicar "Buscar" e nada acontecer
CAUSA: handleFilterClick não chama setShouldSearch(true)
SOLUÇÃO: Verificar case 'search' no handleFilterClick
```

### ❌ Erro de Prop no Console
```
ERRO: Warning sobre prop "onSearch" não utilizada
CAUSA: TopFiltersBar ainda espera onSearch
SOLUÇÃO: Remover onSearch={handleSearch} do JSX
```

---

## ✅ Checklist Final

- [ ] Campo de busca por endereço removido
- [ ] Aplicar filtro NÃO dispara busca
- [ ] URL atualiza ao aplicar filtro
- [ ] Chips de filtros aparecem
- [ ] Botão "Buscar" dispara busca
- [ ] Console mostra mensagem ao clicar "Buscar"
- [ ] Remover filtro individual funciona
- [ ] "Limpar Todos" remove todos os filtros
- [ ] Busca inicial no mount funciona
- [ ] URL com filtros funciona (busca automática)
- [ ] Paginação funciona
- [ ] Filtro de localização funciona
- [ ] Sem erros no console
- [ ] Sem warnings no console

---

## 🚀 Comandos para Testar

### Backend (Terminal 1)
```bash
cd back
npm start
```

### Frontend (Terminal 2)
```bash
cd front
npm run dev
```

### Abrir no Navegador
```
http://localhost:5173/explorar
```

---

## 📊 Métricas de Sucesso

### Performance
- **Antes**: Aplicar 3 filtros = 3 requisições HTTP
- **Depois**: Aplicar 3 filtros + Buscar = 1 requisição HTTP

### Usabilidade
- **Antes**: Resultados mudam a cada filtro (confuso)
- **Depois**: Usuário configura tudo e busca quando quiser (controle)

### UX
- **Antes**: Campo de busca redundante com mapa
- **Depois**: Interface limpa, apenas o necessário
