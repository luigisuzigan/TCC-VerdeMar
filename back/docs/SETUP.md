# 🚀 Setup do Backend - VerdeMar

## 📋 Pré-requisitos
- Node.js 18+ instalado
- Acesso ao banco de dados MySQL (credenciais no `.env`)

## 🛠️ Passo a passo para rodar o projeto

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/uKleitin/TCC-VerdeMar.git
cd TCC-VerdeMar/back
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Configure as variáveis de ambiente
Certifique-se de que o arquivo `.env` existe com:
```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
ADMIN_EMAIL=admin@verdemar.com
ADMIN_PASSWORD=admin123
PORT=4000
ALLOWED_ORIGIN=http://localhost:5173
DATABASE_URL="mysql://429770:SamuelDaviLuigi@mysql-iramramramram.alwaysdata.net/iramramramram_verde-mar"
```

### 4️⃣ Gere o Prisma Client
```bash
npx prisma generate
```

### 5️⃣ Aplique as migrações (estrutura do banco)
```bash
npx prisma migrate deploy
```
> 💡 Use `migrate deploy` em vez de `migrate dev` se estiver usando banco compartilhado

**OU** se preferir sincronizar sem criar migrações:
```bash
npx prisma db push
```

### 6️⃣ Popule o banco com dados de teste (OPCIONAL)
```bash
npm run seed
```
> Isso cria imóveis de exemplo para testar a aplicação

**OU** use o seed rápido:
```bash
node quick-seed.js
```

### 7️⃣ Inicie o servidor
```bash
npm run dev
```

O servidor estará rodando em: **http://localhost:4000**

## 🧪 Verificar se funcionou

### Testar a API:
```bash
# Health check
curl http://localhost:4000/api/health

# Ver imóveis
curl http://localhost:4000/api/properties
```

### Testar login:
- **Email:** admin@verdemar.com
- **Senha:** admin123

## 📝 Comandos úteis

```bash
# Ver logs do banco
npx prisma studio

# Verificar quantos imóveis existem
node test-db.js

# Recriar seed (limpar e popular de novo)
node src/scripts/seedProperties.js

# Ver estrutura do banco
npx prisma db pull
```

## 🔧 Troubleshooting

### Erro: "Invalid Prisma Client"
```bash
npx prisma generate
```

### Erro: "Can't reach database"
- Verifique se o `DATABASE_URL` no `.env` está correto
- Teste a conexão com o banco

### Banco vazio (sem imóveis)
```bash
npm run seed
# OU
node quick-seed.js
```

## 📦 Scripts disponíveis no package.json

```json
{
  "dev": "node src/index.js",           // Inicia o servidor
  "seed": "node src/scripts/seedProperties.js"  // Popula o banco
}
```

## 🎯 Resumo do fluxo ideal

```bash
cd back
npm install                    # Instala dependências
npx prisma generate           # Gera Prisma Client
npx prisma migrate deploy     # Aplica migrações
node quick-seed.js            # Popula dados (opcional)
npm run dev                   # Roda o servidor
```

---

✅ Pronto! Agora você pode acessar o frontend em **http://localhost:5173**
