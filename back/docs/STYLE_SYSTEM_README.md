# 🎨 Sistema de Estilos Arquitetônicos

## 📝 Visão Geral

Novo sistema que permite categorizar e filtrar imóveis por **estilo arquitetônico/construtivo**, com seção visual no Home e filtro completo na página Explorar.

---

## ✨ Funcionalidades Implementadas

### 1. **Campo `style` no Banco de Dados**
- ✅ Documentado em `PROPERTY_PARAMETERS.md`
- 15 estilos disponíveis: Moderno, Clássico, Rústico, Industrial, Minimalista, Colonial, Contemporâneo, Tropical, Container, Steel Frame, Madeira, Sustentável, Luxo, Compacto, Loft

### 2. **Seção "Estilos em Destaque" no Home**
- ✅ Nova Section7 com grid de 6 cards visuais
- ✅ Cards interativos com hover effects
- ✅ Cada card mostra: imagem, nome, descrição e quantidade de imóveis
- ✅ Clicar no card leva para `/explorar?style=NomeDoEstilo`

### 3. **Filtro de Estilo na Página Explorar**
- ✅ Botão "Estilo" na TopFiltersBar (visível em telas xl+)
- ✅ Modal StyleModal com todos os 15 estilos
- ✅ Seleção múltipla de estilos
- ✅ Cores personalizadas para cada estilo
- ✅ Integração completa com sistema de filtros

---

## 📁 Arquivos Criados/Modificados

### **Criados:**
```
front/src/components/Home/StyleCard.jsx
front/src/components/Home/Section7.jsx
front/src/components/Explorar/Modals/StyleModal.jsx
back/STYLE_SYSTEM_README.md (este arquivo)
```

### **Modificados:**
```
front/src/pages/Home/index.jsx
front/src/pages/Explorar/index.jsx
front/src/components/Explorar/TopFiltersBar.jsx
front/src/utils/filterHelpers.js
back/PROPERTY_PARAMETERS.md
```

---

## 🎨 Estilos Disponíveis

| Estilo | Ícone | Descrição | Cor |
|--------|-------|-----------|-----|
| Moderno | 🏙️ | Design contemporâneo com linhas retas, minimalismo | Azul |
| Clássico | 🏛️ | Arquitetura tradicional elegante | Âmbar |
| Rústico | 🌾 | Madeira, pedras e charme natural | Laranja |
| Industrial | 🏭 | Concreto aparente e pé-direito alto | Cinza |
| Minimalista | ⚪ | Clean, simples e funcional | Cinza |
| Colonial | 🏰 | Estilo português tradicional | Vermelho |
| Contemporâneo | 🎨 | Mix moderno com tradição | Roxo |
| Tropical | 🌴 | Integração com a natureza | Verde |
| Container | 📦 | Sustentável e inovador | Turquesa |
| Steel Frame | 🔩 | Estrutura metálica moderna | Zinco |
| Madeira | 🪵 | Estrutura em madeira | Âmbar |
| Sustentável | ♻️ | Eco-friendly e green building | Esmeralda |
| Luxo | 💎 | Alto padrão e exclusivo | Amarelo |
| Compacto | 🎯 | Otimizado para espaços pequenos | Índigo |
| Loft | 🏗️ | Pé-direito alto, espaços integrados | Violeta |

---

## 🖼️ Imagens Necessárias

Para a Section7 funcionar visualmente, você precisa adicionar imagens em:

```
public/Home/styles/
  ├── modern.jpg       (Imóvel moderno)
  ├── rustic.jpg       (Imóvel rústico)
  ├── container.jpg    (Casa container)
  ├── luxury.jpg       (Imóvel de luxo)
  ├── industrial.jpg   (Loft industrial)
  └── tropical.jpg     (Casa tropical)
```

**Dica**: Use imagens de alta qualidade (pelo menos 1200x900px) que representem bem cada estilo.

---

## 🔧 Como Usar

### **1. Adicionar Estilo a um Imóvel (Backend)**

No painel admin, ao criar/editar imóvel:

```javascript
// Adicionar campo no formulário:
<select name="style">
  <option value="">Selecione um estilo</option>
  <option value="Moderno">Moderno</option>
  <option value="Rústico">Rústico</option>
  <option value="Container">Container</option>
  <!-- etc -->
</select>

// Ao salvar:
await prisma.property.create({
  data: {
    title: "Casa Container Moderna",
    style: "Container",
    // ... outros campos
  }
});
```

### **2. Buscar Imóveis por Estilo**

```javascript
// URL: /explorar?style=Moderno
// ou múltiplos: /explorar?styles=Moderno,Rústico

// Backend (já filtrado automaticamente pela query):
const style = req.query.style || req.query.styles;
if (style) {
  const styles = style.split(',');
  whereClause.style = { in: styles };
}
```

### **3. Clicar em Card no Home**

```jsx
// Quando usuário clica em "Moderno":
// → Redireciona para: /explorar?style=Moderno
// → Página Explorar carrega com filtro "Moderno" já aplicado
```

---

## 🎯 Fluxo do Usuário

