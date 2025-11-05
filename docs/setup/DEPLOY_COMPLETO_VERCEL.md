# 🚀 Deploy Completo - Frontend + Backend na Vercel

## 📋 Visão Geral

Este guia explica como fazer o deploy completo do VerdeMar (frontend + backend) na Vercel e resolver problemas de CORS.

---

## 🔧 Passo 1: Deploy do Backend

### 1.1 Criar Projeto Backend na Vercel

1. Acesse: https://vercel.com/new
2. Selecione o repositório: `TCC-VerdeMar`
3. Configure:
   ```
   Project Name:         verdemar-api (ou outro nome)
   Framework Preset:     Other
   Root Directory:       back
   Build Command:        (deixe vazio)
   Output Directory:     (deixe vazio)
   Install Command:      npm install
   ```

### 1.2 Configurar Variáveis de Ambiente do Backend

Vá em **Settings → Environment Variables** e adicione:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `JWT_SECRET` | `66f442f4025c8cb8376780c34b3b870fa257b9a908d671e468afe27db30eefc93d88c63123c4952a51e87f252bb3b28db1ec6dcd40ce1312208194cc42eca0c2` | Production, Preview, Development |
| `ADMIN_EMAIL` | `admin@verdemarsc.com` | Production, Preview, Development |
| `ADMIN_PASSWORD` | `admin123` | Production, Preview, Development |
| `DATABASE_URL` | `mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar?connection_limit=2&pool_timeout=30&connect_timeout=30` | Production, Preview, Development |
| `GOOGLE_MAPS_API_KEY` | `AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM` | Production, Preview, Development |
| `ALLOWED_ORIGIN` | ⚠️ **DEIXE VAZIO POR ENQUANTO** | Production, Preview |

⚠️ **IMPORTANTE**: Vamos configurar `ALLOWED_ORIGIN` depois que o frontend estiver online!

### 1.3 Fazer Deploy

1. Clique em **Deploy**
2. Aguarde o build (1-2 minutos)
3. **Anote a URL do backend**: `https://SEU-BACKEND.vercel.app`

### 1.4 Testar Backend

Abra no navegador:
```
https://SEU-BACKEND.vercel.app/api/health
```

Deve retornar:
```json
{
  "ok": true,
  "status": "online"
}
```

✅ **Backend está online!**

---

## 🎨 Passo 2: Deploy do Frontend

### 2.1 Criar Projeto Frontend na Vercel

1. Acesse: https://vercel.com/new
2. Selecione o **MESMO** repositório: `TCC-VerdeMar`
3. Configure:
   ```
   Project Name:         verdemar-frontend (ou outro nome)
   Framework Preset:     Vite
   Root Directory:       front
   Build Command:        npm run build
   Output Directory:     dist
   Install Command:      npm install
   ```

### 2.2 Configurar Variáveis de Ambiente do Frontend

Vá em **Settings → Environment Variables** e adicione:

| Variável | Valor | Ambiente |
|----------|-------|----------|
| `VITE_API_BASE` | `https://SEU-BACKEND.vercel.app` ⚠️ | Production, Preview, Development |
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyDr-twNHP0-jkm34f3ZAQw_ZVB5A-qsqNM` | Production, Preview, Development |

⚠️ **IMPORTANTE**: Use a URL do backend que você anotou no Passo 1.3!

**Exemplo correto:**
```
VITE_API_BASE=https://verdemar-api.vercel.app
```

**❌ Erros comuns:**
```
VITE_API_BASE=https://verdemar-api.vercel.app/api  ❌ (não inclua /api)
VITE_API_BASE=http://verdemar-api.vercel.app       ❌ (use https)
VITE_API_BASE=https://verdemar-api.vercel.app/     ❌ (não inclua / no final)
```

### 2.3 Fazer Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-3 minutos)
3. **Anote a URL do frontend**: `https://SEU-FRONTEND.vercel.app`

---

## 🔗 Passo 3: Conectar Frontend e Backend (CORS)

### 3.1 Atualizar ALLOWED_ORIGIN no Backend

Agora que o frontend está online, volte no projeto do **backend**:

1. Vá em **Settings → Environment Variables**
2. Encontre `ALLOWED_ORIGIN`
3. Edite o valor para: `https://SEU-FRONTEND.vercel.app`
4. Clique em **Save**

**Exemplo:**
```
ALLOWED_ORIGIN=https://verdemar-frontend.vercel.app
```

