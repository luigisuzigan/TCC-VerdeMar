# 🗺️ Como Configurar o Google Maps API

## Por que preciso disso?

A plataforma VerdeMar usa a **Google Maps API** para:
1. **Mostrar locais próximos** aos imóveis (escolas, supermercados, hospitais, etc.)
2. **Exibir mapas interativos** na página de detalhes do imóvel
3. **Calcular distâncias** reais entre o imóvel e pontos de interesse

Sem a chave configurada, os imóveis aparecerão com "Nenhum lugar próximo encontrado".

---

## 📝 Passo a Passo para Obter a Chave

### 1. Acesse o Google Cloud Console
👉 https://console.cloud.google.com/

### 2. Crie um Projeto (se não tiver)
- Clique em "Criar Projeto" no topo da página
- Nome sugerido: `VerdeMar`
- Clique em "Criar"

### 3. Ative as APIs Necessárias
No menu lateral, vá em:
- **APIs e Serviços** → **Biblioteca**

Ative as seguintes APIs:
- ✅ **Maps JavaScript API**
- ✅ **Places API** (MAIS IMPORTANTE!)
- ✅ **Geocoding API**

Para cada uma:
1. Busque o nome da API
2. Clique na API
3. Clique em "ATIVAR"

### 4. Crie uma Chave de API
1. Vá em **APIs e Serviços** → **Credenciais**
2. Clique em **+ CRIAR CREDENCIAIS**
3. Escolha **Chave de API**
4. Copie a chave gerada (algo como: `AIzaSyC...`)

### 5. (OPCIONAL mas recomendado) Restrinja a Chave
Para segurança, restrinja o uso da chave:

**Restrições de aplicativo:**
- Escolha "Referenciadores HTTP (sites)"
- Adicione: `http://localhost:5173/*` e seu domínio de produção

**Restrições de API:**
- Selecione apenas as 3 APIs mencionadas acima

---

## ⚙️ Configurar no Projeto

### 1. Adicione a chave no arquivo `.env`

Abra o arquivo `back/.env` e adicione:

```env
GOOGLE_MAPS_API_KEY=AIzaSyC-sua-chave-aqui
```

### 2. Popule os Locais Próximos

Execute o script para buscar locais próximos de todos os imóveis:

```bash
cd back
node src/scripts/fetchNearbyPlaces.js
```

Este script vai:
- Buscar os 5 locais mais próximos de cada categoria
- Salvar no banco de dados
- Usar a API do Google Maps

**⚠️ IMPORTANTE**: 
- O script aguarda 1 segundo entre requisições para não sobrecarregar a API
- Com 8 imóveis e 10 categorias, levará cerca de 1-2 minutos

### 3. Verifique os Resultados

Após executar o script:
```bash
node check-property-data.js
```

Você deve ver locais próximos listados para cada imóvel!

---

## 💰 Custos e Limites

### Plano Gratuito (Crédito mensal de $200)
- ✅ Suficiente para desenvolvimento e testes
- ✅ Cerca de **40.000 requisições Places API** por mês
- ✅ Mapas JavaScript API: **28.000 carregamentos** por mês

### Para este projeto:
- Buscar locais: **1 requisição por imóvel**
- Exibir mapa: **1 requisição por visualização**
- **Uso estimado**: < $10/mês em produção pequena

### Como evitar gastos inesperados:
1. Configure um **orçamento e alerta** no Google Cloud
2. Limite a chave API apenas aos domínios necessários
3. Em desenvolvimento, execute `fetchNearbyPlaces.js` apenas 1 vez

---

## 🐛 Troubleshooting

### Erro: "GOOGLE_MAPS_API_KEY não configurada"
✅ **Solução**: Adicione a chave no arquivo `back/.env`

### Erro: "API key not valid"
✅ **Soluções**:
1. Verifique se copiou a chave corretamente (sem espaços)
2. Confirme que ativou a **Places API**
3. Aguarde até 5 minutos após criar a chave

### Erro: "This API project is not authorized to use this API"
✅ **Solução**: Você esqueceu de ativar a API no Google Cloud Console
- Vá em APIs e Serviços → Biblioteca
- Busque "Places API"
- Clique em "ATIVAR"

### "Nenhum lugar próximo encontrado" na página
✅ **Soluções**:
1. Verifique se a chave está no `.env`
2. Execute `node src/scripts/fetchNearbyPlaces.js`
3. Reinicie o servidor backend

### Erro: "You have exceeded your request quota"
✅ **Solução**: Você atingiu o limite da API
- Verifique uso no Google Cloud Console
- Configure billing ou aguarde o reset mensal

---

## 🎯 Checklist Rápido

- [ ] Criar projeto no Google Cloud Console
- [ ] Ativar **Places API**, Maps JavaScript API, Geocoding API
- [ ] Criar chave de API
- [ ] Adicionar chave no `back/.env`
- [ ] Executar `node src/scripts/fetchNearbyPlaces.js`
- [ ] Verificar com `node check-property-data.js`
- [ ] Reiniciar o backend
- [ ] Testar no frontend

---

## 📚 Documentação Oficial

- Google Maps Platform: https://developers.google.com/maps
- Places API: https://developers.google.com/maps/documentation/places/web-service
- Preços: https://mapsplatform.google.com/pricing/

---

## 🆘 Ainda com Problemas?

Veja o arquivo `back/src/services/README_NEARBY_PLACES.md` para mais detalhes técnicos sobre como o sistema funciona.
