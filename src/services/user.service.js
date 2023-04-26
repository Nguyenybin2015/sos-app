import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { hashPassword } from '../utils/utils.bcrypt.js';
import { findUserByEmail, insertNewUser } from '../access-database/user.model.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function registerAccountService(res, body) {
  const {
    email = '', password = '', name, gender = '', address = ''
  } = body;
  const result = await findUserByEmail(email);
  if (result) {
    return execptionErrorCommon(res, httpStatus.conflict, userMsg.conflict);
  }
  const hashPass = await hashPassword(password);
  const userBody = {
    name,
    email,
    password: hashPass,
  };
  const profileBody = {
    gender,
    address,
  };
  await insertNewUser(res, userBody, profileBody);
  return true;
}

export async function updateAdmin() {
  console.log('hdhhd');
}
