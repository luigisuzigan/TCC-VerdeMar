# Deploy do VerdeMar na Vercel (Frontend) + Render/Railway (Backend)

Guia passo a passo e direto ao ponto para publicar o projeto em produção.

## Visão Geral
- Frontend (React + Vite): Vercel como hospedagem estática.
- Backend (Node + Express + Prisma/MySQL): Render ou Railway como API HTTP.
- Banco de Dados: Reutilize o MySQL atual (AlwaysData) ou crie um novo no provedor do backend.

Por que assim? O backend usa conexões de banco e Prisma. Em Vercel (serverless) isso exige ajustes extras (Prisma Accelerate/Data Proxy). É bem mais simples manter o backend como serviço Node “normal” (Render/Railway) e usar a Vercel apenas para o front.

---

## 1) Preparar variáveis de ambiente

Anote o domínio que a Vercel dará ao front (ex.: https://verdemar.vercel.app) e o domínio do backend (ex.: https://verdemar-api.onrender.com).

- Backend (Render/Railway):
  - DATABASE_URL=... (MySQL existente)
  - ADMIN_EMAIL=admin@verdemar.com (opcional)
  - ADMIN_PASSWORD=admin123 (opcional)
  - ALLOWED_ORIGIN=https://SEU_DOMINIO_DA_VERCEL
  - PORT (Render define sozinho; nosso código usa process.env.PORT)

- Frontend (Vercel):
  - VITE_API_BASE=https://SEU_DOMINIO_DA_API (ex.: https://verdemar-api.onrender.com)
  - VITE_GOOGLE_MAPS_API_KEY=... (se for usar Google Maps)

No front, o axios usa VITE_API_BASE automaticamente (fallback para http://localhost:4000 em dev).

---

## 2) Backend no Render (exemplo)
1. Crie conta em https://render.com e “New +” → Web Service.
2. Conecte seu repositório ou faça deploy via Docker/CLI. Se usar este repo monorepo, selecione a pasta `back/` como Root Directory.
3. Defina:
   - Runtime: Node 18+ (ou 20)
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `node src/index.js`
4. Em Settings → Environment → Add Environment Variable, configure as variáveis listadas acima (DATABASE_URL, ALLOWED_ORIGIN, etc.).
5. Deploy. Ao subir, teste: `GET /api/health` deve responder `{ ok: true }`.

Railway é similar: crie um projeto, adicione um serviço Node apontando para `back/`, configure as envs, e use o mesmo Build/Start.

> Dica: `SHADOW_DATABASE_URL` só é necessário para `migrate dev` (desenvolvimento). Em produção use `migrate deploy`.

---

## 3) Frontend na Vercel
1. Crie projeto na Vercel e selecione este repositório.
2. Em “Project Settings” → “General” → “Root Directory”, escolha `front/`.
3. Build & Output:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Em “Environment Variables”, adicione:
   - `VITE_API_BASE=https://SEU_BACKEND`
   - (opcional) `VITE_GOOGLE_MAPS_API_KEY=...`
5. Deploy.

### SPA fallback (rotas do React Router)
Já incluímos um `front/vercel.json` com fallback para `index.html`, evitando 404 em rotas como `/explorar`.

---

## 4) CORS
No backend, o CORS permite localhost e um domínio via `ALLOWED_ORIGIN`. Configure `ALLOWED_ORIGIN` exatamente para o domínio da Vercel, por exemplo:
```
ALLOWED_ORIGIN=https://verdemar.vercel.app
```

---

## 5) Testes rápidos pós-deploy
- Backend: abra `https://SUA_API/api/health` → `{ ok: true }`.
- Frontend: abra o domínio da Vercel. Faça login/criação de usuário, listar imóveis, etc.
- Console do navegador: verifique se chamadas vão para `https://SUA_API/api/...` e retornam 200.

---

## 6) Problemas comuns
- 404 ao atualizar página no front: confirme `front/vercel.json` (SPA fallback) e que o projeto usa `front/` como Root Directory.
- CORS bloqueado: verifique `ALLOWED_ORIGIN` no backend e que a URL bate com “https://…” exato da Vercel.
- Erro Prisma em produção: rode `npx prisma generate` e `npx prisma migrate deploy` no build do backend; confira `DATABASE_URL`.
- Tempo de resposta alto: use instância maior no Render/Railway. Ative logs e monitore.

---

## 7) Alternativa: Backend na Vercel (avançado)
É possível portar o Express para Serverless Functions e usar Prisma Accelerate/Data Proxy para MySQL com pool serverless. Isso requer ajustes de código e configuração extra. Recomendo somente se quiser tudo na Vercel.

---

Pronto! Com isso você terá o front na Vercel e a API online no Render/Railway, apontando corretamente via `VITE_API_BASE` e com CORS liberado.
