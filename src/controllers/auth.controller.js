import Speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg, serverMsg } from '../constants/constants.message-response.js';
import { loginService, verifyOtpService } from '../services/auth.service.js';
import responseRequest from '../utils/utils.response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

dotenv.config();

export async function login(req, res) {
  try {
    const { body } = req;
    const result = await loginService(res, body);
    if (!res.headersSent) {
      responseRequest(res, result, authMsg.login);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export function verifyOtp(req, res) {
  try {
    const { body } = req;
    const result = verifyOtpService(res, body);
    if (!res.headersSent) {
      responseRequest(res, result, authMsg.verifyOtpSuccess);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
export function getOtp(req, res) {
  const token = Speakeasy.totp({
    secret: process.env.SECRET_OTP_TOKEN,
    encoding: 'base32',
    digits: 6,
    step: 60,
    window: 10,
  });
  return res.send({ otpCode: token });
}
