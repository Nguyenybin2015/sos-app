import { Router } from 'express';
import authRoutes from './auth.route.js';
import bankRoutes from './bank.route.js';
import userRoutes from './user.route.js';
import userBankRoute from './user-bank.route.js';

const indexRouters = Router();

indexRouters.use('/auth', authRoutes);
indexRouters.use('/bank', bankRoutes);
indexRouters.use('/user', userRoutes);
indexRouters.use('/user-bank', userBankRoute);

export default indexRouters;
