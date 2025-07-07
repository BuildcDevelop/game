// backend/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http';
import authRoutes from './routes/auth.routes.js'; // ⬅ koncovka .js MUSÍ být
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
const app = express();
const httpServer = createServer(app); // ← potřebné pro socket.io
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        port: PORT,
        env: process.env.NODE_ENV,
        version: '1.0.0',
    });
});
// Připojení rout
app.use('/api/auth', authRoutes);
// Start serveru
httpServer.listen(PORT, () => {
    console.log(`✅ Server běží na portu ${PORT}`);
});
