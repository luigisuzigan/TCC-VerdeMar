import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";

import authRoutes from "./auth/routes.js";
import propertyRoutes from "./properties/routes.js";
import userRoutes from "./users/routes.js";
import dashboardRoutes from "./dashboard/routes.js";
import { ensureAdmin } from "./repos/userRepo.js";

const app = express();

// CORS: permitir origens do Vite (5173/5174) e, em prod, a origem configurada
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = process.env.ALLOWED_ORIGIN;
      if (!origin) return callback(null, true);
      if (allowed && origin === allowed) return callback(null, true);
      if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
      // Em produção, restrinja via ALLOWED_ORIGIN; aqui mantemos permissivo por compatibilidade
      return callback(null, true);
    }
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// Health Check - endpoint para verificar se a API está online
app.get("/api/health", (_, res) => {
  res.json({ 
    ok: true,
    status: "online",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

// Root endpoint - informações sobre a API
app.get("/", (_, res) => {
  res.json({ 
    name: "🏖️ VerdeMar API",
    description: "API REST para plataforma de imóveis litorâneos",
    status: "✅ Online",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    documentation: {
      health: "GET /api/health - Verificar status da API",
      auth: "POST /api/auth/login, POST /api/auth/register",
      properties: "GET /api/properties - Listar imóveis",
      users: "GET /api/users - Gerenciar usuários (admin)",
      dashboard: "GET /api/dashboard/stats - Estatísticas (admin)"
    },
    message: "API funcionando corretamente! Use /api/health para health check."
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global error fallback
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

export async function ensureAdminOnColdStart() {
  const email = process.env.ADMIN_EMAIL || "admin@verdemar.com";
  const pwd = process.env.ADMIN_PASSWORD || "admin123";
  const hash = await bcrypt.hash(pwd, 10);
  ensureAdmin(email, hash);
}

export default app;