### 3.2 Fazer Redeploy do Backend

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do último deployment
3. Clique em **Redeploy**
4. Aguarde ~1 minuto

✅ **Agora o CORS está configurado!**

---

## 🧪 Passo 4: Testar Tudo Funcionando

### 4.1 Verificar se Frontend Abre

1. Acesse: `https://SEU-FRONTEND.vercel.app`
2. A página inicial deve carregar normalmente
3. Imóveis devem aparecer

### 4.2 Verificar se Login Funciona

1. Clique em "Entrar"
2. Use:
   - **Email:** `admin@verdemarsc.com`
   - **Senha:** `admin123`
3. Deve fazer login e redirecionar para o dashboard

### 4.3 Verificar Console (F12)

1. Abra DevTools (F12)
2. Vá na aba **Console**
3. **NÃO** deve ter erros de CORS
4. **NÃO** deve ter erros 401/403/500

Se tudo estiver OK: ✅ **Deploy concluído com sucesso!**

---

## 🐛 Problemas Comuns

### ❌ Erro: "Access to fetch blocked by CORS policy"

**Causa:** `ALLOWED_ORIGIN` não configurado corretamente no backend

**Solução:**
1. Vá nas variáveis do **backend**
2. Verifique `ALLOWED_ORIGIN` = URL **exata** do frontend
3. Não pode ter `/` no final
4. Deve começar com `https://`
5. Faça redeploy do backend

---

### ❌ Erro: "Network Error" ou "Failed to fetch"

**Causa:** `VITE_API_BASE` incorreto no frontend

**Solução:**
1. Vá nas variáveis do **frontend**
2. Verifique `VITE_API_BASE` = URL do backend
3. NÃO inclua `/api` no final
4. Faça redeploy do frontend

---

### ❌ Página em branco / erro 404

**Causa:** Build do frontend falhou ou configuração errada

**Solução:**
1. Vá em **Deployments → Build Logs**
2. Procure por erros de build
3. Verifique se `Root Directory` = `front`
4. Verifique se `Framework Preset` = `Vite`

---

### ❌ Imóveis não aparecem

**Causa:** Banco de dados não está acessível ou vazio

**Solução:**
1. Teste: `https://SEU-BACKEND.vercel.app/api/properties`
2. Deve retornar um array (vazio ou com imóveis)
3. Se erro 500: verifique `DATABASE_URL` nas variáveis do backend
4. Se array vazio: rode script de seed local ou adicione imóveis pelo admin

---

## 📝 Checklist Final

Antes de apresentar para o professor:

- [ ] Backend online: `https://SEU-BACKEND.vercel.app/api/health` retorna `ok: true`
- [ ] Frontend online: `https://SEU-FRONTEND.vercel.app` abre a home
- [ ] Login funciona (admin@verdemarsc.com / admin123)
- [ ] Imóveis aparecem na home
- [ ] Não tem erros no console (F12)
- [ ] Dashboard do admin funciona
- [ ] Filtros de busca funcionam
- [ ] Detalhes de imóvel abrem

---

## 🔄 Atualizações Futuras

Quando fizer mudanças no código:

```bash
# 1. Commitar mudanças
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin main

# 2. Vercel faz deploy automático
# Aguarde ~2 minutos

# 3. Verifique se está tudo OK
# Frontend: https://SEU-FRONTEND.vercel.app
# Backend: https://SEU-BACKEND.vercel.app/api/health
```

---

## 📞 URLs Importantes

Anote aqui as URLs dos seus projetos:

```
Backend:  https://__________________.vercel.app
Frontend: https://__________________.vercel.app

Admin:
Email:    admin@verdemarsc.com
Senha:    admin123
```

---

## 💡 Dicas Extras

### Debug Rápido

Se algo não funcionar, teste na ordem:

1. **Backend health:** `https://SEU-BACKEND.vercel.app/api/health`
2. **Properties API:** `https://SEU-BACKEND.vercel.app/api/properties`
3. **Console frontend:** F12 → Console (procure erros)
4. **Network tab:** F12 → Network (veja requisições falhando)

### Logs da Vercel

Para ver erros detalhados:
1. Vá no projeto na Vercel
2. **Deployments** → último deployment
3. **Functions** → clique na função
4. **Logs** → veja erros em tempo real

---

**Criado em:** 05/11/2025  
**Versão:** 1.0  
**Autor:** Sistema VerdeMar
