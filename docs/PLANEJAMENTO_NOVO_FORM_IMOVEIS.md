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

### **Card 3.1: � Endereço Principal**
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
- [Botão: Buscar coordenadas pelo endereço]
- [Preview: Mini-mapa mostrando localização]
```
**Por quê?** Necessário para exibir no mapa e calcular locais próximos

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

### **Card 6.1: 📐 Áreas**
```
- Área Construída * (m²) [sempre obrigatório]
- Área do Lote/Terreno (m²) * [obrigatório para Casa, Sobrado, Terrenos, Galpões]
- [Helper dinâmico por tipo]
- [Cálculo: Preço por m²]
```
**Helpers contextuais:**
- Para **Terrenos**: "Para terrenos, área construída = área do lote"
- Para **Casa/Sobrado**: "Área do lote pode ser maior que área construída"
- Para **Apartamento**: "Área do lote não se aplica" (campo oculto)

---

### **Card 6.2: 🛏️ Quartos** [CONDICIONAL - só aparece para tipos residenciais]
```
- Quartos * [obrigatório para Casa, Sobrado, Apartamento, Cobertura]
- [Não aparece para: Terrenos, Salas comerciais, Galpões, Lojas]
```

---

### **Card 6.3: 🚿 Banheiros** [CONDICIONAL]
```
- Banheiros * [obrigatório para Casa, Sobrado, Apartamento, Cobertura]
- [Inclui lavabos]
```

---

### **Card 6.4: 👑 Suítes** [CONDICIONAL]
```
- Suítes * [obrigatório para Cobertura]
- Suítes (opcional para Casa, Sobrado, Hotel/Pousada)
- [Helper: Quartos com banheiro privativo]
- [Não aparece para: Terrenos, Kitnets, Comerciais]
```

---

### **Card 6.5: 🚗 Vagas de Garagem** [CONDICIONAL]
```
- Vagas de Garagem * [obrigatório para Casa, Sobrado, Apartamento, Cobertura]
- [Não aparece para: Terrenos sem construção]
```

---

### **Card 6.6: 🏢 Andar do Imóvel** [CONDICIONAL - só Apartamento, Cobertura, Sala]
```
- Andar * [obrigatório para Apartamento, Cobertura, Sala comercial]
- [Helper: Em qual andar do prédio está localizado]
- [NÃO aparece para: Casa, Sobrado, Terreno, Galpão]
```

---

### **Card 6.7: 🏗️ Total de Andares** [CONDICIONAL]
```
- Total de Andares do Prédio * [obrigatório para Apartamento, Cobertura, Condomínio]
- [Helper: Quantos andares tem o prédio]

OU

- Número de Andares da Casa (opcional para Casa, obrigatório para Sobrado)
- [Helper: Quantos andares tem esta casa? Ex: casa de 2 andares]
```
**Por quê separar?**
- **Apartamento**: totalFloors = andares do prédio (ex: 12 andares)
- **Sobrado**: totalFloors = andares da própria casa (ex: 2 andares)
- **Casa**: totalFloors = opcional (se tem mais de 1 andar)

---

## 🔢 SEÇÃO 7: COMODIDADES E AMENIDADES (Opcional para todos)

### **Card 7.1: ✅ Comodidades** (card expansível)
```
[Header]
✅ Comodidades (X selecionadas)
[Botão: Limpar todas]

[Grid 4 colunas de checkboxes]
- Piscina
- WiFi
- Churrasqueira
- Academia
- ... (lista completa)

[Altura máxima com scroll]
```
**Por quê?** Diferenciais importantes, mas opcional

---

## 🔢 SEÇÃO 8: CONDIÇÕES NATURAIS (Opcional para todos)

### **Card 8.1: 🌿 Condições Naturais** (card expansível)
```
[Header]
🌿 Condições Naturais (X selecionadas)
[Botão: Limpar todas]

[Grid 4 colunas de checkboxes]
- Vista para o mar
- Ventilação cruzada
- Sol da manhã
- ... (lista completa)

[Altura máxima com scroll]
```
**Por quê?** Diferenciais ambientais importantes

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

