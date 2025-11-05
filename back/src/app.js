import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bcrypt from "bcryptjs";

import authRoutes from "./auth/routes.js";
import propertyRoutes from "./properties/routes.js";
import userRoutes from "./users/routes.js";
import dashboardRoutes from "./dashboard/routes.js";
import favoritesRoutes from "./favorites/routes.js";
import { ensureAdmin } from "./repos/userRepo.js";

const app = express();

// CORS: permitir origens configuradas
app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir requisições sem origin (Postman, curl, SSR, etc)
      if (!origin) return callback(null, true);
      
      // Lista de origens permitidas
      const allowedOrigins = [
        process.env.ALLOWED_ORIGIN,
        'https://tcc-verde-mar.vercel.app',
        'https://tcc-verde-mar-backend.vercel.app',
        'https://tcc-verde-mar-git-main-ukleitins-projects.vercel.app', // Vercel preview
        /^https:\/\/tcc-verde-mar.*\.vercel\.app$/, // Todos os deploys da Vercel
        /^http:\/\/localhost:\d+$/,  // Localhost em qualquer porta
        /^http:\/\/127\.0\.0\.1:\d+$/ // 127.0.0.1 em qualquer porta
      ];
      
      // Verificar se a origem está permitida
      const isAllowed = allowedOrigins.some(allowed => {
        if (!allowed) return false;
        if (typeof allowed === 'string') return origin === allowed;
        if (allowed instanceof RegExp) return allowed.test(origin);
        return false;
      });
      
      if (isAllowed) {
        return callback(null, true);
      }
      
      // Em desenvolvimento, logar origem bloqueada
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`⚠️ CORS bloqueado para origem: ${origin}`);
      }
      
      // Em produção, bloquear silenciosamente
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'X-Requested-With',
      'Content-Type', 
      'Authorization', 
      'Origin',
      'Accept',
      'Cache-Control', 
      'Pragma', 
      'Expires',
      'X-Content-Type-Options'
    ],
    exposedHeaders: ['Content-Length', 'X-JSON'],
    maxAge: 86400, // 24 horas para preflight cache
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));

// Tratar requisições OPTIONS (preflight) globalmente
app.options('*', (req, res) => {
  res.status(200).end();
});

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
app.use("/api/favorites", favoritesRoutes);

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
