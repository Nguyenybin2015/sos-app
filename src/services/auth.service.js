import { db } from '../configs/configs.db.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg } from '../constants/constants.message-response.js';
import { hashPassword, comparePassWord } from '../utils/utils.bcrypt.js';

export async function registerAccountService(res, body) {
  const { email = '', password = '' } = body;
  const result = await db
    .select('*')
    .from('profile_user')
    .where('email', email);
  if (result) {
    return res.status(httpStatus.conflict).send({
      statusCode: httpStatus.conflict,
      message: authMsg.conflict,
    });
  }
  const hashPass = await hashPassword(password);
  return result;
  // not yet understant flow?
}

export async function login(res, body) {
  console.log('hello');
}