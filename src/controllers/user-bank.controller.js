import * as userBankServiceJs from '../services/user-bank.service.js';
import responseFailed from '../utils/utils.response-failed.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg } from '../constants/constants.message-response.js';

export function addBankUser(req, res) {
  if (req.body.userID || req.body.bankID) {
    userBankServiceJs.addBankService(res, req.body.userID, req.body.bankID);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}

export function getBankConditionController(req, res) {
  // console.log(req);
  if (req.body.userID) {
    userBankServiceJs.getBankConditionService(res, req.body.userID);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateBankConditionController(req, res) {
  userBankServiceJs.updateBankConditionService(res, req.body);
}
