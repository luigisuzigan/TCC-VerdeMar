# 🔧 Corrigindo CORS - Deploy Backend na Vercel

## ✅ Correções Aplicadas

### 1. **CORS mais permissivo** (`src/app.js`)
- ✅ Aceita automaticamente todos os subdomínios `.vercel.app` em produção
- ✅ Permite localhost em qualquer porta para desenvolvimento
- ✅ Remove URLs hardcoded antigas

### 2. **Headers CORS no Vercel** (`vercel.json`)
- ✅ Adiciona headers CORS diretamente na configuração da Vercel
- ✅ Garante que funcione mesmo em erros de servidor

### 3. **Variáveis de ambiente** (`.env.example`)
- ✅ Template completo com todas as variáveis necessárias

---

## 🚀 Como Configurar na Vercel (Passo a Passo)

### **Passo 1: Acessar Configurações do Projeto**

1. Acesse: https://vercel.com
2. Clique no seu projeto do **backend**
3. Vá em **Settings** → **Environment Variables**

### **Passo 2: Adicionar Variáveis de Ambiente**

Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `JWT_SECRET` | `66f442f4025c8cb8376780c34b3b870fa257b9a908d671e468afe27db30eefc93d88c63123c4952a51e87f252bb3b28db1ec6dcd40ce1312208194cc42eca0c2` | Production, Preview, Development |
| `ADMIN_EMAIL` | `admin@verdemarsc.com` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `admin123` | Production, Preview, Development |
| `ALLOWED_ORIGIN` | `https://SEU-FRONTEND.vercel.app` ⚠️ | Production, Preview |
| `DATABASE_URL` | `mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar?connection_limit=2&pool_timeout=30&connect_timeout=30` | Production, Preview, Development |
| `GOOGLE_MAPS_API_KEY` | `AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM` | Production, Preview, Development |

⚠️ **IMPORTANTE**: Substitua `SEU-FRONTEND` pela URL real do seu frontend!

Exemplo correto:
```
ALLOWED_ORIGIN=https://tcc-verde-mar.vercel.app
```

### **Passo 3: Fazer Redeploy**

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deployment
3. Clique em **Redeploy**
4. Aguarde o build terminar

---

## 🧪 Como Testar se Funcionou

### **1. Verificar Health Check**

Abra no navegador:
```
https://SEU-BACKEND.vercel.app/api/health
```

Deve retornar:
```json
{
  "ok": true,
  "status": "online",
  "timestamp": "2025-11-05T...",
  "environment": "production",
  "version": "1.0.0"
}
```

### **2. Verificar CORS no Console do Frontend**

1. Abra o frontend: `https://SEU-FRONTEND.vercel.app`
2. Abra DevTools (F12) → Console
3. Procure por erros de CORS:
   - ❌ **ANTES:** `Access to fetch at ... has been blocked by CORS policy`
   - ✅ **DEPOIS:** Nenhum erro de CORS

### **3. Testar Login**

1. Tente fazer login no frontend
2. Deve funcionar normalmente sem erros

---

## 🐛 Problemas Comuns

### **Erro: "Not allowed by CORS"**

**Causa:** `ALLOWED_ORIGIN` não configurado ou incorreto

**Solução:**
1. Vá nas variáveis de ambiente da Vercel
2. Verifique se `ALLOWED_ORIGIN` tem a URL **EXATA** do frontend
3. Deve começar com `https://` (não `http://`)
4. Não pode ter `/` no final
5. Faça redeploy após mudar

### **Erro: "Network request failed"**

**Causa:** Backend não está online ou URL errada

**Solução:**
1. Verifique se o backend fez deploy com sucesso
2. Teste: `https://SEU-BACKEND.vercel.app/api/health`
3. Se não abrir, veja os logs do deploy na Vercel

### **Erro: "Failed to connect to database"**

**Causa:** `DATABASE_URL` errada ou banco inacessível

**Solução:**
1. Verifique se o banco MySQL está online
2. Teste a conexão com MySQL Workbench ou outro client
3. Certifique-se que `connection_limit=2` está na URL

---

## 📝 Checklist Final

Antes de fazer redeploy, confirme:

- [ ] `ALLOWED_ORIGIN` configurado com URL do frontend
- [ ] `JWT_SECRET` configurado (mesmo valor do .env local)
- [ ] `DATABASE_URL` configurado e acessível
- [ ] `ADMIN_EMAIL` e `ADMIN_PASSWORD` configurados
- [ ] Todas as variáveis marcadas para **Production** e **Preview**
- [ ] Código commitado e pusheado para o GitHub

---

## 🔄 Fluxo Completo de Deploy

```bash
# 1. Commit das mudanças
git add .
git commit -m "fix: corrige CORS do backend para Vercel"
git push origin main

# 2. A Vercel vai fazer deploy automaticamente

# 3. Após deploy, verificar:
# - Logs de build (sem erros)
# - Health check (https://SEU-BACKEND.vercel.app/api/health)
# - Frontend conectando sem erros de CORS
```

---

## 💡 Dica Extra: Debug de CORS

Se ainda tiver problemas, adicione isto temporariamente no frontend (`src/api/axios.js` ou similar):

```javascript
// Temporário - para debug
console.log('🌐 API Base:', import.meta.env.VITE_API_BASE);

// Testar se backend está online
fetch(import.meta.env.VITE_API_BASE + '/api/health')
  .then(r => r.json())
  .then(data => console.log('✅ Backend online:', data))
  .catch(err => console.error('❌ Backend erro:', err));
```

Isso vai mostrar no console se o problema é:
- **URL errada** (VITE_API_BASE incorreta)
- **Backend offline** (erro 404/500)
- **CORS** (erro específico de CORS)

---

## 📞 Se nada funcionar...

Compartilhe nos logs da Vercel (Deployments → Build Logs) a mensagem de erro exata.

Os erros mais comuns são:
1. ❌ Variável de ambiente não configurada
2. ❌ URL do frontend errada em `ALLOWED_ORIGIN`
3. ❌ Banco de dados inacessível

---

**Criado em:** 05/11/2025
**Versão:** 1.0
