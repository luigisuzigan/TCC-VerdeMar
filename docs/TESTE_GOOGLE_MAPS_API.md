# 🧪 Guia de Teste - Google Maps Geocoding API

## ✅ Checklist de Configuração

### 1. Verificar API Key no .env
```bash
# Arquivo: front/.env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM
```
✅ API Key já está configurada!

### 2. Verificar se o Vite está rodando
```bash
cd front
npm run dev
```

### 3. Reiniciar o servidor do Vite (importante!)
- Pressione `Ctrl + C` no terminal do Vite
- Execute novamente: `npm run dev`
- **Por quê?** Vite só carrega variáveis .env ao iniciar

---

## 🧪 Testes para Executar

### **Teste 1: Buscar por CEP** (ViaCEP + Google Maps)
1. Abra o formulário de criar/editar imóvel
2. Na seção "📍 LOCALIZAÇÃO COMPLETA"
3. No box azul "🔍 Buscar Endereço Automaticamente":
   - Digite: `88330-000`
   - Clique em "Buscar CEP"
4. **Resultado esperado**:
   - ✅ Cidade: Balneário Camboriú
   - ✅ Estado: SC
   - ✅ Latitude e Longitude preenchidos
   - ✅ Alert: "Endereço e coordenadas encontrados com sucesso!"

### **Teste 2: Buscar Coordenadas Manualmente**
1. Preencha manualmente:
   - Endereço: `Rua 1900`
   - Cidade: `Balneário Camboriú`
   - Estado: `SC`
   - País: `Brasil`
2. No box verde "🌐 Buscar Coordenadas Automaticamente"
3. Clique em "Buscar Coordenadas"
4. **Resultado esperado**:
   - ✅ Latitude: aprox. -26.99
   - ✅ Longitude: aprox. -48.64
   - ✅ Alert mostrando coordenadas

### **Teste 3: Usar Minha Localização** (GPS do navegador)
1. Clique no botão "📍 Minha Localização" (amarelo)
2. Navegador vai pedir permissão
3. Clique em "Permitir"
4. **Resultado esperado**:
   - ✅ Latitude e Longitude da sua localização atual
   - ✅ Alert: "Localização obtida com sucesso!"

### **Teste 4: Visualização no Mapa** (Placeholder)
1. Após preencher latitude e longitude
2. **Resultado esperado**:
   - ✅ Box "🗺️ Visualização no Mapa" aparece
   - ✅ Mostra as coordenadas
   - ⚠️ Placeholder (mapa real será implementado depois)

---

## 🐛 Possíveis Erros e Soluções

### ❌ Erro: "Google Maps API não configurada"
**Causa**: API Key não está sendo lida pelo Vite
**Solução**:
1. Verifique se o arquivo `.env` está na pasta `front/`
2. Reinicie o servidor Vite (Ctrl+C e `npm run dev`)
3. Limpe o cache: `npm run dev -- --force`

### ❌ Erro: "REQUEST_DENIED" ou "Acesso negado"
**Causa**: API Key inválida ou sem permissões
**Solução**:
1. Acesse: https://console.cloud.google.com/
2. Vá em "APIs e Serviços" → "Credenciais"
3. Verifique se a API Key é a mesma do `.env`
4. Vá em "APIs e Serviços" → "Biblioteca"
5. Procure e **ATIVE**:
   - ✅ **Geocoding API**
   - ✅ **Maps JavaScript API** (para o mapa depois)

### ❌ Erro: "Nenhuma coordenada encontrada"
**Causa**: Endereço muito genérico ou inexistente
**Solução**:
- Tente com endereços mais completos
- Exemplo: "Avenida Brasil, 1000, Balneário Camboriú, SC"

### ❌ Erro: "CEP não encontrado"
**Causa**: CEP inválido ou não existe
**Solução**:
- Use CEPs reais do Brasil
- Exemplos testados:
  - `88330-000` (Balneário Camboriú - SC)
  - `01310-100` (São Paulo - SP)
  - `88015-900` (Florianópolis - SC)

---

## 📊 Status das Funcionalidades

| Funcionalidade | Status | API Usada |
|---------------|--------|-----------|
| 🔍 Buscar por CEP | ✅ Funcionando | ViaCEP (grátis) |
| 🌐 Buscar Coordenadas | ✅ Funcionando | Google Geocoding |
| 📍 Minha Localização | ✅ Funcionando | Geolocation API |
| 🗑️ Limpar Coordenadas | ✅ Funcionando | - |
| 🗺️ Mapa Interativo | ⚠️ Placeholder | Google Maps JS (próximo) |

---

## 🎯 Próximos Passos (Opcional)

### 1. **Implementar Google Maps Embedded**
Substituir o placeholder por um mapa interativo real com:
- Marcador arrastável
- Zoom in/out
- Street View
- Atualização em tempo real

### 2. **Melhorar UX**
- Toast notifications ao invés de alerts
- Loading overlay
- Validação de CEP em tempo real
- Sugestões de endereço (autocomplete)

### 3. **Otimizações**
- Cache de coordenadas já buscadas
- Debounce na busca
- Tratamento de rate limits da API

---

## 📝 Como Testar Agora

```bash
# 1. Reinicie o Vite (terminal do front)
Ctrl + C
npm run dev

# 2. Abra o navegador
http://localhost:5173/admin/properties/new

# 3. Vá até a seção "Localização"

# 4. Teste a busca por CEP:
CEP: 88330-000
Clique em "Buscar CEP"

# 5. Veja o console do navegador (F12)
- Deve mostrar logs do serviço de geocoding
- Não deve ter erros
```

---

## ✅ Confirmação de Funcionamento

Se você viu:
- ✅ Cidade, Estado preenchidos automaticamente
- ✅ Latitude e Longitude preenchidos
- ✅ Alert de sucesso
- ✅ Sem erros no console

**PARABÉNS! 🎉 A integração está funcionando!**

---

## 🆘 Precisa de Ajuda?

Se algo não funcionar:
1. Copie o erro completo do console (F12)
2. Verifique se o Vite foi reiniciado
3. Confirme se a API Key está correta no .env
4. Teste com um CEP conhecido: `88330-000`
