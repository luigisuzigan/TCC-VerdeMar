# 🔒 Guia de Segurança - Arquivos Sensíveis no Git

## ❌ **PROBLEMA: Arquivos Sensíveis Commitados**

Alguns arquivos sensíveis foram commitados anteriormente e continuavam sendo rastreados pelo Git, mesmo após serem adicionados ao `.gitignore`.

### **Arquivos Removidos do Rastreamento:**

- ✅ `back/.env` - Credenciais e secrets
- ✅ `back/prisma/dev.db` - Banco de dados local
- ✅ `back/.data/db.json` - Banco de dados JSON antigo

---

## 🛠️ **COMO FOI RESOLVIDO**

```bash
# Remover do Git mas manter localmente
git rm --cached back/.env
git rm --cached back/prisma/dev.db
git rm --cached back/.data/db.json

# O .gitignore atualizado agora impede que sejam rastreados novamente
```

---

## ⚠️ **POR QUE ISSO ACONTECEU?**

1. **Arquivos commitados ANTES do `.gitignore`**

   - O `.gitignore` só funciona para arquivos **não rastreados**
   - Se o arquivo já foi commitado, ele continua sendo rastreado

2. **`.gitignore` não remove arquivos existentes**
   - Apenas previne que novos arquivos sejam adicionados
   - É necessário usar `git rm --cached` para remover do rastreamento

---

## 🔐 **ARQUIVOS SENSÍVEIS NO PROJETO**

### **🚨 NUNCA commite estes arquivos:**

```
back/.env                      # Credenciais do banco, JWT secrets
back/.env.production          # Credenciais de produção
back/prisma/dev.db            # Banco de dados SQLite local
back/prisma/*.db              # Qualquer arquivo .db
back/uploads/                 # Arquivos enviados por usuários
back/logs/                    # Logs podem conter informações sensíveis
front/.env                    # Configurações do frontend
front/.env.production         # URLs de produção
```

### **✅ APENAS estes podem ser commitados:**

```
back/.env.example             # Template sem valores reais
back/README.md                # Documentação
back/prisma/schema.prisma     # Schema do banco (sem dados)
back/prisma/migrations/       # Migrações (estrutura, não dados)
```

---

## 📋 **CHECKLIST ANTES DE CADA COMMIT**

Antes de fazer commit, sempre verifique:

```bash
# 1. Ver o que será commitado
git status

# 2. Verificar se há arquivos sensíveis
git status | findstr ".env\|.db\|uploads"

# 3. Ver diff dos arquivos modificados
git diff

# 4. Se encontrar arquivo sensível, remover do staging
git restore --staged arquivo-sensivel.txt
```

---

## 🚀 **COMANDOS ÚTEIS**

### **Verificar se há arquivos sensíveis rastreados:**

```bash
# Verificar .env
git ls-files | findstr ".env"

# Verificar .db
git ls-files | findstr ".db"

# Verificar node_modules (não deveria aparecer)
git ls-files | findstr "node_modules"
```

### **Remover arquivo do Git (manter localmente):**

```bash
git rm --cached arquivo.txt
```

### **Remover pasta do Git (manter localmente):**

```bash
git rm -r --cached pasta/
```

### **Limpar cache do Git completamente:**

```bash
git rm -r --cached .
git add .
git commit -m "chore: limpa cache do Git e aplica .gitignore"
```

---

## 🔄 **PRÓXIMOS PASSOS**

### **1. Commit das Mudanças**

```bash
# Adicionar .gitignore atualizado
git add .gitignore

# Commit da remoção dos arquivos sensíveis
git commit -m "chore: remove arquivos sensíveis do Git e atualiza .gitignore"

# Push (isso remove os arquivos do repositório remoto)
git push
```

### **2. Criar `.env.example`**

Crie templates dos arquivos de configuração:

```bash
# back/.env.example
JWT_SECRET=change_me_in_production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_me
PORT=4000
ALLOWED_ORIGIN=http://localhost:5173
DATABASE_URL="file:./dev.db"
```

### **3. Documentar no README**

Adicione instruções para outros desenvolvedores:

````markdown
## Configuração

1. Copie o arquivo de exemplo:
   ```bash
   cp back/.env.example back/.env
   ```
````

2. Edite `back/.env` com suas credenciais locais

````

---

## 🛡️ **BOAS PRÁTICAS**

### ✅ **Sempre Faça:**
- Use `.env.example` com valores de exemplo
- Documente variáveis de ambiente no README
- Revise `git status` antes de commit
- Use `git diff` para ver mudanças
- Mantenha `.gitignore` atualizado

### ❌ **Nunca Faça:**
- Commitar arquivos `.env`
- Commitar bancos de dados
- Commitar `node_modules`
- Commitar arquivos de build (`dist/`, `build/`)
- Commitar uploads de usuários
- Commitar credenciais em comentários de código

---

## 🔥 **SE VOCÊ JÁ COMMITOU CREDENCIAIS**

### **Opção 1: Remover do Histórico (Simples)**
```bash
# Remove do último commit
git rm --cached arquivo-sensivel
git commit --amend --no-edit

# Force push (apenas se ainda não deu push)
git push --force
````

### **Opção 2: Remover Completamente (Avançado)**

```bash
# Usar BFG Repo-Cleaner ou git filter-branch
# Isso reescreve TODO o histórico do Git
# ⚠️ Use com cuidado!
```

### **Opção 3: Trocar as Credenciais**

✅ **SEMPRE faça isso se commitou credenciais:**

1. Troque a senha do banco de dados
2. Gere novo JWT_SECRET
3. Revogue tokens de API
4. Atualize credenciais em produção

---

## 📚 **RECURSOS ADICIONAIS**

- [Git Ignore Patterns](https://git-scm.com/docs/gitignore)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [dotenv Documentation](https://www.npmjs.com/package/dotenv)

---

## ✅ **STATUS ATUAL**

- ✅ `.gitignore` atualizado com todos os padrões
- ✅ Arquivos sensíveis removidos do rastreamento
- ✅ `.env.example` existe para referência
- ✅ Banco de dados local não será mais commitado
- ✅ `node_modules` nunca será commitado

**Seu repositório está seguro agora!** 🔒



