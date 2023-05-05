import Speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg, userMsg } from '../constants/constants.message-response.js';
import { comparePassWord } from '../utils/utils.bcrypt.js';
import { findUserByEmail } from '../access-database/user.model.js';
import { generateToken } from '../helpers/jwt.helper.js';
import responseFailed from '../utils/utils.response-failed.js';

dotenv.config();

export async function loginService(res, body) {
  const { email = '', password = '' } = body;
  const result = await findUserByEmail(email);
  if (!result) {
    return responseFailed(res, httpStatus.notFound, userMsg.notFound);
  }
  const userPassword = result.password;
  const isComparePass = await comparePassWord(password, userPassword);
  if (!isComparePass) {
    return responseFailed(
      res,
      httpStatus.unauthorized,
      authMsg.unauthorized
    );
  }
  const token = Speakeasy.totp({
    secret: process.env.SECRET_OTP_TOKEN,
    encoding: 'base32',
    digits: 6,
    step: 60,
    window: 10,
  });
  const accessToken = await generateToken(
    {
      id: result.id, name: result.name, email: result.email, role: result.role
    },
    process.env.SECRET_TOKEN,
    process.env.TIME_LIFE_TOKEN
  );
  // var accessToken = jwt.sign({ foo: id }, process.env.SECRET_TOKEN);
  // const accessToken = await generateToken({
  //   id: result.id
  // }, process.env.SECRET_TOKEN);
  return {
    ...result,
    otpCode: token,
    accessToken,
  };
}

export function verifyOtpService(res, body) {
  const { otpCode = '' } = body;
  const verifyToken = Speakeasy.totp.verify({
    secret: process.env.SECRET_OTP_TOKEN,
    encoding: 'base32',
    token: otpCode,
    step: 60,
    window: 10,
  });
  if (!verifyToken) {
    return responseFailed(res, httpStatus.unauthorized, authMsg.optInvalid);
  }
  return authMsg.verifyOtpSuccess;
}
