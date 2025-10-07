import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';

import authRoutes from './auth/routes.js';
import propertyRoutes from './properties/routes.js';
import { ensureAdmin } from './repos/userRepo.js';

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// Health
app.get('/api/health', (_, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Global error fallback
app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;

async function bootstrap() {
	// seed admin
	const email = process.env.ADMIN_EMAIL || 'admin@verdemar.com';
	const pwd = process.env.ADMIN_PASSWORD || 'admin123';
	const hash = await bcrypt.hash(pwd, 10);
	ensureAdmin(email, hash);

	app.listen(PORT, () => {
		console.log(`API listening on http://localhost:${PORT}`);
	});
}

bootstrap();
