import { prisma } from '../prisma.js';

export const Roles = { ADMIN: 'ADMIN', USER: 'USER', SELLER: 'SELLER' };

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export function createUser({ name, email, passwordHash, role = Roles.USER }) {
  return prisma.user.create({ data: { name, email, passwordHash, role } });
}

export async function ensureAdmin(email, passwordHash) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing;
  return prisma.user.create({ data: { name: 'Admin', email, passwordHash, role: 'ADMIN' } });
}
