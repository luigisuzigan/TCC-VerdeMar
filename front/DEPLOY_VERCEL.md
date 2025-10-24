# 🚀 Deploy do Frontend na Vercel - Guia Completo

## ✅ Correção Feita

Corrigi o erro de importação:
- ❌ `import Header from '../components/layout/header/Header'`
- ✅ `import Header from '../components/layout/Header/Header'`

## 📋 Passo a Passo para Deploy

### 1. Commit e Push das Correções

Execute no terminal (cmd ou PowerShell):

```cmd
cd "c:\Users\davi_rebeschini\Desktop\tcc verde mar\TCC-VerdeMar"

git add front/src/layouts/AdminLayout.jsx

git commit -m "fix: corrige caminho do import Header"

git push
```

### 2. Criar Projeto na Vercel

1. Acesse: https://vercel.com/new
2. Selecione o repositório: `TCC-VerdeMar`
3. Configure:

```
Project Name:         verdemar-front (ou outro nome)
Framework Preset:     Vite
Root Directory:       front
Build Command:        npm run build
Output Directory:     dist
Install Command:      npm install
```

### 3. Variáveis de Ambiente (OBRIGATÓRIAS!)

Antes de clicar em "Deploy", adicione em **Environment Variables**:

#### Obrigatória:
```bash
VITE_API_BASE=https://SEU_BACKEND.vercel.app
```

**⚠️ IMPORTANTE:** Substitua `SEU_BACKEND` pela URL real do seu backend que você fez deploy antes.

Exemplo:
```bash
VITE_API_BASE=https://verdemar-api.vercel.app
```

#### Opcional (se usar Google Maps):
```bash
VITE_GOOGLE_MAPS_API_KEY=sua_chave_google_maps
```

### 4. Deploy

Clique em **Deploy** e aguarde 2-3 minutos.

### 5. Atualizar CORS no Backend

**IMPORTANTE:** Após o frontend estar online, você precisa atualizar o backend:

1. Vá no projeto do **backend** na Vercel
2. **Settings → Environment Variables**
3. Edite `ALLOWED_ORIGIN`:
   ```bash
   ALLOWED_ORIGIN=https://SEU_FRONTEND.vercel.app
   ```
4. Clique em **Save**
5. Vá em **Deployments** e faça **Redeploy**

---

## 🔧 Configuração Resumida

| Campo | Valor |
|-------|-------|
| Framework Preset | Vite |
| Root Directory | `front` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## ✅ Checklist de Deploy

Antes do deploy:
- [x] Corrigido import do Header (case-sensitive)
- [ ] Commit e push feitos
- [ ] Backend já está online na Vercel
- [ ] Tem a URL do backend para usar em `VITE_API_BASE`

Durante o deploy:
- [ ] Configurou `VITE_API_BASE` corretamente
- [ ] Framework Preset = Vite
- [ ] Root Directory = front

Após o deploy:
- [ ] Site abre sem erros
- [ ] Atualizado `ALLOWED_ORIGIN` no backend
- [ ] Testado login/cadastro
- [ ] Listagem de imóveis funciona

---

## 🧪 Testar Após Deploy

### 1. Verificar se o site abre
```
https://seu-frontend.vercel.app
```

### 2. Abrir DevTools (F12) → Console
Procure por erros de:
- CORS (se aparecer, o `ALLOWED_ORIGIN` do backend está errado)
- 404 nas chamadas de API (se aparecer, o `VITE_API_BASE` está errado)

### 3. Testar funcionalidades principais
- [ ] Criar conta
- [ ] Fazer login
- [ ] Listar imóveis na home
- [ ] Ver detalhes de um imóvel
- [ ] Adicionar aos favoritos (requer login)

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module"
- **Causa:** Import com case errado (ex: `header` vs `Header`)
- **Solução:** Linux é case-sensitive, Windows não. Corrija os imports.

### Erro: CORS bloqueado
- **Causa:** `ALLOWED_ORIGIN` do backend não bate com URL do front
- **Solução:** 
  1. Copie a URL exata do frontend
  2. Atualize no backend na Vercel
  3. Faça redeploy do backend

### Erro: API retorna 404
- **Causa:** `VITE_API_BASE` incorreto ou não definido
- **Solução:**
  1. Verifique a variável no painel da Vercel
  2. URL deve ser: `https://seu-backend.vercel.app` (sem /api no final)

### Build demora muito
- **Normal:** Primeiro build pode levar 3-5 minutos
- **Próximos builds:** ~1-2 minutos
- A Vercel usa cache para acelerar

---

## 🔗 URLs Finais

Anote as URLs dos seus projetos:

```
Backend:  https://__________________.vercel.app
Frontend: https://__________________.vercel.app
```

---

## 📊 Monitoramento

### Ver logs de build:
Na Vercel, vá em **Deployments** → clique no deployment → **Build Logs**

### Ver logs de runtime:
**Functions** → clique na função → **Logs**

### Analytics:
**Analytics** → veja tempo de resposta e erros

---

## 🎯 Próximos Passos (Opcional)

### Configurar domínio próprio:
1. Vá em **Settings → Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções da Vercel
4. Atualize `ALLOWED_ORIGIN` no backend com novo domínio

### Configurar redirect de www:
Se usar domínio próprio, configure:
- `example.com` → domínio principal
- `www.example.com` → redireciona para principal

---

Pronto! Seu frontend estará online na Vercel. 🎉
