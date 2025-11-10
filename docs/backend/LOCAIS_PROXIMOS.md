# 📍 Sistema de Locais Próximos

## O que é?

O sistema de **Locais Próximos** busca automaticamente estabelecimentos próximos aos imóveis usando a **Google Maps Places API**. Nenhum cadastro manual é necessário!

## 🎯 Categorias Disponíveis

O sistema busca 10 categorias de locais:

| Categoria | Ícone | Descrição | Raio de Busca |
|-----------|-------|-----------|---------------|
| **Escolas** | 🏫 | Escolas públicas e particulares | 20km |
| **Supermercados** | 🛒 | Supermercados e mercados | 20km |
| **Hospitais** | 🏥 | Hospitais e clínicas | 20km |
| **Farmácias** | 💊 | Farmácias e drogarias | 20km |
| **Bancos** | 🏦 | Agências bancárias e caixas eletrônicos | 20km |
| **Restaurantes** | 🍽️ | Restaurantes e lanchonetes | 20km |
| **Transporte** | 🚌 | Pontos de ônibus, metrô, etc. | 20km |
| **Parques** | 🌳 | Parques e áreas verdes | 20km |
| **Shopping** | 🛍️ | Shopping centers | 20km |
| **Academias** | 🏋️ | Academias e centros fitness | 20km |

## 🚀 Como Funciona?

### 1. Requisitos

Para que o sistema funcione, o imóvel **precisa ter**:
- ✅ **Latitude** cadastrada
- ✅ **Longitude** cadastrada

Se o imóvel não tiver coordenadas, a busca não será realizada.

### 2. Busca Automática

O sistema:
1. Consulta a **Google Maps Places API** para cada categoria
2. Busca até **5 locais mais próximos** em um raio de **20km**
3. Calcula a **distância real** usando a fórmula de Haversine
4. Ordena por **proximidade** (do mais perto ao mais longe)
5. Salva os dados no banco de dados

### 3. Informações Coletadas

Para cada local, o sistema armazena:
- 📍 Nome do estabelecimento
- 📏 Distância (em metros ou quilômetros)
- ⭐ Avaliação (rating) do Google Maps
- 👥 Número de avaliações
- 📮 Endereço (vicinity)
- 🗺️ Coordenadas (latitude e longitude)
- 🔗 Link para rotas no Google Maps

## 💻 Como Atualizar os Locais Próximos

### Método 1: Script .bat (Windows - Recomendado)

```bash
cd back
update-nearby-places.bat
```

### Método 2: NPM Script

```bash
cd back
npm run nearby
```

### Método 3: Node Direto

```bash
cd back
node src/scripts/fetchNearbyPlaces.js
```

## 📊 O que o Script Faz?

Ao executar o script:

1. ✅ Busca **todos os imóveis** que possuem coordenadas
2. 🔍 Para cada imóvel:
   - Consulta a Google Maps API
   - Busca locais em 10 categorias diferentes
   - Calcula distâncias
   - Salva no banco de dados
3. ⏳ Aguarda 1 segundo entre requisições (para não sobrecarregar a API)
4. 📈 Exibe relatório final:
   - Quantos imóveis foram atualizados
   - Quantos locais foram encontrados por categoria
   - Quais os mais próximos de cada tipo

### Exemplo de Saída

```
🔍 Buscando locais próximos para todos os imóveis...

📊 Encontrados 12 imóveis com coordenadas

[1/12] 🏠 Casa de Praia em Bombinhas
    📍 Centro, Bombinhas
    🌐 Lat: -27.1428, Lng: -48.4799
    ✅ 42 locais encontrados
       • schools: 5 (mais próximo: 850m)
       • supermarkets: 5 (mais próximo: 1.2km)
       • hospitals: 3 (mais próximo: 3.5km)
       • pharmacies: 5 (mais próximo: 900m)
       ...
    ⏳ Aguardando 1 segundo...

[2/12] 🏠 Apartamento Vista Mar
    ...

============================================================
📊 RESUMO FINAL
============================================================
✅ Imóveis atualizados: 12
❌ Erros: 0
📍 Total de imóveis: 12
============================================================

✨ Locais próximos buscados com sucesso!
Agora os imóveis têm dados REAIS do Google Maps.
```

## 🎨 Interface do Usuário

### Quando HÁ locais cadastrados:

