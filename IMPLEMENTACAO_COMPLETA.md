# ✅ Guia Completo de Implementação - Sistema de Locais Próximos

## 🎯 O que foi implementado

Sistema completo para buscar e exibir locais REAIS próximos aos imóveis usando a Google Maps Places API.

---

## 📋 Checklist de Implementação

### ✅ Backend
- [x] ✅ Serviço `nearbyPlacesService.js` criado
- [x] ✅ Rota `POST /api/properties/:id/nearby-places` adicionada
- [x] ✅ Schema do Prisma atualizado (campos `style` e `nearbyPlaces`)
- [ ] ⏳ Instalar `axios` no backend
- [ ] ⏳ Rodar migration do Prisma
- [ ] ⏳ Obter chave da Google Maps API
- [ ] ⏳ Configurar `.env` com `GOOGLE_MAPS_API_KEY`

### ✅ Frontend
- [x] ✅ Componente `NearbyPlacesSection` criado
- [x] ✅ Integrado na página `PropertyDetails`
- [x] ✅ Sistema de filtros por categoria (Escolas, Supermercados, etc.)
- [ ] ⏳ Adicionar botão no Admin Panel

### ✅ Estilos
- [x] ✅ Campo `style` adicionado ao schema
- [x] ✅ Sistema de filtros de estilo implementado
- [x] ✅ Seção "Estilos em Destaque" no Home
- [ ] ⏳ Adicionar imagens dos estilos

---

## 🚀 Próximos Passos (MANUAL)

### 1️⃣ Instalar Axios (OBRIGATÓRIO)

Abra o terminal como Administrador ou ajuste as políticas do PowerShell:

```powershell
# Opção 1: Abrir PowerShell como Admin e permitir scripts
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Depois:
cd back
npm install axios
```

### 2️⃣ Rodar Migration do Prisma (OBRIGATÓRIO)

```bash
cd back
npx prisma migrate dev --name add_style_and_nearby_places
```

Isso criará os novos campos `style` e `nearbyPlaces` na tabela `Property`.

### 3️⃣ Obter Chave da Google Maps API (OBRIGATÓRIO)

1. Acesse: https://console.cloud.google.com/
2. Crie um projeto (ex: "VerdeMar")
3. Ative as APIs:
   - **Places API (New)**
   - **Maps JavaScript API**
4. Vá em "Credenciais" → "Criar Credenciais" → "Chave de API"
5. **IMPORTANTE**: Restrinja a chave:
   - Restrição de aplicativo: Endereços IP (coloque o IP do seu servidor)
   - Restrição de API: Marque "Places API"

### 4️⃣ Configurar .env (OBRIGATÓRIO)

Adicione no arquivo `back/.env`:

```env
GOOGLE_MAPS_API_KEY=AIzaSy... (sua chave aqui)
```

### 5️⃣ Testar a API

Depois de tudo configurado, teste:

```bash
# 1. Certifique-se de que o backend está rodando
cd back
npm run dev

# 2. Em outro terminal, teste a rota (substitua :id pelo ID de um imóvel):
curl -X POST http://localhost:5000/api/properties/1/nearby-places \
  -H "Authorization: Bearer SEU_TOKEN_ADMIN"
```

---

## 📖 Como Usar

### **No Admin Panel (ainda não implementado)**

Quando você criar/editar um imóvel:

1. Preencha latitude e longitude do imóvel
2. Clique no botão **"Buscar locais próximos"**
3. Sistema chama a API do Google Maps
4. Retorna locais reais em 10 categorias
5. Salva automaticamente no campo `nearbyPlaces`

### **Na Página de Detalhes (já implementado)**

Quando um visitante abre um imóvel:

1. Se o imóvel tiver `nearbyPlaces` preenchido
2. Aparece a seção **"O que há por perto"**
3. Usuário pode filtrar por categoria (Escolas, Supermercados, etc.)
4. Cada local mostra:
   - Nome
   - Endereço
   - Distância do imóvel
   - Avaliação (estrelas)
   - Link para rota no Google Maps

