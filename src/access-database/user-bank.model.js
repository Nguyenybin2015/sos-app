/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import { userBank } from '../constants/constants.name-table.js';
import responseFailed from '../utils/utils.response-failed.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userBankMsg } from '../constants/constants.message-response.js';
import responseRequest from '../utils/utils.response.js';

export async function createUserBank(res, userID, bankID) {
  const existedBank = await db
    .select('userId', 'bankId')
    .from(userBank)
    .where('userId', userID)
    .andWhere('bankId', bankID);
  if (existedBank.length) {
    responseFailed(res, httpStatus.conflict, userBankMsg.addUBFail);
  } else {
    await db(userBank).insert({ userID, bankID });
    responseRequest(res, httpStatus.ok, userBankMsg.addUBSuccess);
  }
}

export async function getUserBankCondition(res, userID, bankID) {
  const result = await db
    .select('id', 'lock_deposits', 'lock_withdrawals', 'userId', 'bankId')
    .from(userBank)
    .where('userId', userID);
  console.log(result);
  if (!result.length) {
    console.log('result not found');
    responseFailed(res, httpStatus.notFound, userBankMsg.userBankNotFound);
  } else {
    responseRequest(res, result, userBankMsg.getSuccess);
  }
}

export async function updateUserBankCondition(res, body) {
  const { id, lock_deposits, lock_withdrawals } = body;
  if (body.lock_deposits != null || body.lock_withdrawals != null) {
    await db(userBank)
      .where('id', id)
      .update({ lock_deposits, lock_withdrawals });
    const result = await db
      .select('id', 'lock_deposits', 'lock_withdrawals')
      .from(userBank)
      .where('id', id);
    responseRequest(res, result, userBankMsg.updateSuccess);
  } else {
    responseFailed(res, httpStatus.noContent, userBankMsg.noHaveChange);
  }
}
