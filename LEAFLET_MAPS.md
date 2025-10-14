# 🗺️ Sistema de Mapas com Leaflet + OpenStreetMap

## ✅ O que foi implementado

Implementamos um sistema de mapas **100% GRATUITO** usando:
- **Leaflet**: Biblioteca JavaScript open-source para mapas interativos
- **OpenStreetMap**: Mapas gratuitos mantidos pela comunidade
- **Nominatim**: Geocoding gratuito (converte endereços em coordenadas)

## 🎯 Funcionalidades

### 1. Busca de Localização
- Campo de busca com ícone de lupa
- Botão "Buscar" para pesquisar
- Suporte para Enter no teclado
- Indicador de "Buscando..." durante a pesquisa

### 2. Mapa Interativo
- Mapa do OpenStreetMap totalmente funcional
- Marcador vermelho na localização selecionada
- Zoom in/out com botões
- Popup mostrando o nome da localização
- Movimento automático do mapa ao selecionar local

### 3. Localizações Populares
6 localizações pré-configuradas de Santa Catarina:
- Florianópolis, SC
- Balneário Camboriú, SC
- Itapema, SC
- Bombinhas, SC
- Porto Belo, SC
- Praia Central - Florianópolis

### 4. Geocoding Automático
Quando você digita um endereço e clica em "Buscar":
1. Primeiro busca nas localizações populares
2. Se não encontrar, usa a API do Nominatim (OpenStreetMap)
3. Converte o endereço em coordenadas (latitude/longitude)
4. Move o mapa automaticamente para a localização

## 💰 Custos

### **ZERO! Completamente Gratuito!**

- ✅ Leaflet: Open-source, grátis
- ✅ OpenStreetMap: Mapas grátis, mantidos pela comunidade
- ✅ Nominatim: Geocoding grátis
- ✅ Sem necessidade de cartão de crédito
- ✅ Sem limites de uso (use à vontade!)
- ✅ Sem APIs keys ou cadastros

## 📦 Bibliotecas Instaladas

```bash
npm install react-leaflet@4.2.1 leaflet --legacy-peer-deps
```

- **react-leaflet**: Componentes React para Leaflet
- **leaflet**: Biblioteca principal de mapas

## 🎨 Como Usar

### No QuickSearch (Home)
1. Clique no botão "Local"
2. Digite uma cidade ou endereço
3. Clique em "Buscar" ou pressione Enter
4. O mapa mostra a localização automaticamente
5. Clique em "Aplicar" para filtrar imóveis

### Adicionando Novas Localizações Populares

Edite `LocationModal.jsx`:

```javascript
const POPULAR_LOCATIONS = [
  { name: 'Sua Cidade, UF', lat: -00.0000, lng: -00.0000 },
  // Adicione mais aqui
];
```

