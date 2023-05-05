import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { hashPassword } from '../utils/utils.bcrypt.js';
import { findUserByEmail, findUserById, insertNewUser } from '../access-database/user.model.js';
import responseFailed from '../utils/utils.response-failed.js';

export async function registerAccountService(res, body) {
  const {
    email = '', password = '', name, gender = '', address = ''
  } = body;
  const result = await findUserByEmail(email);
  if (result) {
    return responseFailed(res, httpStatus.conflict, userMsg.conflict);
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
  const newUser = await insertNewUser(res, userBody, profileBody);
  return newUser;
}

export async function updateAdmin() {
  console.log('hdhhd');
}

export async function getUserService(res, body) {
  const result = await findUserById(body);
  console.log(result);
  if (!result) {
    return responseFailed(res, httpStatus.notFound);
  }
  return {
    result
  };
}
