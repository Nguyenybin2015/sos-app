import { Router } from 'express';
import authRoutes from './auth.route.js';
import bankRoutes from './bank.route.js';
import userRoutes from './user.route.js';
import userBankRoutes from './user-bank.route.js';
import p2pRoutes from './p2p.route.js';

const indexRouters = Router();

indexRouters.use('/auth', authRoutes);
indexRouters.use('/bank', bankRoutes);
indexRouters.use('/user', userRoutes);
indexRouters.use('/userbank', userBankRoutes);
indexRouters.use('/p2p', p2pRoutes);

export default indexRouters;
