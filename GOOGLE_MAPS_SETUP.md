# 🗺️ Como Configurar Google Maps API

## 📋 Passo a Passo

### 1. Criar Projeto no Google Cloud

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Selecionar projeto" → "Novo projeto"
3. Dê um nome: `VerdeMar` ou similar
4. Clique em "Criar"

### 2. Ativar APIs Necessárias

1. No menu lateral, vá em **APIs e Serviços** → **Biblioteca**
2. Procure e ative as seguintes APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Places API**
   - ✅ **Geocoding API**

Para cada API:
- Clique na API
- Clique em "ATIVAR"
- Aguarde a ativação

### 3. Criar Chave de API

1. No menu lateral, vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS** → **Chave de API**
3. Uma chave será gerada (exemplo: `AIzaSyB1234...`)
4. **COPIE** a chave

### 4. Restringir a Chave (Recomendado)

1. Clique em "RESTRINGIR CHAVE"
2. Em **Restrições de aplicativo**:
   - Selecione "Referenciadores HTTP (sites)"
   - Adicione:
     - `http://localhost:5173/*` (desenvolvimento)
     - `https://seudominio.com/*` (produção)

3. Em **Restrições de API**:
   - Selecione "Restringir chave"
   - Marque:
     - Maps JavaScript API
     - Places API
     - Geocoding API

4. Clique em **SALVAR**

### 5. Configurar no Projeto

1. Vá para a pasta `front/` do projeto
2. Crie um arquivo `.env` (se não existir):
   ```bash
   touch .env
   ```

3. Adicione a chave:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyB1234...sua_chave_aqui
   ```

4. **IMPORTANTE**: Adicione `.env` ao `.gitignore`:
   ```
   # .gitignore
   .env
   .env.local
   ```

### 6. Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C)
npm run dev
```

### 7. Testar

1. Abra a aplicação em `http://localhost:5173`
2. Vá para a Home
3. Clique em "Local" no QuickSearch
4. Você deve ver:
   - ✅ Campo de busca com autocomplete
   - ✅ Mapa do Google Maps
   - ✅ Marcador no mapa

## 💰 Custos

### Tier Gratuito (Free Tier)
O Google oferece **$200 de crédito gratuito por mês**, que é mais do que suficiente para desenvolvimento e pequenos sites.

### Preços Aproximados
- **Maps JavaScript API**: $7 por 1.000 carregamentos
- **Places API**: $17 por 1.000 requisições
- **Geocoding API**: $5 por 1.000 requisições

### Para Manter Gratuito
Com 1.000 visualizações/mês você gastaria aproximadamente $29, mas os $200 gratuitos cobrem isso.

Para produção, considere:
- Implementar cache de resultados
- Limitar chamadas à API
- Monitorar uso no Console

## 🔒 Segurança

### ✅ Boas Práticas

1. **NUNCA** commite a chave no Git
2. **SEMPRE** restrinja a chave por domínio
3. **ATIVE** apenas as APIs necessárias
4. **MONITORE** uso regularmente
5. **CRIE** alertas de uso no Console

### ⚠️ Se a Chave Vazar

1. Vá no Google Cloud Console
2. **Credenciais** → Encontre a chave
3. Clique em **EXCLUIR**
4. Crie uma nova chave
5. Atualize o `.env`

## 🚀 Funcionalidades Habilitadas

Com a API configurada, você terá:

### 1. Autocomplete de Endereços
- Digite "Flores..." → Sugere "Florianópolis, SC"
- Seleção rápida de endereços
- Precisão nos resultados

### 2. Visualização no Mapa
- Mapa interativo
- Marcador na localização selecionada
- Zoom e navegação

### 3. Geocoding Automático
- Converte endereço em coordenadas (lat/lng)
- Útil para busca por proximidade
- Precisão na localização

## 🐛 Troubleshooting

### Erro: "This API project is not authorized"
- ✅ Verifique se ativou as 3 APIs (Maps, Places, Geocoding)
- ✅ Aguarde alguns minutos após ativar

### Erro: "RefererNotAllowedMapError"
- ✅ Adicione `http://localhost:5173/*` nas restrições
- ✅ Verifique se salvou as alterações

### Mapa não aparece
- ✅ Verifique se a chave está no `.env`
- ✅ Reinicie o servidor (Ctrl+C e `npm run dev`)
- ✅ Abra o console (F12) e veja erros

### Autocomplete não funciona
- ✅ Verifique se ativou a **Places API**
- ✅ Verifique se a chave está correta
- ✅ Veja o console do navegador

## 📚 Documentação Oficial

- [Google Maps Platform](https://developers.google.com/maps)
- [JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)

## ✅ Checklist Final

Antes de ir para produção:

- [ ] API key configurada e testada
- [ ] Restrições de domínio aplicadas
- [ ] Apenas APIs necessárias ativadas
- [ ] `.env` não está no Git
- [ ] Cache de resultados implementado (opcional)
- [ ] Alertas de uso configurados (opcional)
- [ ] Monitoramento ativo no Console

## 🎯 Alternativas (Caso não queira usar Google Maps)

Se preferir não usar Google Maps por enquanto:

1. **Leaflet + OpenStreetMap** (Gratuito)
   ```bash
   npm install react-leaflet leaflet
   ```

2. **Mapbox** (Free tier generoso)
   ```bash
   npm install mapbox-gl
   ```

3. **Busca Simples** (Sem mapa)
   - O sistema já funciona sem a API
   - Apenas sem autocomplete e visualização
   - Campo de busca normal continua funcionando

---

**Nota**: A aplicação funciona normalmente **SEM** a Google Maps API. O mapa e autocomplete são features extras que melhoram a experiência, mas não são obrigatórios.
