import { Router } from 'express';
import authRoutes from './auth.route.js';
import bankRoutes from './bank.route.js';

const indexRouters = Router();

indexRouters.use('/auth', authRoutes);
indexRouters.use('/bank', bankRoutes);

export default indexRouters;
