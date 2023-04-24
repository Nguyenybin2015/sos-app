import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg, serverMsg } from '../constants/constants.message-response.js';
import { registerAccountService } from '../services/auth.service.js';
import responseRequest from '../utils/utils.response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function registerAccount(req, res) {
  try {
    const { body } = req;
    const result = await registerAccountService(res, body);
    if (!res.headerSent) {
      responseRequest(res, result, authMsg.registerAccount);
    }
  }
  catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export function login(req, res) {}