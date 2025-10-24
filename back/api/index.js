// Vercel Serverless Function Entrypoint
import app, { ensureAdminOnColdStart } from "../src/app.js";

// Garante admin apenas no cold start (primeira invocação da instância)
let adminInitialized = false;

export default async function handler(req, res) {
  if (!adminInitialized) {
    try {
      await ensureAdminOnColdStart();
      adminInitialized = true;
    } catch (err) {
      console.error("Failed to initialize admin:", err);
    }
  }
  
  return app(req, res);
}
