# Admin - Gerenciamento de Usuários

## Visão Geral
Painel administrativo completo para gerenciamento de usuários da plataforma VerdeMar.

## Funcionalidades Implementadas

### 📊 Estatísticas
- **Total de usuários** cadastrados na plataforma
- **Admins** - quantidade de administradores
- **Vendedores** - usuários com permissão para publicar imóveis  
- **Usuários** - usuários comuns do sistema

### 🔍 Filtros e Busca
- **Busca por texto** - busca por nome ou email
- **Filtro por permissão** - filtra por USER, SELLER ou ADMIN
- **Filtro por status** - filtra por ativos ou inativos

### ✅ Seleção e Ações em Massa
- Selecionar todos os usuários da lista
- Selecionar usuários individuais
- Excluir múltiplos usuários de uma vez
- **Proteção**: não é possível deletar sua própria conta

### 👤 Gerenciamento Individual

#### Alterar Permissão (Role)
- Clique no badge de permissão para editar
- Opções: Usuário, Vendedor, Admin
- **Proteção**: não é possível alterar sua própria permissão

#### Alternar Status
- Clique no badge de status para ativar/desativar
- Usuários inativos não podem fazer login
- **Proteção**: não é possível desativar sua própria conta

#### Excluir Usuário
- Botão de lixeira para cada usuário
- Confirmação antes da exclusão
- **Proteção**: não é possível deletar sua própria conta

### 📋 Informações Exibidas
Para cada usuário, são exibidos:
- **Avatar** - inicial do nome em círculo colorido
- **Nome completo**
- **Email** com ícone
- **Telefone** (se disponível)
- **Permissão** - badge colorido (USER/SELLER/ADMIN)
- **Status** - badge verde (ativo) ou vermelho (inativo)
- **Data de cadastro**
- **Estatísticas de atividade**:
  - Quantidade de imóveis publicados
  - Quantidade de favoritos
  - Quantidade de avaliações feitas

### 🎨 Interface
- Design moderno e responsivo
- Cards com estatísticas no topo
- Tabela com linhas hover
- Badges coloridos por permissão:
  - **Usuário** - Cinza (slate)
  - **Vendedor** - Azul (blue)
  - **Admin** - Verde (emerald)
- Barra de seleção destacada quando há itens selecionados
- Modal de confirmação para exclusões em massa

## API Endpoints Utilizados

### Listar Usuários
```
GET /api/users?search=&role=&isActive=&limit=100
```
Retorna lista de usuários com filtros aplicados.

### Estatísticas
```
GET /api/users/stats
```
Retorna contadores por tipo de usuário.

### Alterar Permissão
```
PUT /api/users/:id/role
Body: { role: "USER" | "SELLER" | "ADMIN" }
```
Atualiza a permissão do usuário (apenas admin).

### Alternar Status
```
PUT /api/users/:id/toggle-status
Body: { isActive: true | false }
```
Ativa ou desativa o usuário (apenas admin).

### Excluir Usuário
```
DELETE /api/users/:id
```
Exclui o usuário do sistema (apenas admin).

## Proteções Implementadas

1. **Auto-proteção**: O usuário logado não pode:
   - Deletar sua própria conta
   - Desativar sua própria conta  
   - Alterar sua própria permissão

2. **Validação de permissões**: Todas as ações verificam se o usuário é admin

3. **Confirmações**: Modal de confirmação para exclusões em massa

## Rota Frontend
```
/admin/users
```
Acessível apenas por usuários com role ADMIN.

## Componentes

### AdminUsersList (`/front/src/pages/Admin/Users/List.jsx`)
Componente principal que gerencia toda a interface de usuários no painel admin.

#### Estados:
- `users` - lista de usuários
- `loading` - estado de carregamento
- `searchTerm` - termo de busca
- `roleFilter` - filtro de permissão
- `statusFilter` - filtro de status
- `selectedIds` - IDs dos usuários selecionados
- `showDeleteConfirm` - controle do modal de confirmação
- `editingUser` - ID do usuário sendo editado

#### Principais Funções:
- `fetchUsers()` - busca usuários com filtros
- `fetchStats()` - busca estatísticas
- `handleToggleStatus()` - ativa/desativa usuário
- `handleChangeRole()` - altera permissão
- `handleDelete()` - exclui um usuário
- `handleDeleteSelected()` - exclui múltiplos usuários

## Navegação
O link "Usuários" está disponível no menu lateral do AdminLayout, abaixo de "Imóveis".

## Melhorias Futuras
- [ ] Edição completa do perfil (nome, email, telefone)
- [ ] Alteração de senha pelo admin
- [ ] Histórico de ações do usuário
- [ ] Exportar lista de usuários (CSV/Excel)
- [ ] Paginação para grandes volumes
- [ ] Filtros avançados (data de cadastro, última atividade)
- [ ] Visualização detalhada (modal ou página)
