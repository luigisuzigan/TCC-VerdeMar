# 🎨 Design da Seção de Identificação

## 📋 Layout Proposto

```
┌─────────────────────────────────────────────────────────────────┐
│                    📝 IDENTIFICAÇÃO DO IMÓVEL                    │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  📝 Título do Anúncio * (Destaque Principal)                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │     [Digite o título do imóvel...]                       │   │
│  │     Fonte grande, negrito, chamativa                     │   │
│  │                                                    120/120│   │
│  └─────────────────────────────────────────────────────────┘   │
│  💡 Este título aparecerá em destaque nos resultados de busca  │
│                                                                   │
│  Descrição (Opcional)                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │ [Descreva o imóvel em detalhes...]                       │   │
│  │                                                           │   │
│  │                                                    800/800│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  📸 Imagens do Imóvel                                            │
│  💡 A primeira imagem será a imagem principal                    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📷 Adicionar Imagem                                       │  │
│  │  ┌──────────────────────────────┐  ┌─────────────────┐  │  │
│  │  │ Cole a URL da imagem aqui... │  │ ➕ Adicionar    │  │  │
│  │  └──────────────────────────────┘  └─────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  🖼️ Imagens Adicionadas (8)                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ┌────────────────────┐ ┌────────────────────┐ ┌──────┐  │   │
│  │ │  🖼️             ⭐ │ │  🖼️                │ │ 🖼️  │  │   │
│  │ │                     │ │                     │ │      │  │   │
│  │ │    Imagem 1         │ │    Imagem 2         │ │ 3    │  │   │
│  │ │   (PRINCIPAL)       │ │                     │ │      │  │   │
│  │ │    🗑️ Remover       │ │    🗑️ Remover       │ │ 🗑️  │  │   │
│  │ └────────────────────┘ └────────────────────┘ └──────┘  │   │
│  │                                                           │   │
│  │ ┌────────────────────┐ ┌────────────────────┐ ┌──────┐  │   │
│  │ │  🖼️                │ │  🖼️                │ │ 🖼️  │  │   │
│  │ │                     │ │                     │ │      │  │   │
│  │ │    Imagem 4         │ │    Imagem 5         │ │ 6    │  │   │
│  │ │    🗑️ Remover       │ │    🗑️ Remover       │ │ 🗑️  │  │   │
│  │ └────────────────────┘ └────────────────────┘ └──────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ⭐ Avaliação do Imóvel (0 a 10) - Opcional                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  Clique nas estrelas ou digite:                          │   │
│  │                                                           │   │
│  │  ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆ ☆    [  8.5  ]  ⬅ Digite aqui      │   │
│  │  (Clique para selecionar)   (0.0 a 10.0)                 │   │
│  │                                                           │   │
│  │  Atual: ★★★★★★★★☆☆  8.5/10  😃 Ótimo                    │   │
│  │                                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 O que você quer:

### ✅ ESTRUTURA EM UM ÚNICO BLOCO/CARD
- **Tudo dentro do mesmo card branco** com borda
- **Título da seção centralizado** no topo: "📝 IDENTIFICAÇÃO DO IMÓVEL"
- Campos organizados verticalmente um embaixo do outro

### 📝 ORDEM DOS CAMPOS:
1. **Título do Anúncio** (obrigatório) ✨
   - Input extra grande com fonte chamativa
   - Texto em negrito e maior
   - Placeholder animado
   - Contador de caracteres (120 max)
   - Dica: "Este título aparecerá em destaque"
   
2. **Descrição** (opcional)
   - Textarea grande
   - Contador de caracteres (800 max)
   
3. **Imagens do Imóvel**
   - **Campo de entrada**: Input + botão "Adicionar"
   - Cola a URL e clica em adicionar
   - URL desaparece do campo após adicionar
   
4. **Preview das Imagens Adicionadas** 
   - Cards grandes com preview da imagem
   - Primeira foto com estrela ⭐ e badge "PRINCIPAL"
   - Botão "Remover" em cada imagem
   - Grid: 3 colunas no desktop, 2 no tablet, 1 no mobile
   - Mostra a imagem de verdade (não só o ícone)
   
5. **Avaliação do Imóvel** (opcional) ⭐
   - **10 estrelas clicáveis** em linha única
   - Input ao lado para digitar valor decimal
   - Display compacto: ★★★★★★★★☆☆ 8.5/10 😃 Ótimo
   - Aceita valores de 0.0 a 10.0

## 🎯 COMO FUNCIONA:

### 🌟 Sistema de Avaliação SIMPLIFICADO:

**Duas formas simples:**
1. **Clica nas estrelas** → Define nota (1 a 10)
2. **Digita no campo** → Aceita decimal (ex: 8.5)

**Display compacto em uma linha:**
- Estrelas: ★★★★★★★★☆☆
- Nota: 8.5/10
- Emoji: 😃 Ótimo

**Emojis por nota:**
- 0-4: 😐 Regular
- 5-6: � Bom  
- 7-8: 😃 Ótimo
- 9: 🤩 Excelente
- 10: 🏆 Perfeito

## 🎯 COMO FUNCIONA:

### Adicionar Imagem:
1. Usuário cola URL no campo
2. Clica em "➕ Adicionar"
3. Imagem aparece no grid abaixo
4. Campo limpa automaticamente
5. Primeira imagem adicionada = Principal (⭐)

### Remover Imagem:
1. Clica no botão "🗑️ Remover"
2. Imagem é removida do grid
3. Se remover a primeira, a segunda vira principal

### Vantagens:
✅ Não precisa ver URL gigante
✅ Preview grande da imagem real
✅ Fácil de remover qualquer foto
✅ Visual limpo e organizado
✅ Primeira sempre é a principal

## 🎨 Estilo Visual:

```css
TÍTULO:
- Fonte: 24px (mobile) / 32px (desktop)
- Weight: 700 (extra bold)
- Cor: Gradiente emerald → teal
- Padding: 1.5rem
- Border-bottom: 2px gradient
- Placeholder animado com fade
- Shadow text sutil

CARD PRINCIPAL:
- Fundo: branco
- Border: 2px cinza com gradient no hover
- Shadow: lg com emerald glow
- Border-radius: 20px
- Padding: 2rem

SISTEMA DE ESTRELAS:
- Estrelas vazias: ☆ (cinza claro)
- Estrelas cheias: ★ (dourado #FFD700)
- Hover: scale 1.1 + brilho
- Clicável: cursor pointer
- Animação: pulse ao selecionar
- Display ao vivo: card verde com borda dourada

LABELS & BADGES:
- Obrigatório: vermelho vibrante
- Opcional: cinza suave
- Principal: dourado com estrela
- Emojis: tamanho 20px

```

## ❓ Isso é o que você quer?

Se SIM, vou implementar este design exatamente assim.
Se NÃO, me diga o que mudar:
- [ ] Mudar ordem dos campos?
- [ ] Preview em linha diferente?
- [ ] Mais/menos espaçamento?
- [ ] Título não centralizado?
- [ ] Separar em sub-cards?
