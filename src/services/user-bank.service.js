/* eslint-disable camelcase */
import { httpStatus } from '../constants/constants.http-status.code.js';
import responseFailed from '../utils/utils.response-failed.js';
import {
  createUserBank,
  getUserBankCondition,
  updateUserBankCondition,
} from '../access-database/user-bank.model.js';
import { userBankMsg, serverMsg } from '../constants/constants.message-response.js';

export function addBankService(res, userID, bankID) {
  try {
    createUserBank(res, userID, bankID);
    return true;
  } catch (error) {
    return responseFailed(
      res,
      httpStatus.notFound,
      userBankMsg.addUBFail
    );
  }
}

export function getBankConditionService(res, userID) {
  try {
    getUserBankCondition(res, userID);
    // return true;
  } catch (error) {
    return responseFailed(
      res,
      httpStatus.serverInterval,
      serverMsg
    );
  }
}

export function updateBankConditionService(res, body) {
  try {
    updateUserBankCondition(res, body);
    return true;
  } catch (error) {
    return responseFailed(
      res,
      httpStatus.serverInterval,
      serverMsg
    );
  }
}
