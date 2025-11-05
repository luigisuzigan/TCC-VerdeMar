# 👥 API de Usuários - Documentação

Base URL: `http://localhost:4000/api/users`

---

## 📚 **ÍNDICE**

- [Listar Usuários](#listar-usuários)
- [Estatísticas de Usuários](#estatísticas-de-usuários)
- [Buscar Usuário por ID](#buscar-usuário-por-id)
- [Atualizar Perfil](#atualizar-perfil)
- [Atualizar Senha](#atualizar-senha)
- [Atualizar Role](#atualizar-role)
- [Ativar/Desativar Usuário](#ativardesativar-usuário)
- [Deletar Usuário](#deletar-usuário)

---

## 🔍 **READ - Leitura**

### Listar Usuários

Retorna lista paginada de usuários (apenas admin)

```http
GET /api/users
Authorization: Bearer {token}
```

**Query Parameters:**

- `search` (string, opcional) - Busca por nome ou email
- `role` (string, opcional) - Filtrar por role: `USER`, `SELLER`, `ADMIN`
- `isActive` (boolean, opcional) - Filtrar por status: `true`, `false`
- `limit` (number, opcional) - Limite de resultados (1-100, padrão: 20)
- `offset` (number, opcional) - Pular resultados (padrão: 0)

**Exemplo:**

```bash
GET /api/users?search=john&role=SELLER&limit=10
```

**Resposta 200:**

```json
{
  "users": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+55 11 99999-9999",
      "avatar": "https://...",
      "bio": "Corretor de imóveis",
      "role": "SELLER",
      "isActive": true,
      "createdAt": "2025-10-13T...",
      "updatedAt": "2025-10-13T...",
      "_count": {
        "properties": 5,
        "favorites": 3,
        "reviews": 2
      }
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

---

### Estatísticas de Usuários

Retorna estatísticas gerais (apenas admin)

```http
GET /api/users/stats
Authorization: Bearer {token}
```

**Resposta 200:**

```json
{
  "total": 150,
  "admins": 2,
  "sellers": 30,
  "users": 118,
  "active": 145,
  "inactive": 5
}
```

---

### Buscar Usuário por ID

Retorna dados completos de um usuário (admin ou próprio usuário)

```http
GET /api/users/:id
Authorization: Bearer {token}
```

**Resposta 200:**

```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+55 11 99999-9999",
  "avatar": "https://...",
  "bio": "Corretor de imóveis há 10 anos",
  "role": "SELLER",
  "isActive": true,
  "createdAt": "2025-01-01T...",
  "updatedAt": "2025-10-13T...",
  "_count": {
    "properties": 5,
    "favorites": 3,
    "reviews": 2
  }
}
```

**Resposta 404:**

```json
{
  "error": "Usuário não encontrado"
}
```

---

## ✏️ **UPDATE - Atualização**

### Atualizar Perfil

Atualiza dados do perfil do usuário (admin ou próprio usuário)

```http
PUT /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Updated",
  "phone": "+55 11 98888-8888",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Nova biografia"
}
```

**Campos opcionais:**

- `name` - Nome completo (1-120 caracteres)
- `phone` - Telefone (até 20 caracteres)
- `avatar` - URL da foto de perfil
- `bio` - Biografia (até 500 caracteres)

**Resposta 200:**

```json
{
  "id": "uuid",
  "name": "John Updated",
  "email": "john@example.com",
  "phone": "+55 11 98888-8888",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Nova biografia",
  "role": "SELLER",
  "isActive": true,
  "updatedAt": "2025-10-13T..."
}
```

---

### Atualizar Senha

Atualiza senha do usuário (apenas próprio usuário)

```http
PUT /api/users/:id/password
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**

```json
{
  "currentPassword": "senha_antiga",
  "newPassword": "senha_nova_123"
}
```

**Validações:**

- Ambas senhas devem ter no mínimo 6 caracteres
- `currentPassword` deve estar correta

**Resposta 200:**

```json
{
  "message": "Senha atualizada com sucesso"
}
```

**Resposta 401:**

```json
{
  "error": "Senha atual incorreta"
}
```

---

### Atualizar Role

Atualiza role do usuário (apenas admin)

```http
PUT /api/users/:id/role
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**

```json
{
  "role": "SELLER"
}
```

**Roles válidas:**

- `USER` - Usuário comum
- `SELLER` - Vendedor/Corretor
- `ADMIN` - Administrador

**Resposta 200:**

```json
{
  "message": "Role atualizada com sucesso",
  "user": {
    "id": "uuid",
    "role": "SELLER"
  }
}
```

---

### Ativar/Desativar Usuário

Ativa ou desativa usuário (soft delete - apenas admin)

```http
PUT /api/users/:id/toggle-status
Authorization: Bearer {token}
Content-Type: application/json
```

**Body:**

```json
{
  "isActive": false
}
```

**Resposta 200:**

```json
{
  "message": "Usuário desativado com sucesso",
  "user": {
    "id": "uuid",
    "isActive": false
  }
}
```

**Restrição:** Admin não pode desativar a própria conta

---

## 🗑️ **DELETE - Exclusão**

### Deletar Usuário

Deleta usuário permanentemente (apenas admin)

```http
DELETE /api/users/:id
Authorization: Bearer {token}
```

**Resposta 200:**

```json
{
  "message": "Usuário deletado com sucesso"
}
```

**Restrição:** Admin não pode deletar a própria conta

---

## 🔒 **PERMISSÕES**

| Rota                           | USER    | SELLER  | ADMIN   |
| ------------------------------ | ------- | ------- | ------- |
| `GET /users`                   | ❌      | ❌      | ✅      |
| `GET /users/stats`             | ❌      | ❌      | ✅      |
| `GET /users/:id`               | Próprio | Próprio | Todos   |
| `PUT /users/:id`               | Próprio | Próprio | Todos   |
| `PUT /users/:id/password`      | Próprio | Próprio | Próprio |
| `PUT /users/:id/role`          | ❌      | ❌      | ✅      |
| `PUT /users/:id/toggle-status` | ❌      | ❌      | ✅      |
| `DELETE /users/:id`            | ❌      | ❌      | ✅      |

---

## ⚠️ **CÓDIGOS DE ERRO**

| Código | Descrição                         |
| ------ | --------------------------------- |
| 400    | Dados inválidos                   |
| 401    | Não autenticado / Senha incorreta |
| 403    | Sem permissão                     |
| 404    | Usuário não encontrado            |
| 500    | Erro interno do servidor          |

---

## 📦 **EXEMPLOS DE USO**

### Exemplo 1: Listar vendedores ativos

```bash
curl -X GET "http://localhost:4000/api/users?role=SELLER&isActive=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Exemplo 2: Atualizar perfil

```bash
curl -X PUT "http://localhost:4000/api/users/uuid-123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "phone": "+55 11 98765-4321",
    "bio": "Especialista em imóveis de luxo"
  }'
```

### Exemplo 3: Mudar senha

```bash
curl -X PUT "http://localhost:4000/api/users/uuid-123/password" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "senha123",
    "newPassword": "novaSenha456"
  }'
```

### Exemplo 4: Promover usuário a vendedor (admin)

```bash
curl -X PUT "http://localhost:4000/api/users/uuid-123/role" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "SELLER"}'
```

### Exemplo 5: Buscar usuários com filtros

```bash
curl -X GET "http://localhost:4000/api/users?search=joão&limit=5&offset=0" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
