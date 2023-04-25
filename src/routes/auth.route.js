import { Router } from 'express';
import {
  login, registerAccount, verifyOtp
} from '../controllers/auth.controller.js';
import { registerValidation, verifyOtpValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.post('/register-acount', [...registerValidation, validateResult], registerAccount);
authRoutes.put('/otp-verify', [...verifyOtpValidation, validateResult], verifyOtp);

export default authRoutes;
