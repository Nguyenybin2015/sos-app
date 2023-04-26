import {
  findBankById,
  findBankByCollunm,
  inserNewBank,
  initMultiBank,
  findAllBanks,
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
  const { shortName } = body;
  const existedBank = await findBankByCollunm('short_name', shortName);
  if (existedBank) {
    return execptionErrorCommon(res, httpStatus.conflict, bankMsg.existedCode);
  }
  await inserNewBank({ ...body, short_name: shortName });
  return true;
}

export async function initBankListService() {
  await initMultiBank();
  return true;
}

export async function findAllBankService(query) {
  const results = await findAllBanks(query);
  return results;
}
