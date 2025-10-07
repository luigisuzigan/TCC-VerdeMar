import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '../../.data');
const FILE_PATH = join(DATA_DIR, 'db.json');

function ensureStore() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  if (!existsSync(FILE_PATH)) {
    writeFileSync(
      FILE_PATH,
      JSON.stringify({ users: [], properties: [] }, null, 2),
      'utf8'
    );
  }
}

export function readDB() {
  ensureStore();
  const raw = readFileSync(FILE_PATH, 'utf8');
  return JSON.parse(raw || '{"users":[],"properties":[]}');
}

export function writeDB(db) {
  ensureStore();
  writeFileSync(FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
}