---

## 🗺️ Categorias de Locais Buscados

O sistema busca automaticamente:

| Categoria | Raio | Max Resultados |
|-----------|------|----------------|
| 🏫 Escolas | 2km | 5 |
| 🛒 Supermercados | 2km | 5 |
| 🏥 Hospitais | 3km | 3 |
| 💊 Farmácias | 1.5km | 5 |
| 🏦 Bancos | 2km | 5 |
| 🍽️ Restaurantes | 1km | 5 |
| 🚌 Transporte | 1km | 5 |
| 🌳 Parques | 2km | 3 |
| 🛍️ Shopping | 5km | 3 |
| 🏋️ Academias | 2km | 3 |

---

## 💰 Custos da Google Maps API

- **Places API (Nearby Search)**: US$ 32 por 1.000 requisições
- **Exemplo**: 
  - 100 imóveis × 10 categorias = 1.000 requisições = ~R$ 160
  - Recomendação: Buscar locais apenas quando admin editar o imóvel
  - Dados ficam salvos no banco (não busca toda vez que alguém acessa)

---

## 🔧 Estrutura de Dados

### Exemplo de dados salvos no campo `nearbyPlaces`:

```json
{
  "schools": [
    {
      "placeId": "ChIJ...",
      "name": "Escola Municipal Centro",
      "distance": 487,
      "distanceText": "487m",
      "lat": -27.5984,
      "lng": -48.5484,
      "rating": 4.2,
      "userRatingsTotal": 156,
      "vicinity": "Rua das Flores, 123",
      "types": ["school", "point_of_interest"]
    }
  ],
  "supermarkets": [
    {
      "placeId": "ChIJ...",
      "name": "Supermercado Angeloni",
      "distance": 320,
      "distanceText": "320m",
      "lat": -27.5994,
      "lng": -48.5494,
      "rating": 4.5,
      "userRatingsTotal": 892,
      "vicinity": "Av. Principal, 456"
    }
  ]
}
```

---

## 🎨 Próxima Feature: Botão no Admin Panel

Para completar a implementação, adicione este botão no formulário de edição:

```jsx
// Em: front/src/pages/Admin/Properties/EditProperty.jsx

const handleFetchNearbyPlaces = async () => {
  if (!property.latitude || !property.longitude) {
    alert('Adicione latitude e longitude primeiro!');
    return;
  }

  try {
    setLoading(true);
    const response = await api.post(`/properties/${property.id}/nearby-places`);
    alert(`✅ ${response.data.message}`);
    // Recarregar dados do imóvel
    loadProperty();
  } catch (error) {
    alert('❌ Erro ao buscar locais próximos');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// No JSX:
<button
  onClick={handleFetchNearbyPlaces}
  disabled={loading}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? 'Buscando...' : '🗺️ Buscar Locais Próximos (Google Maps)'}
</button>
```

---

## ⚠️ Importante

1. **Não commite a chave da API** no Git (use `.env` e adicione ao `.gitignore`)
2. **Restrinja a chave** no Google Cloud Console
3. **Monitore o uso** para não exceder o limite gratuito
4. **Cache os dados** (já implementado - salva no banco)

---

## 📝 Resumo do que fazer AGORA

```bash
# 1. Instalar axios
cd back
npm install axios

# 2. Rodar migration
npx prisma migrate dev --name add_style_and_nearby_places

# 3. Obter chave do Google Maps (siga passo 3️⃣ acima)

# 4. Adicionar no back/.env:
GOOGLE_MAPS_API_KEY=SuaChaveAqui

# 5. Reiniciar o backend
npm run dev

# 6. Testar!
```

---

**Criado em**: 20/10/2025  
**VerdeMar Real Estate Platform**  
**Status**: ✅ Backend completo | ⏳ Aguardando config API Key | ⏳ Admin Panel pendente
