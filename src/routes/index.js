import { Router } from "express";
import authRoutes from './auth.route.js';
const indexRouters = Router();  

indexRouters.use('/auth', authRoutes);

export default indexRouters;
