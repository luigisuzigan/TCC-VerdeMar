# ✅ Checklist - Deploy Backend na Vercel

## 📋 Antes do Deploy

### 1. Variáveis de Ambiente
Configure todas essas variáveis no painel da Vercel (Settings → Environment Variables):

```bash
JWT_SECRET=seu-secret-aqui-minimo-32-caracteres
ADMIN_EMAIL=admin@verdemarsc.com
ADMIN_PASSWORD=admin123
DATABASE_URL=mysql://user:password@host/database?connection_limit=5&pool_timeout=30
SHADOW_DATABASE_URL=mysql://user:password@host/database_shadow?connection_limit=2
GOOGLE_MAPS_API_KEY=sua-chave-aqui
ALLOWED_ORIGIN=https://tcc-verde-mar.vercel.app
NODE_ENV=production
```

### 2. Verificar Arquivos

- [x] `vercel.json` - Configuração de rotas e headers CORS
- [x] `api/index.js` - Handler serverless
- [x] `.vercelignore` - Arquivos ignorados no build
- [x] `package.json` - Script `postinstall` para Prisma

### 3. Banco de Dados

- [ ] Banco MySQL criado e acessível
- [ ] Shadow database criado (para migrations)
- [ ] Migrations rodadas (`npx prisma migrate deploy`)
- [ ] Admin user criado (é criado automaticamente no primeiro acesso)

---

## 🚀 Deploy

### Passo 1: Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. New Project
3. Selecione o repositório `TCC-VerdeMar`
4. **Root Directory**: `back`

### Passo 2: Configurar Build
```
Framework Preset: Other
Build Command: npm run postinstall
Output Directory: (deixe vazio)
Install Command: npm install
```

### Passo 3: Adicionar Environment Variables
Cole todas as variáveis listadas acima.

### Passo 4: Deploy
Clique em **Deploy** e aguarde ~2 minutos.

---

## 🧪 Testar Após Deploy

### 1. Health Check
```bash
curl https://seu-backend.vercel.app/api/health
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

### 2. Root Endpoint
```bash
curl https://seu-backend.vercel.app/
```

Deve retornar info da API.

### 3. Login Admin
```bash
curl -X POST https://seu-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@verdemarsc.com","password":"admin123"}'
```

Deve retornar token JWT.

### 4. Listar Propriedades
```bash
curl https://seu-backend.vercel.app/api/properties
```

---

## 🐛 Problemas Comuns

### CORS Bloqueado
**Sintoma:** Frontend não consegue acessar API
**Solução:**
1. Verifique se `ALLOWED_ORIGIN` está correto
2. Acesse Vercel → Settings → Domains e copie a URL exata do frontend
3. Atualize `ALLOWED_ORIGIN` com essa URL
4. Redeploy do backend

### Database Connection Error
**Sintoma:** Erro "P2037" ou "max_user_connections"
**Solução:**
1. Verifique se `DATABASE_URL` tem `connection_limit=5` (ou menos)
2. Verifique se o MySQL permite conexões externas
3. Teste conexão manualmente com `mysql -h host -u user -p`

### Prisma Generate Failed
**Sintoma:** Build falha com erro do Prisma
**Solução:**
1. Verifique se `postinstall` script existe em `package.json`
2. Adicione manualmente: `"postinstall": "prisma generate"`
3. Force rebuild: Settings → General → Redeploy

### 500 Internal Server Error
**Sintoma:** Todas as rotas retornam 500
**Solução:**
1. Acesse Vercel → Functions → Logs
2. Procure por erros específicos
3. Ative `DEBUG_PRISMA=true` nas env vars para ver queries
4. Verifique se migrations foram rodadas

---

## 📊 Monitoramento

### Ver Logs em Tempo Real
1. Acesse Vercel Dashboard
2. Seu Projeto → Deployments
3. Clique no deployment ativo
4. Aba **Functions** → Clique na função
5. Veja logs em tempo real

### Métricas
- Acesse **Analytics** para ver:
  - Tempo de resposta
  - Taxa de erro
  - Requests por segundo

---

## 🔄 Atualizar Backend

### Deploy Automático
Todo push para `main` dispara deploy automático.

### Deploy Manual
```bash
git add .
git commit -m "fix: corrige CORS"
git push
```

### Rollback
Se algo der errado:
1. Vercel → Deployments
2. Encontre deployment anterior funcionando
3. Clique nos "..." → **Promote to Production**

---

## 📱 Atualizar Frontend

Após deploy do backend, atualize o frontend:

1. Copie a URL do backend (ex: `https://verdemar-api.vercel.app`)
2. No projeto do **frontend** na Vercel:
   - Settings → Environment Variables
   - Edite `VITE_API_BASE`
   - Cole a URL do backend (sem `/api` no final)
3. Redeploy do frontend

---

✅ **Pronto!** Backend rodando na Vercel com CORS configurado corretamente.
