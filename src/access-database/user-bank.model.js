/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import { userBank, bankTable } from '../constants/constants.name-table.js';
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

export async function getUserBankCondition(res, userID) {
  const result = await db(userBank).innerJoin(bankTable, 'banks.id', '=', 'bank_user.bankId').where('bank_user.userId', userID);
  // .select('id', 'lock_deposits', 'lock_withdrawals', 'userId', 'bankId')
  // .from(userBank)
  // .where('userId', userID);
  if (!result.length) {
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

export async function onDeposits(res, body) {
  const { id } = body;
  await db(userBank)
    .where('userId', id)
    .update('lock_deposits', 1);
  const result = await db
    .select('userId', 'lock_deposits')
    .from(userBank)
    .where('userId', id);
  responseRequest(res, result, userBankMsg.updateSuccess);
}
export async function offDeposits(res, body) {
  const { id } = body;
  await db(userBank)
    .where('userId', id)
    .update('lock_deposits', 0);
  const result = await db
    .select('userId', 'lock_deposits')
    .from(userBank)
    .where('userId', id);
  responseRequest(res, result, userBankMsg.updateSuccess);
}

export async function onWithdrawals(res, body) {
  const { id } = body;
  await db(userBank)
    .where('userId', id)
    .update('lock_withdrawals', 1);
  const result = await db
    .select('userId', 'lock_withdrawals')
    .from(userBank)
    .where('userId', id);
  responseRequest(res, result, userBankMsg.updateSuccess);
}
export async function offWithdrawals(res, body) {
  const { id } = body;
  await db(userBank)
    .where('id', id)
    .update('lock_withdrawals', 0);
  const result = await db
    .select('id', 'lock_withdrawals')
    .from(userBank)
    .where('id', id);
  responseRequest(res, result, userBankMsg.updateSuccess);
}
