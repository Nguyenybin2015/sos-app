import { Router } from 'express';
import { login, registerAccount } from '../controllers/auth.controller.js';
import { registerValidation } from '../validates/validates.body-request.js';

const authRoutes = Router();

authRoutes.post('/login', login);

authRoutes.get('/register-acount', registerValidation, registerAccount);

export default authRoutes;
