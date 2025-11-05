# ✅ CRUD de Usuários - Implementação Completa

## 📦 Arquivos Criados/Modificados

### Backend (`/back/src`)

1. **`repos/userRepo.js`** ✅ Atualizado

   - ✅ `listUsers()` - Lista com filtros e paginação
   - ✅ `findUserById()` - Busca por ID (sem senha)
   - ✅ `findUserByIdWithPassword()` - Busca com senha (auth)
   - ✅ `findUserByEmail()` - Busca por email
   - ✅ `createUser()` - Criar usuário
   - ✅ `updateUser()` - Atualizar perfil
   - ✅ `updateUserPassword()` - Atualizar senha
   - ✅ `updateUserRole()` - Atualizar role
   - ✅ `toggleUserStatus()` - Ativar/desativar
   - ✅ `deleteUser()` - Deletar permanentemente
   - ✅ `getUserStats()` - Estatísticas
   - ✅ `ensureAdmin()` - Seed de admin

2. **`users/routes.js`** ✅ Criado

   - ✅ GET `/api/users` - Listar (admin)
   - ✅ GET `/api/users/stats` - Estatísticas (admin)
   - ✅ GET `/api/users/:id` - Buscar por ID (admin ou próprio)
   - ✅ PUT `/api/users/:id` - Atualizar perfil (admin ou próprio)
   - ✅ PUT `/api/users/:id/password` - Mudar senha (próprio)
   - ✅ PUT `/api/users/:id/role` - Mudar role (admin)
   - ✅ PUT `/api/users/:id/toggle-status` - Ativar/desativar (admin)
   - ✅ DELETE `/api/users/:id` - Deletar (admin)

3. **`index.js`** ✅ Atualizado

   - ✅ Importação das rotas de usuários
   - ✅ Registro em `/api/users`

4. **`scripts/createAdmin.js`** ✅ Criado

   - Script interativo para criar admin manualmente

5. **`scripts/listUsers.js`** ✅ Criado
   - Script para listar usuários com estatísticas

### Documentação

6. **`USERS_API.md`** ✅ Criado

   - Documentação completa da API
   - Exemplos de requisições
   - Tabela de permissões

7. **`examples/usersApiExamples.js`** ✅ Criado
   - Exemplos práticos em JavaScript
   - Funções helper reutilizáveis

---

## 🎯 Funcionalidades Implementadas

### ✅ CREATE (Criar)

- ✅ Registro de usuário (via `/api/auth/register`)
- ✅ Script interativo de criação de admin
- ✅ Seed automático de admin ao iniciar servidor

### ✅ READ (Ler)

- ✅ Listar todos os usuários (paginação)
- ✅ Filtros: busca, role, status
- ✅ Buscar usuário específico por ID
- ✅ Estatísticas gerais de usuários
- ✅ Contador de propriedades/favoritos/reviews por usuário

### ✅ UPDATE (Atualizar)

- ✅ Atualizar perfil (nome, telefone, avatar, bio)
- ✅ Atualizar senha (com validação de senha atual)
- ✅ Atualizar role (USER → SELLER → ADMIN)
- ✅ Ativar/desativar conta (soft delete)

### ✅ DELETE (Deletar)

- ✅ Deletar usuário permanentemente (hard delete)
- ✅ Proteção: não permite deletar própria conta

---

## 🔒 Sistema de Permissões

| Ação                     | USER | SELLER | ADMIN |
| ------------------------ | ---- | ------ | ----- |
| Ver lista de usuários    | ❌   | ❌     | ✅    |
| Ver estatísticas         | ❌   | ❌     | ✅    |
| Ver próprio perfil       | ✅   | ✅     | ✅    |
| Ver perfil de outros     | ❌   | ❌     | ✅    |
| Editar próprio perfil    | ✅   | ✅     | ✅    |
| Editar perfil de outros  | ❌   | ❌     | ✅    |
| Mudar própria senha      | ✅   | ✅     | ✅    |
| Mudar role               | ❌   | ❌     | ✅    |
| Ativar/desativar usuário | ❌   | ❌     | ✅    |
| Deletar usuário          | ❌   | ❌     | ✅    |

---

## 🚀 Como Usar

### 1. Testar as Rotas

```bash
# 1. Iniciar servidor
cd back
npm run dev

# 2. Fazer login para obter token
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@verdemar.com","password":"admin123"}'

# 3. Listar usuários (substitua TOKEN)
curl http://localhost:4000/api/users \
  -H "Authorization: Bearer TOKEN"
```

### 2. Criar Admin Manualmente

```bash
cd back
node src/scripts/createAdmin.js
```

### 3. Listar Usuários via Script

```bash
cd back
node src/scripts/listUsers.js
```

---

## 📋 Validações Implementadas

### Perfil do Usuário

- `name`: 1-120 caracteres
- `phone`: até 20 caracteres
- `avatar`: URL válida
- `bio`: até 500 caracteres

### Senha

- Mínimo 6 caracteres
- Criptografia bcrypt (10 rounds)
- Validação de senha atual ao mudar

### Role

- Valores válidos: `USER`, `SELLER`, `ADMIN`
- Apenas admin pode alterar

### Status

- Boolean: `true` (ativo) ou `false` (inativo)
- Admin não pode desativar própria conta

---

## 🔍 Filtros Disponíveis

```javascript
// Exemplo de filtros
GET /api/users?search=joão&role=SELLER&isActive=true&limit=10&offset=0

// Parâmetros:
- search: busca por nome ou email
- role: USER | SELLER | ADMIN
- isActive: true | false
- limit: 1-100 (padrão: 20)
- offset: paginação (padrão: 0)
```

---

## 📊 Dados Retornados

### Usuário Completo

```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "+55 11 98765-4321",
  "avatar": "https://...",
  "bio": "Corretor de imóveis",
  "role": "SELLER",
  "isActive": true,
  "createdAt": "2025-10-13T...",
  "updatedAt": "2025-10-13T...",
  "_count": {
    "properties": 5,
    "favorites": 12,
    "reviews": 3
  }
}
```

---

## 🛡️ Segurança

✅ JWT Authentication obrigatória
✅ Validação de dados com express-validator
✅ Senhas criptografadas com bcrypt
✅ Proteção contra deletar própria conta
✅ Soft delete (isActive) + Hard delete
✅ Validação de permissões por role
✅ Sanitização de dados de entrada

---

## 📚 Próximos Passos

Para integrar no frontend, você pode:

1. **Criar serviço de usuários no frontend**:

```javascript
// front/src/api/usersService.js
import { api } from "./client.js";

export const usersService = {
  list: (filters) => api.get("/users", { params: filters }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  updatePassword: (id, data) => api.put(`/users/${id}/password`, data),
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),
  toggleStatus: (id, isActive) =>
    api.put(`/users/${id}/toggle-status`, { isActive }),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get("/users/stats")
};
```

2. **Criar páginas de gerenciamento**:
   - `/admin/users` - Lista de usuários
   - `/admin/users/:id` - Detalhes/edição
   - `/account/profile` - Perfil do usuário logado
   - `/account/security` - Mudar senha

---

## ✅ RESUMO

✅ **8 endpoints RESTful** implementados
✅ **11 métodos** no repositório
✅ **Validações** completas
✅ **Permissões** por role
✅ **Scripts** de administração
✅ **Documentação** completa
✅ **Exemplos** de uso
✅ **Segurança** implementada

**O CRUD de usuários está 100% funcional e pronto para uso!** 🎉
