# 🚀 Guia Rápido - Filtros Ativos

## Como Usar

### 1️⃣ **Aplicar Filtros**
Na página Explorar, use a barra de filtros no topo:
- 🔍 **Buscar** - Pesquisa geral
- 📍 **Localização** - Cidade/Bairro ou área no mapa
- 💰 **Preço** - Define range de valores
- 🏠 **Tipo** - Casa, Apartamento, etc.
- 🛏️ **Quartos** - Quantidade mínima
- ➕ **Mais Filtros** - Abre modal com todas as opções

### 2️⃣ **Ver Filtros Aplicados**
Assim que você aplicar filtros, aparecerá automaticamente abaixo da barra:

```
╔════════════════════════════════════════════════╗
║  ┃ Filtros Ativos  ③    🗑️ Limpar tudo        ║
╠════════════════════════════════════════════════╣
║  📍 Florianópolis ❌  💰 R$ 300k-800k ❌       ║
║  🏠 Apartamento ❌                             ║
╚════════════════════════════════════════════════╝
```

### 3️⃣ **Remover Filtros**

#### **Opção A: Individual**
Clique no **X** de qualquer chip para removê-lo:
- Click em ❌ → Filtro removido
- Animação suave de saída
- Busca atualiza automaticamente

#### **Opção B: Todos de Uma Vez**
Clique em **"🗑️ Limpar tudo"**:
- Remove TODOS os filtros
- Volta para listagem completa
- Reset da busca

---

## 🎨 Entendendo as Cores

Cada cor representa uma categoria:

| Cor | Categoria | Exemplo |
|-----|-----------|---------|
| 🟢 Verde Esmeralda | Área Desenhada | `🗺️ 15 imóveis na área` |
| 🔵 Azul | Localização | `📍 Florianópolis` |
| 🟣 Roxo | Tipo de Imóvel | `🏠 Apartamento` |
| 🟢 Verde | Preço | `💰 R$ 300k - R$ 800k` |
| 🟡 Âmbar | Área (m²) | `📏 100 - 250 m²` |
| 🔴 Rosa | Quartos | `🛏️ 2+ quartos` |
| 🔵 Ciano | Banheiros | `🚿 2+ banheiros` |
| ⚫ Cinza | Vagas | `🚗 2+ vagas` |
| 🟣 Índigo | Suítes | `🛁 1+ suítes` |
| 🟣 Violeta | Comodidades | `✨ Piscina` |
| 🔵 Azul Céu | Cond. Condomínio | `🏢 Academia` |
| 🟠 Laranja | Condição | `🏗️ Novo/Na planta` |

---

## 💡 Dicas de Uso

### **Dica 1: Refinar Gradualmente**
1. Comece com filtros amplos (localização)
2. Vá refinando (preço, tipo)
3. Finalize com detalhes (quartos, comodidades)

**Exemplo:**
```
Passo 1: 📍 Florianópolis → 150 imóveis
Passo 2: + 💰 R$ 300k-800k → 45 imóveis
Passo 3: + 🏠 Apartamento → 23 imóveis
Passo 4: + 🛏️ 2+ quartos → 12 imóveis
```

### **Dica 2: Use a Área no Mapa**
Desenhe uma área específica para busca precisa:
1. Clique em "Localização"
2. Ative o mapa
3. Desenhe um polígono na área desejada
4. Veja o chip: `🗺️ X imóveis na área desenhada`

**Prioridade:** Área desenhada sobrescreve filtro de cidade!

### **Dica 3: Combine Filtros**
Não tenha medo de usar vários filtros juntos:

```
✅ BOM:
📍 Balneário Camboriú
💰 R$ 500k - R$ 1M
🏠 Apartamento
🛏️ 2+ quartos
🚗 1+ vagas
✨ Piscina
🏢 Academia
→ Resultado: Muito específico e útil!
```

