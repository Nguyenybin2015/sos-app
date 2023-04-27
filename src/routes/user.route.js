import { Router } from 'express';
import {
  registerAccount,
} from '../controllers/user.controller.js';
import { registerValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';

const userRoutes = Router();

userRoutes.post('/register-acount', [...registerValidation, validateResult], registerAccount);

export default userRoutes;
