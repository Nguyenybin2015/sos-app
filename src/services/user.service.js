/* eslint-disable no-unreachable */
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { hashPassword } from '../utils/utils.bcrypt.js';
import * as userModelJs from '../access-database/user.model.js';
import responseFailed from '../utils/utils.response-failed.js';
import responseRequest from '../utils/utils.response.js';

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
  console.log('update admin');
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
    // console.log(body);
    await userModelJs.updateUserBankCondition(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function updateUserProfileService(res, body) {
  if (body) {
    // console.log(body);
    await userModelJs.updateUserProfileModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function updateNameService(res, body) {
  if (body) {
    await userModelJs.updateNameModel(res, body);
    return responseRequest(res, httpStatus.ok, 'Success');
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function updateAvatarProfileService(res, body) {
  console.log('body service', body);
  if (body) {
    await userModelJs.updateAvatar(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function onSystemService(res, body) {
  if (body) {
    // console.log(body);
    await userModelJs.onSystemModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function offSystemService(res, body) {
  if (body) {
    // console.log(body);
    await userModelJs.offSystemModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function onMaintenanceService(res, body) {
  if (body) {
    // console.log(body);
    await userModelJs.onMaintanenceModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function offMaintenanceService(res, body) {
  if (body) {
    // console.log(body);
    await userModelJs.offMaintanenceModel(res, body);
    return true;
  }
  return responseFailed(res, httpStatus.notFound, userMsg.updateFail);
}
export async function getUserStateService(res, body) {
  const result = await userModelJs.getUserServiceCondition(body);
  if (!result) {
    return responseFailed(res, httpStatus.notFound);
  }
  return result;
}
export async function deleteUserService(res, body) {
  const result = await userModelJs.deleteUser(body);
  if (!result) {
    return responseFailed(res, httpStatus.notFound);
  }
  return responseRequest(res, httpStatus.ok, 'Delete Account Success');
}
