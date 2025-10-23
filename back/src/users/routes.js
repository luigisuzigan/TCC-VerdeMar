import { Router } from "express";
import { body, param, query, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import {
  listUsers,
  findUserById,
  updateUser,
  updateUserPassword,
  updateUserRole,
  toggleUserStatus,
  deleteUser,
  getUserStats,
  Roles
} from "../repos/userRepo.js";
import { authMiddleware, requireAdmin } from "../auth/middleware.js";

const router = Router();

// ========================================
// READ - Rotas de leitura
// ========================================

/**
 * GET /api/users
 * Lista todos os usuários (apenas admin)
 */
router.get(
  "/",
  authMiddleware,
  requireAdmin,
  [
    query("search").optional().isString(),
    query("role").optional().isIn(Object.values(Roles)),
    query("isActive").optional().isBoolean().toBoolean(),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("offset").optional().isInt({ min: 0 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { search, role, isActive, limit, offset } = req.query;
      const result = await listUsers({ search, role, isActive, limit, offset });
      res.json(result);
    } catch (error) {
      console.error("Error listing users:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }
);

/**
 * GET /api/users/stats
 * Estatísticas de usuários (apenas admin)
 */
router.get("/stats", authMiddleware, requireAdmin, async (req, res) => {
  try {
    const stats = await getUserStats();
    res.json(stats);
  } catch (error) {
    console.error("Error getting user stats:", error);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

/**
 * GET /api/users/:id
 * Busca usuário por ID (admin ou próprio usuário)
 */
router.get(
  "/:id",
  authMiddleware,
  [param("id").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;

      // Apenas admin ou o próprio usuário pode ver os detalhes
      if (req.user.role !== "ADMIN" && req.user.id !== id) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      const user = await findUserById(id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      res.json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }
);

// ========================================
// UPDATE - Rotas de atualização
// ========================================

/**
 * PUT /api/users/:id
 * Atualiza dados do perfil (admin ou próprio usuário)
 */
router.put(
  "/:id",
  authMiddleware,
  [
    param("id").notEmpty().withMessage("ID é obrigatório"),
    body("name").optional().isString().isLength({ min: 1, max: 120 }).withMessage("Nome inválido"),
    body("phone").optional().isString().isLength({ max: 20 }).withMessage("Telefone inválido"),
    body("avatar").optional(),
    body("bio").optional().isString().isLength({ max: 500 }).withMessage("Bio muito longa")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Erros de validação:", JSON.stringify(errors.array(), null, 2));
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      console.log("Atualizando usuário:", id);
      console.log("Body recebido:", { 
        name: req.body.name, 
        phone: req.body.phone,
        avatarLength: req.body.avatar?.length || 0,
        bio: req.body.bio 
      });

      // Apenas admin ou o próprio usuário pode atualizar
      if (req.user.role !== "ADMIN" && req.user.id !== id) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      const { name, phone, avatar, bio } = req.body;
      const updated = await updateUser(id, { name, phone, avatar, bio });

      console.log("Usuário atualizado com sucesso:", updated.id);
      console.log("Avatar no response:", {
        hasAvatar: !!updated.avatar,
        avatarLength: updated.avatar?.length || 0
      });
      
      res.json(updated);
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }
);

/**
 * PUT /api/users/:id/password
 * Atualiza senha do usuário (próprio usuário)
 */
router.put(
  "/:id/password",
  authMiddleware,
  [
    param("id").isString(),
    body("currentPassword").isString().isLength({ min: 6 }),
    body("newPassword").isString().isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;

      // Apenas o próprio usuário pode mudar sua senha
      if (req.user.id !== id) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      const { currentPassword, newPassword } = req.body;

      // Buscar usuário com senha para verificar
      const { findUserByIdWithPassword } = await import("../repos/userRepo.js");
      const user = await findUserByIdWithPassword(id);
      if (!user)
        return res.status(404).json({ error: "Usuário não encontrado" });

      // Verificar senha atual
      const validPassword = await bcrypt.compare(
        currentPassword,
        user.passwordHash
      );
      if (!validPassword) {
        return res.status(401).json({ error: "Senha atual incorreta" });
      }

      // Atualizar senha
      const passwordHash = await bcrypt.hash(newPassword, 10);
      await updateUserPassword(id, passwordHash);

      res.json({ message: "Senha atualizada com sucesso" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ error: "Erro ao atualizar senha" });
    }
  }
);

/**
 * PUT /api/users/:id/role
 * Atualiza role do usuário (apenas admin)
 */
router.put(
  "/:id/role",
  authMiddleware,
  requireAdmin,
  [param("id").isString(), body("role").isIn(Object.values(Roles))],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;
      const { role } = req.body;

      const updated = await updateUserRole(id, role);
      res.json({ message: "Role atualizada com sucesso", user: updated });
    } catch (error) {
      console.error("Error updating user role:", error);
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(500).json({ error: "Erro ao atualizar role" });
    }
  }
);

/**
 * PUT /api/users/:id/toggle-status
 * Ativa/desativa usuário (apenas admin)
 */
router.put(
  "/:id/toggle-status",
  authMiddleware,
  requireAdmin,
  [param("id").isString(), body("isActive").isBoolean()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;
      const { isActive } = req.body;

      // Não permitir desativar o próprio usuário admin
      if (req.user.id === id && !isActive) {
        return res
          .status(400)
          .json({ error: "Você não pode desativar sua própria conta" });
      }

      const updated = await toggleUserStatus(id, isActive);
      res.json({
        message: isActive
          ? "Usuário ativado com sucesso"
          : "Usuário desativado com sucesso",
        user: updated
      });
    } catch (error) {
      console.error("Error toggling user status:", error);
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(500).json({ error: "Erro ao alterar status do usuário" });
    }
  }
);

// ========================================
// DELETE - Rota de exclusão
// ========================================

/**
 * DELETE /api/users/:id
 * Deleta usuário permanentemente (apenas admin)
 */
router.delete(
  "/:id",
  authMiddleware,
  requireAdmin,
  [param("id").isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const { id } = req.params;

      // Não permitir deletar o próprio usuário
      if (req.user.id === id) {
        return res
          .status(400)
          .json({ error: "Você não pode deletar sua própria conta" });
      }

      await deleteUser(id);
      res.json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
);

export default router;