### **Dica 4: Experimente!**
Se não encontrar o que quer:
1. Clique em "🗑️ Limpar tudo"
2. Comece com novos critérios
3. Teste diferentes combinações

---

## 🎯 Casos de Uso

### **Caso 1: Busca Rápida**
"Quero um apartamento em Floripa até R$ 500k"

```
1. 📍 Florianópolis
2. 💰 Até R$ 500.000
3. 🏠 Apartamento
→ Clique em "Buscar"
```

### **Caso 2: Busca Detalhada**
"Casa na praia, 3 quartos, com piscina, até R$ 1M"

```
1. 📍 [Cidade praiana]
2. 💰 Até R$ 1.000.000
3. 🏠 Casa
4. 🛏️ 3+ quartos
5. ✨ Piscina
→ Clique em "Buscar"
```

### **Caso 3: Área Específica**
"Imóveis em uma região específica do bairro"

```
1. 📍 Localização → Abrir Mapa
2. Desenhar área desenhada no bairro
3. Ver: 🗺️ 15 imóveis na área desenhada
4. Adicionar filtros extras se quiser
→ Resultados precisos!
```

---

## ⚡ Atalhos e Truques

### **Atalho 1: Remover Filtro Rapidamente**
- Clique direto no ❌ do chip
- Não precisa abrir o modal novamente

### **Atalho 2: Resetar Busca**
- Um clique em "🗑️ Limpar tudo"
- Volta ao estado inicial

### **Atalho 3: Ver Quantos Filtros**
- Número no badge mostra total
- `Filtros Ativos ⑤` = 5 filtros ativos

### **Atalho 4: Tooltip Informativo**
- Passe o mouse sobre o chip
- Veja "Clique para remover: [filtro]"

---

## 🔄 Fluxo Completo

```
┌─────────────────────────────────────────────────────┐
│ 1. EXPLORAR → 2. FILTRAR → 3. VER CHIPS → 4. REFINAR│
└─────────────────────────────────────────────────────┘
         ↓              ↓              ↓              ↓
    Página         Barra de      Componente      Adicionar ou
    Explorar       Filtros       ActiveFilters    remover filtros
                      ↓              ↓              ↓
                  Aplicar        Ver quais      Clique no ❌
                  filtros        estão ativos    ou "Limpar tudo"
                      ↓              ↓              ↓
                  Resultados     Coloridos       Busca atualiza
                  aparecem       por categoria    automaticamente
```

---

## 🎨 Interações Visuais

### **Hover (Passar o Mouse)**
```
Normal → Hover
─────────────────
Tamanho normal → Aumenta 5%
Sem sombra → Sombra aparece
X parado → X gira 90°
Cor normal → Cor mais vibrante
```

### **Click (Clicar)**
```
Click → Animação
─────────────────
Ripple effect → Onda expande
Fade out → Chip desaparece
Busca atualiza → Novos resultados
```

---

## ❓ FAQ

**P: Os filtros salvam quando eu saio da página?**
R: Sim! Os filtros ficam na URL, então você pode compartilhar o link ou voltar depois.

**P: Posso aplicar quantos filtros quiser?**
R: Sim! Não há limite. Combine quantos precisar.

**P: O que acontece se não houver resultados?**
R: A página mostrará "0 imóveis encontrados". Tente remover alguns filtros.

**P: A área desenhada funciona com outros filtros?**
R: Sim! Você pode combinar área + preço + tipo + quartos, etc.

**P: Como sei quantos imóveis tem na área?**
R: O chip mostra: `🗺️ 15 imóveis na área desenhada`

---

## 🎉 Aproveite!

Agora você tem um sistema de filtros:
- ✅ Bonito e moderno
- ✅ Fácil de usar
- ✅ Muito funcional
- ✅ Com animações suaves
- ✅ Cores organizadas
- ✅ Remoção individual ou em massa

**Boa busca! 🏖️🏠**
