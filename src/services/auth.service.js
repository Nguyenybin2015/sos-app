/* eslint-disable import/no-unresolved */
import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg } from '../constants/constants.message-response.js';
import { hashPassword, comparePassWord } from '../utils/utils.bcrypt.js';
import { findUserByEmail } from '../access-database/user.model.js';

export async function registerAccountService(res, body) {
  const { email = '', password = '' } = body;
  const result = await findUserByEmail(email);
  console.log('result', result);
  if (result.length) {
    return res.status(httpStatus.conflict).send({
      statusCode: httpStatus.conflict,
      message: authMsg.conflict,
    });
  }
  const hashPass = await hashPassword(password);
  console.log('hashPass', hashPass);
  return result;
}

export async function loginService(res, body) {
  const { email = '' } = body;
  const result = await findUserByEmail(email);
  return result;
}
