// Exemplos de uso da API de Usuários
// Base URL: http://localhost:4000/api/users

const API_BASE = "http://localhost:4000/api";
const TOKEN = "seu_token_jwt_aqui";

// ========================================
// HELPER FUNCTIONS
// ========================================

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Erro:", data);
    throw new Error(data.error || "Erro na requisição");
  }

  return data;
}

// ========================================
// READ - Leitura
// ========================================

// Listar todos os usuários (com filtros)
async function listUsers(filters = {}) {
  const params = new URLSearchParams(filters);
  const data = await apiRequest(`/users?${params}`);
  console.log("✅ Usuários:", data);
  return data;
}

// Buscar estatísticas
async function getUserStats() {
  const data = await apiRequest("/users/stats");
  console.log("✅ Estatísticas:", data);
  return data;
}

// Buscar usuário por ID
async function getUserById(id) {
  const data = await apiRequest(`/users/${id}`);
  console.log("✅ Usuário:", data);
  return data;
}

// ========================================
// UPDATE - Atualização
// ========================================

// Atualizar perfil
async function updateProfile(userId, profileData) {
  const data = await apiRequest(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(profileData)
  });
  console.log("✅ Perfil atualizado:", data);
  return data;
}

// Atualizar senha
async function updatePassword(userId, currentPassword, newPassword) {
  const data = await apiRequest(`/users/${userId}/password`, {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword })
  });
  console.log("✅ Senha atualizada:", data);
  return data;
}

// Atualizar role (apenas admin)
async function updateUserRole(userId, role) {
  const data = await apiRequest(`/users/${userId}/role`, {
    method: "PUT",
    body: JSON.stringify({ role })
  });
  console.log("✅ Role atualizada:", data);
  return data;
}

// Ativar/desativar usuário (apenas admin)
async function toggleUserStatus(userId, isActive) {
  const data = await apiRequest(`/users/${userId}/toggle-status`, {
    method: "PUT",
    body: JSON.stringify({ isActive })
  });
  console.log("✅ Status alterado:", data);
  return data;
}

// ========================================
// DELETE - Exclusão
// ========================================

// Deletar usuário (apenas admin)
async function deleteUser(userId) {
  const data = await apiRequest(`/users/${userId}`, {
    method: "DELETE"
  });
  console.log("✅ Usuário deletado:", data);
  return data;
}

// ========================================
// EXEMPLOS DE USO
// ========================================

// Exemplo 1: Listar todos os vendedores ativos
await listUsers({
  role: "SELLER",
  isActive: true,
  limit: 10
});

// Exemplo 2: Buscar usuário por nome
await listUsers({
  search: "João",
  limit: 5
});

// Exemplo 3: Ver estatísticas
await getUserStats();

// Exemplo 4: Buscar usuário específico
await getUserById("uuid-do-usuario");

// Exemplo 5: Atualizar meu perfil
await updateProfile("meu-user-id", {
  name: "João Silva",
  phone: "+55 11 98765-4321",
  bio: "Corretor de imóveis especializado em alto padrão",
  avatar: "https://example.com/avatar.jpg"
});

// Exemplo 6: Mudar minha senha
await updatePassword("meu-user-id", "senhaAtual123", "novaSenha456");

// Exemplo 7: Promover usuário a vendedor (admin)
await updateUserRole("user-id", "SELLER");

// Exemplo 8: Desativar usuário (admin)
await toggleUserStatus("user-id", false);

// Exemplo 9: Reativar usuário (admin)
await toggleUserStatus("user-id", true);

// Exemplo 10: Deletar usuário (admin)
await deleteUser("user-id");

// ========================================
// EXPORT
// ========================================

export {
  listUsers,
  getUserStats,
  getUserById,
  updateProfile,
  updatePassword,
  updateUserRole,
  toggleUserStatus,
  deleteUser
};
