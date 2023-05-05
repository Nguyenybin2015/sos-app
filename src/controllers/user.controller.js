import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg, serverMsg } from '../constants/constants.message-response.js';
import { registerAccountService, getUserService } from '../services/user.service.js';
import responseRequest from '../utils/utils.response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function registerAccount(req, res) {
  try {
    const { body } = req;
    const result = await registerAccountService(res, body);
    if (!res.headersSent) {
      responseRequest(res, result, authMsg.registerAccount);
    }
  }
  catch (error) {
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
  // console.log({ id });
  // res.send({ message: 'hello' });
  const result = await getUserService(res, id);
  if (!res.headersSent) {
    responseRequest(res, result);
  }
}
