# ⚡ Quick Start - Backend VerdeMar

## 🎯 Para seus amigos rodarem o projeto:

```bash
# 1. Entrar na pasta
cd TCC-VerdeMar/back

# 2. Instalar dependências
npm install

# 3. Gerar Prisma Client
npx prisma generate

# 4. Aplicar estrutura do banco (escolha UMA opção):

## Opção A: Com histórico de migrações (RECOMENDADO)
npx prisma migrate deploy

## Opção B: Sincronizar direto (mais rápido)
npx prisma db push

# 5. Criar dados de teste (OPCIONAL mas recomendado)
npm run seed

# 6. Rodar o servidor
npm run dev
```

---

## 🤔 Qual a diferença?

### `npx prisma migrate deploy` vs `npx prisma db push`

| Comando | O que faz | Quando usar |
|---------|-----------|-------------|
| `migrate deploy` | Aplica migrações do histórico | ✅ Produção / Banco compartilhado |
| `db push` | Sincroniza schema direto | 🧪 Desenvolvimento / Testes rápidos |

### `npm run seed` - Para que serve?

- ❌ **NÃO** altera a estrutura do banco
- ✅ **SIM** adiciona dados de exemplo (imóveis, usuários)
- 💡 Útil para ter dados para testar a aplicação

---

## 🆘 Se der erro:

```bash
# Erro: "Invalid Prisma Client"
npx prisma generate

# Erro: Banco vazio
npm run seed

# Ver o que tem no banco
npx prisma studio
```

---

## 📝 Resumo ultra rápido:

```bash
cd back
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed
npm run dev
```

**Pronto!** ✅ API rodando em http://localhost:4000