O componente `NearbyPlacesSection` exibe:
- 🏷️ **Filtros por categoria** (com contador de locais)
- 📋 **Lista de locais** da categoria selecionada
- ⭐ **Avaliações** do Google Maps
- 📏 **Distância** formatada (500m, 1.2km, etc.)
- 🗺️ **Link "Ver rotas"** que abre no Google Maps

**Funcionalidade especial:**
- ✅ Se a categoria padrão (Escolas) estiver vazia, o sistema **seleciona automaticamente a primeira categoria com locais**
- ✅ Só mostra categorias que têm locais encontrados

### Quando NÃO HÁ locais cadastrados:

Exibe uma mensagem explicativa:
- 💡 Como funciona o sistema
- 📝 O que é necessário (coordenadas)
- ✨ Que é automático (não precisa cadastro manual)

## 🔧 API do Google Maps

### Configuração

O sistema usa a chave da API configurada no arquivo `.env`:

```env
GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

### Endpoints Usados

```
https://maps.googleapis.com/maps/api/place/nearbysearch/json
```

**Parâmetros:**
- `location`: Coordenadas do imóvel (lat,lng)
- `radius`: Raio de busca (20000m = 20km)
- `type`: Tipo do local (school, supermarket, etc.)
- `key`: Chave da API
- `language`: pt-BR (resultados em português)

### Limites da API

- ⚠️ **Quota gratuita:** 200 requisições/dia
- ⚠️ **Cada imóvel:** 10 requisições (uma por categoria)
- ⚠️ **Recomendação:** Rodar o script apenas quando adicionar novos imóveis

## 📁 Estrutura de Dados

### No Banco de Dados

Campo `nearbyPlaces` na tabela `Property`:
- **Tipo:** String (JSON)
- **Conteúdo:** Objeto com todas as categorias

```json
{
  "schools": [
    {
      "placeId": "ChIJ...",
      "name": "Escola Municipal",
      "distance": 850,
      "distanceText": "850m",
      "lat": -27.1435,
      "lng": -48.4802,
      "rating": 4.5,
      "userRatingsTotal": 120,
      "vicinity": "Rua das Flores, 123",
      "types": ["school", "point_of_interest"]
    }
  ],
  "supermarkets": [...],
  "hospitals": [...],
  ...
}
```

## 🛠️ Manutenção

### Quando Atualizar?

Rode o script quando:
- ✅ Cadastrar novos imóveis com coordenadas
- ✅ Corrigir coordenadas de imóveis existentes
- ✅ Quiser dados mais atualizados do Google Maps
- ❌ **Não precisa rodar toda vez** que iniciar o sistema

### Troubleshooting

**Problema:** "Nenhum local encontrado"
- ✅ Verifique se o imóvel tem latitude e longitude
- ✅ Confirme se a chave da API está configurada
- ✅ Verifique se a API do Google está ativa

**Problema:** "Erro 403 - Forbidden"
- ❌ Chave da API inválida
- ❌ API do Google Maps não habilitada
- ❌ Quota de requisições esgotada

**Problema:** "Categoria vazia no frontend"
- ✅ Agora seleciona automaticamente a primeira categoria com dados
- ✅ Não fica mais travado em categoria vazia

## 📚 Arquivos Relacionados

### Backend
- `back/src/services/nearbyPlacesService.js` - Serviço de busca
- `back/src/scripts/fetchNearbyPlaces.js` - Script de atualização
- `back/update-nearby-places.bat` - Atalho Windows

### Frontend
- `front/src/components/PropertyDetails/NearbyPlacesSection.jsx` - Interface
- `front/src/pages/PropertyDetails/index.jsx` - Página de detalhes

### Documentação
- `docs/backend/LOCAIS_PROXIMOS.md` - Este arquivo
- `docs/backend/NEARBY_PLACES_SERVICE.md` - Documentação técnica anterior

## ✨ Benefícios

✅ **Totalmente automático** - Sem cadastro manual  
✅ **Dados reais** - Direto do Google Maps  
✅ **Sempre atualizado** - Última versão do Google  
✅ **Completo** - 10 categorias de locais  
✅ **Preciso** - Distâncias calculadas corretamente  
✅ **Visual** - Interface bonita e intuitiva  
✅ **Inteligente** - Seleciona automaticamente categoria com dados  

## 🎓 Conclusão

O sistema de Locais Próximos oferece uma experiência premium para os usuários, mostrando tudo o que há ao redor do imóvel sem precisar de cadastro manual. É apenas rodar o script uma vez para cada lote de imóveis novos!

**Dúvidas?** Consulte o código em `back/src/services/nearbyPlacesService.js` 🚀
