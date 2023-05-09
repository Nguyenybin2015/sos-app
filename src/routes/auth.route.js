import { Router } from 'express';
import { login, verifyOtp, getOtp } from '../controllers/auth.controller.js';
import { verifyOtpValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.put(
  '/otp-verify',
  [...verifyOtpValidation, validateResult],
  verifyOtp
);
authRoutes.get('/get-otp', getOtp);

export default authRoutes;
