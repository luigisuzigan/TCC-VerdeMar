# 🔄 COMO REINICIAR O VITE PARA CARREGAR A API KEY

## ⚠️ PROBLEMA
O Vite só carrega variáveis do `.env` quando o servidor inicia. Se você adicionou ou modificou a API Key, o Vite ainda está usando a versão antiga (vazia).

## ✅ SOLUÇÃO (PASSO A PASSO)

### **1. Localize o terminal onde o Vite está rodando**
- Procure pelo terminal que mostra: `VITE v...` e `Local: http://localhost:5173/`

### **2. Pare o servidor Vite**
- Pressione: `Ctrl + C` no terminal
- Aguarde até aparecer o prompt novamente

### **3. Reinicie o servidor Vite**
```bash
npm run dev
```

### **4. Aguarde o Vite iniciar completamente**
- Você verá: `Local: http://localhost:5173/`
- Deve aparecer: `ready in XXXms`

### **5. Abra o navegador e teste novamente**
- Vá para: http://localhost:5173/admin/properties/new
- Abra o Console (F12)
- Procure por: "🔑 Google Maps API Key carregada: ✅ SIM"

---

## 🧪 TESTE RÁPIDO

Após reiniciar, faça este teste no formulário de imóvel:

### **Teste: Buscar Coordenadas**
1. Preencha:
   - Cidade: `Balneário Camboriú`
   - Estado: `SC`
   - País: `Brasil`

2. Clique em "🔍 Buscar Coordenadas" (botão verde)

3. **O que deve acontecer**:
   - ✅ Loading aparece
   - ✅ Alert mostra: "Coordenadas encontradas!"
   - ✅ Latitude e Longitude preenchidos
   - ✅ No console (F12): logs de sucesso

---

## 🐛 SE AINDA NÃO FUNCIONAR

### **Verifique no Console do Navegador (F12)**

Procure por estas mensagens:

#### ✅ FUNCIONANDO:
```
🔑 Google Maps API Key carregada: ✅ SIM
🔑 Primeiros caracteres: AIzaSyDr-t...
📍 Iniciando busca de coordenadas para: ...
```

#### ❌ NÃO FUNCIONANDO:
```
🔑 Google Maps API Key carregada: ❌ NÃO
🔑 Primeiros caracteres: undefined
❌ VITE_GOOGLE_MAPS_API_KEY não encontrada no .env
```

Se aparecer "❌ NÃO", faça:

### **Verificação do arquivo .env**

1. Abra o arquivo: `front/.env`
2. Confirme que tem EXATAMENTE isso:
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM
```

3. ⚠️ **SEM ESPAÇOS** antes ou depois do `=`
4. ⚠️ **SEM ASPAS** ao redor da chave
5. ⚠️ **SEM # na frente** (comentário)

### **Limpar cache do Vite**

Se ainda não funcionar:

```bash
# Pare o Vite (Ctrl+C)
# Execute:
npm run dev -- --force

# Ou delete a pasta .vite e reinicie:
rm -rf .vite
npm run dev
```

---

## 📝 CHECKLIST FINAL

- [ ] Arquivo `front/.env` existe
- [ ] Variável `VITE_GOOGLE_MAPS_API_KEY=...` está sem comentário (#)
- [ ] Servidor Vite foi reiniciado (Ctrl+C e npm run dev)
- [ ] Navegador foi atualizado (F5)
- [ ] Console mostra: "🔑 Google Maps API Key carregada: ✅ SIM"

---

## 🆘 AINDA COM PROBLEMA?

Cole aqui o que aparece no console do navegador (F12) quando você:
1. Abre o formulário de imóvel
2. Clica em "Buscar Coordenadas"

Eu vou analisar e te ajudar! 🚀