### **Caminho 1: A partir do Home**
1. Usuário vê seção "Estilos em Destaque"
2. Clica em card "Moderno"
3. É levado para `/explorar?style=Moderno`
4. Vê todos os imóveis modernos
5. Pode adicionar mais filtros (preço, localização, etc.)

### **Caminho 2: A partir do Explorar**
1. Usuário está navegando imóveis
2. Clica no botão "Estilo" na TopFiltersBar
3. Abre modal com 15 estilos
4. Seleciona "Rústico" e "Container"
5. Clica em "Aplicar"
6. URL atualiza para `/explorar?styles=Rústico,Container`
7. Lista de imóveis é filtrada

---

## 📊 Atualizar Contagem de Imóveis

Atualmente os cards mostram contagens hardcoded (45, 28, etc.). Para tornar dinâmico:

### **Backend - Criar endpoint:**

```javascript
// back/src/properties/routes.js

router.get('/stats/by-style', async (req, res) => {
  try {
    const styleCounts = await prisma.property.groupBy({
      by: ['style'],
      where: { published: true },
      _count: { style: true },
    });

    const result = styleCounts.reduce((acc, item) => {
      if (item.style) {
        acc[item.style] = item._count.style;
      }
      return acc;
    }, {});

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Frontend - Buscar dados reais:**

```jsx
// Section7.jsx
const [styleCounts, setStyleCounts] = useState({});

useEffect(() => {
  async function fetchStyleCounts() {
    const { data } = await api.get('/properties/stats/by-style');
    setStyleCounts(data);
  }
  fetchStyleCounts();
}, []);

// Atualizar cards:
const featuredStyles = [
  {
    value: 'Moderno',
    name: 'Moderno',
    count: styleCounts['Moderno'] || 0, // Contagem real
    // ...
  }
];
```

---

## 🚀 Próximos Passos

### **Essencial:**
1. ✅ Adicionar campo `style` no schema do Prisma
2. ✅ Migrar banco de dados
3. ✅ Adicionar imagens dos estilos em `public/Home/styles/`
4. ✅ Atualizar formulário de criação/edição no Admin Panel

### **Melhorias:**
- [ ] Endpoint para contagem real de imóveis por estilo
- [ ] Permitir múltiplos estilos por imóvel (ex: "Moderno + Sustentável")
- [ ] Criar página dedicada `/estilos` com galeria completa
- [ ] Sistema de tags visuais na página de detalhes
- [ ] Sugestões de imóveis similares por estilo

---

## 🎨 Exemplos de Uso do Modal

### **Selecionar um estilo:**
```
Usuário abre modal → Clica em "Moderno" → Aplica
Resultado: /explorar?styles=Moderno
```

### **Selecionar múltiplos:**
```
Usuário abre modal → Clica em "Moderno", "Rústico", "Container" → Aplica
Resultado: /explorar?styles=Moderno,Rústico,Container
```

### **Limpar seleção:**
```
Usuário clica em "Limpar" → Todos os estilos são desmarcados
```

---

## 📱 Responsividade

- **Desktop (xl+)**: Botão "Estilo" visível na TopFiltersBar
- **Tablet/Mobile**: Botão fica dentro do "Mais filtros"
- **Section7**: Grid responsivo (1 coluna → 2 colunas → 3 colunas)

---

## 💡 Dicas de Implementação

### **Para o Admin Panel:**

```jsx
// Adicionar no formulário de criação/edição:
<div className="mb-4">
  <label className="block text-sm font-medium mb-2">
    Estilo Arquitetônico
  </label>
  <select
    value={formData.style || ''}
    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
    className="w-full p-3 border rounded-lg"
  >
    <option value="">Nenhum estilo específico</option>
    <option value="Moderno">🏙️ Moderno</option>
    <option value="Rústico">🌾 Rústico</option>
    <option value="Container">📦 Container</option>
    <option value="Luxo">💎 Luxo</option>
    {/* ... mais opções */}
  </select>
  <p className="text-xs text-gray-500 mt-1">
    Ajuda os clientes a encontrar imóveis com a arquitetura preferida
  </p>
</div>
```

### **Para buscar no backend:**

```javascript
// Adicionar no buildWhereClause da rota /properties:
if (req.query.styles) {
  const styles = req.query.styles.split(',');
  where.style = { in: styles };
}
```

---

## ✅ Checklist de Implementação

- [x] Campo `style` documentado
- [x] Section7 criada no Home
- [x] StyleCard component criado
- [x] StyleModal criado
- [x] Integração com TopFiltersBar
- [x] filterHelpers atualizado
- [x] URL params suportados (`?style=` e `?styles=`)
- [ ] Adicionar campo no Prisma schema
- [ ] Migrar banco de dados
- [ ] Adicionar no formulário admin
- [ ] Adicionar imagens dos estilos
- [ ] Testar filtro end-to-end
- [ ] Implementar contagem real de imóveis

---

**Criado em**: 20/10/2025  
**VerdeMar Real Estate Platform**  
**Feature**: Sistema de Estilos Arquitetônicos
