import app, { ensureAdminOnColdStart } from "./app.js";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await ensureAdminOnColdStart();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

bootstrap();
