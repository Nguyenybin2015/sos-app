/* eslint-disable no-unreachable */
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { hashPassword } from '../utils/utils.bcrypt.js';
import * as userModelJs from '../access-database/user.model.js';
import responseFailed from '../utils/utils.response-failed.js';

export async function registerAccountService(res, body) {
  const {
    email = '', password = '', name, gender = '', address = ''
  } = body;
  const result = await userModelJs.findUserByEmail(email);
  if (result) {
    return responseFailed(res, httpStatus.conflict, userMsg.conflict);
  }
  const hashPass = await hashPassword(password);
  const userBody = {
    name,
    email,
    password: hashPass,
  };
  // const profileBody = {
  //   gender,
  //   address,
  // };
  const newUser = await userModelJs.insertNewUser(res, userBody);
  return newUser;
}

export async function updateAdmin() {
  console.log('hdhhd');
}

export async function getUserService(res, body) {
  const result = await userModelJs.findUserById(body);
  // console.log(result);
  if (!result) {
    return responseFailed(res, httpStatus.notFound);
  }
  return {
    result,
  };
}
export async function getAppConditionService(res, body) {
  const result = await userModelJs.getUserBankCondition(body);
  if (!result) {
    return responseFailed(res, httpStatus.notFound);
  }
  return result;
}
export async function updateAppConditionService(res, body) {
  if (body) {
    console.log(body);
    await userModelJs.updateUserBankCondition(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function updateUserProfileService(res, body) {
  if (body) {
    console.log(body);
    await userModelJs.updateUserProfileModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
