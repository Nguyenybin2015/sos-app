import Speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg } from '../constants/constants.message-response.js';

dotenv.config();

export default function checkOTP(req, res, body, next) {
  //   return verifyToken;
  try {
    const { otpCode = '' } = body;
    const verifyToken = Speakeasy.totp.verify({
      secret: process.env.SECRET_OTP_TOKEN,
      encoding: 'base32',
      token: otpCode,
      step: 60,
      window: 10,
    });
    if (verifyToken) {
      next();
    }
  } catch (error) {
    res.status(httpStatus.ok).send({
      message: authMsg.unauthorized,
      stausCode: httpStatus.unauthorized,
    });
  }
}
