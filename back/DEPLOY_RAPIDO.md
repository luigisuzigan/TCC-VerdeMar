# 🚀 Deploy Rápido - Backend na Vercel

## Arquivos Preparados ✅

O backend já está configurado para Vercel Serverless:

- ✅ `api/index.js` - Handler serverless
- ✅ `vercel.json` - Configuração Vercel
- ✅ `package.json` - Scripts de build atualizados
- ✅ `.vercelignore` - Otimização de upload

## Passo a Passo

### 1. Acesse Vercel
- https://vercel.com/new
- Faça login com GitHub

### 2. Import Repository
- Selecione: `TCC-VerdeMar`
- Configure:
  ```
  Framework Preset: Other
  Root Directory: back/
  Build Command: (deixe em branco)
  Output Directory: (deixe em branco)
  ```

### 3. Variáveis de Ambiente (OBRIGATÓRIO)

Clique em "Environment Variables" e adicione:

```bash
# Banco de dados (obrigatório)
DATABASE_URL=mysql://usuario:senha@host:3306/database

# Admin (recomendado)
ADMIN_EMAIL=admin@verdemar.com
ADMIN_PASSWORD=SuaSenhaSegura123

# CORS - domínio do frontend
ALLOWED_ORIGIN=https://seu-frontend.vercel.app
```

### 4. Deploy
- Clique em **Deploy**
- Aguarde 2-3 minutos

### 5. Teste
Acesse: `https://seu-projeto.vercel.app/api/health`

Deve retornar:
```json
{ "ok": true }
```

---

## 📌 Importante

### DATABASE_URL
Você já tem um MySQL no AlwaysData. Use:
```
mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar
```

**OU** crie um novo no PlanetScale (recomendado para Vercel):
- https://planetscale.com (gratuito)
- Melhor performance com serverless
- Connection pooling otimizado

### ALLOWED_ORIGIN
Depois que fizer deploy do frontend, volte aqui e atualize com:
```
ALLOWED_ORIGIN=https://verdemar-front.vercel.app
```

---

## 🔗 Próximo Passo: Frontend

Depois que o backend estiver no ar:

1. Acesse Vercel → New Project
2. Selecione `TCC-VerdeMar`
3. Configure:
   ```
   Root Directory: front/
   Framework: Vite
   ```
4. Adicione variável:
   ```
   VITE_API_BASE=https://SEU_BACKEND.vercel.app
   ```
5. Deploy

---

## 📖 Documentação Completa

Para mais detalhes, veja:
- `DEPLOY_VERCEL_BACKEND.md` - Guia completo do backend
- `../DEPLOY_VERCEL.md` - Estratégia geral

---

## ✅ Checklist

- [ ] Projeto criado na Vercel
- [ ] Root Directory = `back/`
- [ ] DATABASE_URL configurada
- [ ] Deploy com sucesso
- [ ] `/api/health` responde OK
- [ ] Anote a URL do backend para usar no frontend

**URL do Backend**: ___________________________

---

Pronto para deploy! 🎉
