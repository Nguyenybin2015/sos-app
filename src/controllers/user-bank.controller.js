import {
  addBankService,
  getBankConditionService,
  updateBankConditionService,
} from '../services/user-bank.service.js';
import responseFailed from '../utils/utils.response-failed.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg } from '../constants/constants.message-response.js';

export function addBankUser(req, res) {
  addBankService(res, req.body.userID, req.body.bankID);
}

export function getBankConditionController(req, res) {
  if (req.body.userID) {
    getBankConditionService(res, req.body.userID);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateBankConditionController(req, res) {
  updateBankConditionService(res, req.body);
}