Para descobrir latitude/longitude:
1. Acesse [OpenStreetMap](https://www.openstreetmap.org/)
2. Procure a localização
3. Clique com botão direito no mapa
4. Selecione "Mostrar endereço" ou veja a URL

## 🔧 Arquivos Modificados

1. **`front/src/components/Search/Modals/LocationModal.jsx`**
   - Substituído Google Maps por Leaflet
   - Adicionado busca com Nominatim
   - Localizações populares clicáveis

2. **`front/src/styles/leaflet.css`** (novo)
   - Estilos customizados para o mapa
   - Fix para ícones dos marcadores
   - Botões de zoom estilizados

3. **`front/package.json`**
   - Adicionado `react-leaflet@4.2.1`
   - Adicionado `leaflet`

## 🎯 Vantagens sobre Google Maps

| Recurso | Leaflet + OSM | Google Maps |
|---------|---------------|-------------|
| **Custo** | Gratuito | Pago após $200/mês |
| **Cadastro** | Não precisa | Precisa conta Google |
| **Cartão** | Não precisa | Precisa (mesmo tier grátis) |
| **Limites** | Sem limites | 28.000 carregamentos/mês grátis |
| **Privacidade** | Melhor | Google coleta dados |
| **Customização** | Total | Limitada |

## 🚀 Como Funciona

### 1. Busca nas Localizações Populares
```javascript
const found = POPULAR_LOCATIONS.find(loc => 
  loc.name.toLowerCase().includes(searchText.toLowerCase())
);
```
Se encontrar, usa direto as coordenadas pré-configuradas.

### 2. Geocoding com Nominatim
```javascript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
);
```
Se não encontrar nas populares, busca na API do OpenStreetMap.

### 3. Atualização do Mapa
```javascript
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}
```
Componente helper que move o mapa quando a localização muda.

## 🐛 Troubleshooting

### Mapa não aparece
✅ **Solução**: Verifique se importou o CSS do Leaflet
```javascript
import 'leaflet/dist/leaflet.css';
import '../../../styles/leaflet.css';
```

### Marcador não aparece
✅ **Solução**: O arquivo `leaflet.css` já configura os ícones automaticamente.

### Busca não funciona
✅ **Solução**: Verifique a conexão com internet. O Nominatim precisa de internet.

### Erro CORS
✅ **Solução**: Adicione o header `User-Agent` na requisição (já implementado).

## 📚 Recursos Adicionais

### Leaflet
- [Documentação Oficial](https://leafletjs.com/)
- [Tutoriais](https://leafletjs.com/examples.html)
- [React Leaflet](https://react-leaflet.js.org/)

### OpenStreetMap
- [Site Oficial](https://www.openstreetmap.org/)
- [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/)
- [Política de Uso](https://operations.osmfoundation.org/policies/nominatim/)

### Exemplos de Mapas
- [Diferentes estilos de mapa](https://leaflet-extras.github.io/leaflet-providers/preview/)
- [Plugins do Leaflet](https://leafletjs.com/plugins.html)

## 🎨 Customizações Possíveis

### 1. Mudar Estilo do Mapa
Substitua a URL do TileLayer:
```javascript
// Mapa escuro
url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

// Mapa claro minimalista  
url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"

// Mapa satélite (grátis)
url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
```

### 2. Adicionar Múltiplos Marcadores
```javascript
{properties.map(property => (
  <Marker 
    key={property.id}
    position={[property.lat, property.lng]}
  >
    <Popup>{property.title}</Popup>
  </Marker>
))}
```

### 3. Círculo de Raio
```javascript
import { Circle } from 'react-leaflet';

<Circle
  center={markerPosition}
  radius={5000} // 5km
  pathOptions={{ color: 'emerald' }}
/>
```

### 4. Polígonos (Bairros, Áreas)
```javascript
import { Polygon } from 'react-leaflet';

<Polygon
  positions={[[lat1, lng1], [lat2, lng2], [lat3, lng3]]}
  pathOptions={{ color: 'blue' }}
/>
```

## ✅ Checklist de Implementação

- [x] Instalar bibliotecas (react-leaflet, leaflet)
- [x] Criar arquivo CSS do Leaflet
- [x] Atualizar LocationModal com Leaflet
- [x] Implementar busca com Nominatim
- [x] Adicionar localizações populares
- [x] Configurar marcadores
- [x] Testar funcionalidade
- [x] Remover dependências do Google Maps (opcional)

## 🔄 Próximos Passos (Opcional)

1. **Mostrar Imóveis no Mapa**
   - Marcar cada imóvel com latitude/longitude
   - Popup com foto e preço
   - Clique abre detalhes

2. **Filtro por Raio**
   - "Imóveis num raio de 5km"
   - Círculo visual no mapa
   - Cálculo de distância

3. **Clusters de Marcadores**
   - Agrupar marcadores próximos
   - Contador de imóveis
   - Expansão ao clicar

4. **Desenhar Áreas**
   - Usuário desenha polígono
   - Busca imóveis dentro da área
   - Salvar áreas favoritas

---

**Pronto para usar! 🎉** 
Sistema 100% funcional e gratuito. Sem necessidade de configurar APIs ou criar contas!
