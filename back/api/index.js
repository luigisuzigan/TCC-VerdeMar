// Vercel Serverless Function Entrypoint
import app, { ensureAdminOnColdStart } from "../src/app.js";

// Garante admin apenas no cold start (primeira invocação da instância)
let adminInitialized = false;

export default async function handler(req, res) {
  // Adicionar headers CORS manualmente (backup) - TODOS os headers necessários
  const origin = req.headers.origin || req.headers.referer || '*';
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Origin, Accept, Cache-Control, Pragma, Expires, X-Content-Type-Options');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length, X-JSON');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Tratar OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  
  // Inicializar admin no cold start
  if (!adminInitialized) {
    try {
      await ensureAdminOnColdStart();
      adminInitialized = true;
      console.log('✅ Admin inicializado no cold start');
    } catch (err) {
      console.error("❌ Falha ao inicializar admin:", err);
      // Não falhar a requisição por causa disso
    }
  }
  
  // Processar requisição
  try {
    return app(req, res);
  } catch (error) {
    console.error('❌ Erro no handler:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' ? 'Erro ao processar requisição' : error.message
    });
  }
}
