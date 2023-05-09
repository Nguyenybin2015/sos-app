import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg, serverMsg } from '../constants/constants.message-response.js';
import * as userServiceJs from '../services/user.service.js';
import responseRequest from '../utils/utils.response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';
import responseFailed from '../utils/utils.response-failed.js';

export async function registerAccount(req, res) {
  try {
    const { body } = req;
    const result = await userServiceJs.registerAccountService(res, body);
    if (!res.headersSent) {
      responseRequest(res, result, authMsg.registerAccount);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export function getUsersList(req, res) {
  res.send({ statusCode: 200, mess: 'hello' });
}

export function updateUserAdmin() {
  console.log('update admin');
}

export async function getUserById(req, res) {
  const { id } = req.params;
  console.log({ id });
  // res.send({ message: 'hello' });
  const result = await userServiceJs.getUserService(res, id);
  if (!res.headersSent) {
    responseRequest(res, result);
  }
}
export async function getAppCondition(req, res) {
  console.log(req.body.id);
  const result = await userServiceJs.getAppConditionService(res, req.body.id);
  if (req.body) {
    responseRequest(res, result);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateAppCondition(req, res) {
  if (req.body) {
    userServiceJs.updateAppConditionService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateUserProfile(req, res) {
  if (req.body) {
    userServiceJs.updateUserProfileService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
