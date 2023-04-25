import { Router } from 'express';
import { login, registerAccount } from '../controllers/auth.controller.js';
import { registerValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';

const authRoutes = Router();

authRoutes.post('/login', login);

authRoutes.post('/register-acount', [...registerValidation, validateResult], registerAccount);

export default authRoutes;
