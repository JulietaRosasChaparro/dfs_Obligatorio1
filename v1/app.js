import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuario.routes.js';
import recetaRoutes from './routes/receta.routes.js';
import categoriaRoutes from './routes/categoria.routes.js';
import { authenticateMiddleware } from './middlewares/auth.middleware.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes);

// Middleware de autenticación
app.use(authenticateMiddleware);

// Rutas protegidas
app.use('/usuarios', usuarioRoutes);
app.use('/recetas', recetaRoutes);
app.use('/categorias', categoriaRoutes);

export default app;