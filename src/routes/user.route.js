import { Router } from 'express';
import {
  registerAccount,
  // addBankUser,
  getUserById,
} from '../controllers/user.controller.js';
import { registerValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';
import isAdmin from '../middlewares/check-role.js';

const userRoutes = Router();

userRoutes.get('/:id', [isAuth, isAdmin], getUserById);
userRoutes.post('/register-acount', [...registerValidation, validateResult], registerAccount); // phan quyen, auth, token

export default userRoutes;
