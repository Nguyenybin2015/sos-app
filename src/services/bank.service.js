import {
  findBankById,
  findBankByCollunm,
  inserNewBank,
} from '../access-database/bank.model.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { bankMsg } from '../constants/constants.message-response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function getBankIdService(res, id) {
  const result = await findBankById(id);
  if (!result) {
    return execptionErrorCommon(res, httpStatus.notFound, bankMsg.notFound);
  }
  return result;
}

export async function addNewBankService(res, body) {
  const { code } = body;
  const existedBank = await findBankByCollunm('code', code);
  if (existedBank) {
    return execptionErrorCommon(res, httpStatus.conflict, bankMsg.existedCode);
  }
  const result = await inserNewBank(body);
  return result;
}
