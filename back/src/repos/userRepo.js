import prisma from "../prisma.js";

export const Roles = { ADMIN: "ADMIN", USER: "USER", SELLER: "SELLER" };

// ========================================
// READ - Buscar usuários
// ========================================

/**
 * Lista todos os usuários com paginação e filtros
 */
export async function listUsers({
  search,
  role,
  isActive,
  limit = 20,
  offset = 0
} = {}) {
  const where = {};

  // Filtro de busca (nome ou email)
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } }
    ];
  }

  // Filtro por role
  if (role && Object.values(Roles).includes(role)) {
    where.role = role;
  }

  // Filtro por status
  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        bio: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            properties: true,
            favorites: true,
            reviews: true
          }
        }
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: parseInt(offset)
    }),
    prisma.user.count({ where })
  ]);

  return { users, total, limit: parseInt(limit), offset: parseInt(offset) };
}

/**
 * Busca usuário por email
 */
export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

/**
 * Busca usuário por ID (com informações completas)
 */
export function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      bio: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          properties: true,
          favorites: true,
          reviews: true
        }
      }
    }
  });
}

/**
 * Busca usuário por ID (com senha - para autenticação)
 */
export function findUserByIdWithPassword(id) {
  return prisma.user.findUnique({ where: { id } });
}

// ========================================
// CREATE - Criar usuário
// ========================================

/**
 * Cria um novo usuário
 */
export function createUser({
  name,
  email,
  passwordHash,
  phone,
  avatar,
  bio,
  role = Roles.USER
}) {
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      phone,
      avatar,
      bio,
      role,
      isActive: true
    }
  });
}

/**
 * Garante que existe um admin (usado no bootstrap)
 */
export async function ensureAdmin(email, passwordHash) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  return prisma.user.create({
    data: {
      name: "Admin",
      email,
      passwordHash,
      role: "ADMIN",
      isActive: true
    }
  });
}

// ========================================
// UPDATE - Atualizar usuário
// ========================================

/**
 * Atualiza dados do usuário (perfil)
 */
export async function updateUser(id, data) {
  const updateData = {};

  // Campos permitidos para atualização
  if (data.name !== undefined) updateData.name = data.name;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.avatar !== undefined) updateData.avatar = data.avatar;
  if (data.bio !== undefined) updateData.bio = data.bio;

  return prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      avatar: true,
      bio: true,
      role: true,
      isActive: true,
      updatedAt: true
    }
  });
}

/**
 * Atualiza senha do usuário
 */
export function updateUserPassword(id, passwordHash) {
  return prisma.user.update({
    where: { id },
    data: { passwordHash }
  });
}

/**
 * Atualiza role do usuário (apenas admin)
 */
export function updateUserRole(id, role) {
  if (!Object.values(Roles).includes(role)) {
    throw new Error("Role inválida");
  }
  return prisma.user.update({
    where: { id },
    data: { role }
  });
}

/**
 * Ativa ou desativa usuário (soft delete)
 */
export function toggleUserStatus(id, isActive) {
  return prisma.user.update({
    where: { id },
    data: { isActive }
  });
}

// ========================================
// DELETE - Deletar usuário
// ========================================

/**
 * Deleta usuário permanentemente
 */
export function deleteUser(id) {
  return prisma.user.delete({ where: { id } });
}

/**
 * Conta total de usuários por role
 */
export async function getUserStats() {
  const [total, admins, sellers, users, active, inactive] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: Roles.ADMIN } }),
    prisma.user.count({ where: { role: Roles.SELLER } }),
    prisma.user.count({ where: { role: Roles.USER } }),
    prisma.user.count({ where: { isActive: true } }),
    prisma.user.count({ where: { isActive: false } })
  ]);

  return { total, admins, sellers, users, active, inactive };
}
