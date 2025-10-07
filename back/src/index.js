import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bcrypt from 'bcryptjs';

import authRoutes from './auth/routes.js';
import propertyRoutes from './properties/routes.js';
import { ensureAdmin } from './repos/userRepo.js';

const app = express();

// CORS: permitir origens do Vite (5173/5174) e, em dev, qualquer localhost
app.use(cors({
	origin: (origin, callback) => {
		const allowed = process.env.ALLOWED_ORIGIN;
		if (!origin) return callback(null, true);
		if (allowed && origin === allowed) return callback(null, true);
		if (/^http:\/\/localhost:\d+$/.test(origin)) return callback(null, true);
		return callback(null, true); // relaxado em dev
	},
}));
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
