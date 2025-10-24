# Deploy do Backend na Vercel - Guia Completo

Este guia detalha como fazer deploy da pasta `back/` na Vercel como Serverless Functions.

## 📋 Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. MySQL hospedado (ex: PlanetScale, Railway, AlwaysData, etc.)
3. Repositório Git com o código

---

## 🚀 Passo a Passo

### 1. Preparar o Banco de Dados MySQL

Você precisa de um banco MySQL acessível pela internet. Opções:

- **PlanetScale** (recomendado para Vercel)
  - Plano gratuito disponível
  - Otimizado para serverless
  - https://planetscale.com
  
- **Railway**
  - MySQL com $5 de crédito grátis
  - https://railway.app
  
- **AlwaysData** (atual do projeto)
  - Já configurado: `mysql-iramramramram.alwaysdata.net`

Anote a `DATABASE_URL` no formato:
```
mysql://usuario:senha@host:3306/database
```

### 2. Criar Projeto na Vercel

1. Acesse https://vercel.com/new
2. Selecione o repositório `TCC-VerdeMar`
3. Configure:
   - **Project Name**: `verdemar-api` (ou outro nome)
   - **Framework Preset**: Other
   - **Root Directory**: `back/`
   - **Build Command**: deixe em branco (usa package.json)
   - **Output Directory**: deixe em branco

### 3. Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:

#### Obrigatórias:

```bash
DATABASE_URL=mysql://usuario:senha@host:3306/database
```

#### Recomendadas:

```bash
# Admin padrão do sistema
ADMIN_EMAIL=admin@verdemar.com
ADMIN_PASSWORD=SuaSenhaSegura123

# CORS - domínio do frontend na Vercel
ALLOWED_ORIGIN=https://seu-frontend.vercel.app

# JWT Secret (gere uma chave aleatória)
JWT_SECRET=sua_chave_secreta_aqui_64_caracteres_minimo

# Google Maps (opcional)
GOOGLE_MAPS_API_KEY=sua_chave_google_maps
```

> 💡 **Dica**: Para gerar JWT_SECRET seguro:
> ```bash
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
> ```

### 4. Deploy

Clique em **Deploy** e aguarde o build.

O processo vai:
1. Instalar dependências (`npm install`)
2. Executar `postinstall` → `prisma generate`
3. Executar `vercel-build` → `prisma migrate deploy`
4. Fazer deploy das funções serverless

### 5. Testar a API

Após o deploy, acesse:

```
https://seu-projeto.vercel.app/api/health
```

Resposta esperada:
```json
{ "ok": true }
```

Teste outros endpoints:
```bash
# Login
POST https://seu-projeto.vercel.app/api/auth/login
Body: { "email": "admin@verdemar.com", "password": "SuaSenha" }

# Listar propriedades
GET https://seu-projeto.vercel.app/api/properties
```

---

## ⚙️ Arquivos Criados/Modificados

### 1. `api/index.js`
Handler serverless que exporta o Express app. Inicializa o admin apenas no cold start.

### 2. `vercel.json`
Configuração da Vercel:
- Define runtime Node.js 20
- Roteia todas as chamadas `/api/*` para a função
- Define timeout de 30s

### 3. `package.json`
Adicionados scripts:
- `postinstall`: Gera Prisma Client automaticamente
- `vercel-build`: Executa migrations em produção

### 4. `.vercelignore`
Otimiza upload excluindo arquivos desnecessários (testes, scripts, migrações locais).

---

## 🔧 Troubleshooting

### Erro: "Can't reach database server"
- Verifique se `DATABASE_URL` está correta
- Confirme que o banco aceita conexões externas
- PlanetScale: use connection string para serverless

### Erro: "Prisma Client not found"
- Confirme que `postinstall` está rodando
- Verifique logs do build na Vercel
- Force redeploy: `vercel --prod --force`

### Erro: CORS bloqueado
- Configure `ALLOWED_ORIGIN` com o domínio exato do frontend
- Ex: `https://verdemar-front.vercel.app`

### Timeout (504)
- Otimize queries do Prisma
- Use connection pooling (PlanetScale recomendado)
- Aumente `maxDuration` em `vercel.json` (até 60s no plano Pro)

### Admin não é criado
- Verifique logs: `vercel logs seu-projeto.vercel.app`
- Confirme `ADMIN_EMAIL` e `ADMIN_PASSWORD` nas env vars

---

## 📊 Monitoramento

### Ver logs em tempo real:
```bash
vercel logs seu-projeto.vercel.app --follow
```

### Analytics:
- Acesse o painel da Vercel → Analytics
- Monitore tempo de resposta e erros

---

## 🔐 Segurança

### Recomendações:
1. **Nunca commite** `.env` no Git
2. Use **JWT_SECRET forte** (64+ caracteres)
3. Configure **ALLOWED_ORIGIN** restritivo em produção
4. Ative **2FA** na Vercel
5. Use **variáveis de ambiente** para secrets

---

## 🔄 Atualizações

Para atualizar o backend:
1. Faça push no repositório Git
2. Vercel faz redeploy automático
3. Migrations são aplicadas via `vercel-build`

Para forçar redeploy:
```bash
vercel --prod --force
```

---

## 🌐 Conectar Frontend

No projeto do frontend (também na Vercel), configure:

```bash
# Environment Variables do frontend
VITE_API_BASE=https://seu-backend.vercel.app
```

No código já está configurado:
```javascript
// front/src/api/client.js
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
```

---

## 💡 Dicas de Performance

1. **Use PlanetScale**: Melhor performance serverless
2. **Connection Pooling**: Configure em `schema.prisma`:
   ```prisma
   datasource db {
     provider = "mysql"
     url = env("DATABASE_URL")
     relationMode = "prisma" // Para PlanetScale
   }
   ```
3. **Cache**: Considere adicionar Redis (Upstash) no futuro
4. **Imagens**: Use CDN para arquivos estáticos

---

## ✅ Checklist Final

- [ ] Banco MySQL acessível
- [ ] `DATABASE_URL` configurada na Vercel
- [ ] `ALLOWED_ORIGIN` com domínio do front
- [ ] `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos
- [ ] Deploy realizado com sucesso
- [ ] `/api/health` retorna `{ ok: true }`
- [ ] Login funciona com as credenciais de admin
- [ ] Frontend conectado via `VITE_API_BASE`

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs: `vercel logs`
2. Consulte docs: https://vercel.com/docs
3. Revise `TROUBLESHOOTING.md` na raiz do projeto

---

**Pronto!** Seu backend está rodando na Vercel como Serverless Functions. 🎉
