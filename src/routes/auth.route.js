import { Router } from 'express';
import { login, verifyOtp, getOtp } from '../controllers/auth.controller.js';
import { verifyOtpValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import sendEmail from '../services/send-mail.service.js';
import isAuth from '../middlewares/authen-token.js';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.put(
  '/otp-verify',
  [...verifyOtpValidation, validateResult],
  verifyOtp
);
authRoutes.get('/get-otp', [isAuth], sendEmail);

export default authRoutes;
