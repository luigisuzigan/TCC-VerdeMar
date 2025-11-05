# 🔧 Correções CORS e Vercel - Resumo

## ✅ Problemas Corrigidos

### 1. **CORS muito restritivo** ❌ → ✅
**Antes:** Bloqueava previews da Vercel e algumas origens válidas
**Depois:** 
- Aceita todos os subdomínios `*.vercel.app`
- Aceita localhost em qualquer porta
- Aceita 127.0.0.1
- Headers CORS completos

### 2. **vercel.json incompleto** ❌ → ✅
**Antes:** Só tinha rewrites
**Depois:**
- Headers CORS explícitos
- Configuração de functions (maxDuration)
- Environment variables
- Suporte completo a preflight (OPTIONS)

### 3. **Prisma não otimizado para serverless** ❌ → ✅
**Antes:** Singleton global causava problemas
**Depois:**
- Configuração específica para produção
- Binary targets para Vercel
- Relation mode "prisma" (melhor para serverless)
- Sem timers que não funcionam em serverless

### 4. **Handler da Vercel sem tratamento de erros** ❌ → ✅
**Antes:** Erros não tratados adequadamente
**Depois:**
- Headers CORS manuais (backup)
- Tratamento de OPTIONS explícito
- Try/catch com logs
- Inicialização de admin com retry

---

## 📝 Arquivos Modificados

### `back/src/app.js`
- ✅ CORS configurado para aceitar Vercel previews
- ✅ Regex para `*.vercel.app`
- ✅ Headers expandidos (Cache-Control, Pragma, Expires)
- ✅ MaxAge de 24h para cache de preflight
- ✅ Middleware OPTIONS global

### `back/vercel.json`
- ✅ Headers CORS completos
- ✅ Functions configuration
- ✅ Environment NODE_ENV=production

### `back/api/index.js`
- ✅ Headers CORS manuais (backup)
- ✅ Tratamento de OPTIONS
- ✅ Try/catch com logs
- ✅ Admin init com error handling

### `back/src/prisma.js`
- ✅ Configuração otimizada para serverless
- ✅ Sem timers em ambiente Vercel
- ✅ Logs condicionais (DEBUG_PRISMA)

### `back/prisma/schema.prisma`
- ✅ Binary targets para Vercel
- ✅ Relation mode "prisma"

---

## 🚀 Próximos Passos

### 1. Commit e Push
```bash
cd back
git add .
git commit -m "fix: corrige CORS para Vercel e otimiza Prisma para serverless"
git push
```

### 2. Configurar Variáveis de Ambiente na Vercel

Acesse seu projeto no painel da Vercel → Settings → Environment Variables

Adicione todas as variáveis do arquivo `.env.vercel.example`:

```env
JWT_SECRET=seu-secret-aqui
ADMIN_EMAIL=admin@verdemarsc.com
ADMIN_PASSWORD=admin123
DATABASE_URL=mysql://...
SHADOW_DATABASE_URL=mysql://...
GOOGLE_MAPS_API_KEY=...
ALLOWED_ORIGIN=https://tcc-verde-mar.vercel.app
NODE_ENV=production
```

### 3. Deploy
O deploy acontecerá automaticamente após o push, ou:
- Acesse Vercel → Deployments
- Clique em "Redeploy"

### 4. Testar

```bash
# Health check
curl https://seu-backend.vercel.app/api/health

# Login
curl -X POST https://seu-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@verdemarsc.com","password":"admin123"}'
```

### 5. Atualizar Frontend

No projeto do **frontend** na Vercel:
- Settings → Environment Variables
- Edite `VITE_API_BASE`
- Cole: `https://seu-backend.vercel.app`
- Redeploy

---

## 🐛 Debug CORS

Se ainda tiver problemas de CORS:

### 1. Ver logs da Vercel
```
Vercel → Deployments → [seu deploy] → Functions → Logs
```

### 2. Verificar origem bloqueada
Procure nos logs por:
```
⚠️ CORS bloqueado para origem: https://...
```

### 3. Adicionar origem manualmente
Se uma origem específica estiver sendo bloqueada, adicione em `back/src/app.js`:

```javascript
const allowedOrigins = [
  // ...
  'https://sua-origem-aqui.vercel.app',
];
```

### 4. Testar CORS manualmente
```bash
curl -H "Origin: https://tcc-verde-mar.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS \
  https://seu-backend.vercel.app/api/auth/login -v
```

Deve retornar headers:
```
Access-Control-Allow-Origin: https://tcc-verde-mar.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Credentials: true
```

---

## 📚 Documentação Adicional

- [CHECKLIST_VERCEL_DEPLOY.md](CHECKLIST_VERCEL_DEPLOY.md) - Checklist completo
- [.env.vercel.example](.env.vercel.example) - Variáveis de ambiente

---

✅ **Todas as correções aplicadas!** Agora é só fazer push e deploy.
