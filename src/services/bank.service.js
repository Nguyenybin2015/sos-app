import {
  findBankById,
  initMultiBank,
  findAllBanks,
  updateBank,
  deleteBank
} from '../access-database/bank.model.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { bankMsg } from '../constants/constants.message-response.js';
import responseFailed from '../utils/utils.response-failed.js';

export async function getBankIdService(res, id) {
  const result = await findBankById(id);
  if (!result) {
    return responseFailed(res, httpStatus.notFound, bankMsg.notFound);
  }
  return result;
}

export async function initBankListService() {
  await initMultiBank();
  return true;
}

export async function findAllBankService(query) {
  const results = await findAllBanks(query);
  return results;
}

export async function updateBankService(res, id, body) {
  try {
    const { shortName } = body;
    await findBankById(id);
    if (shortName) {
      body.short_name = shortName;
      delete body.shortName;
    }
    await updateBank(id, body);
    return true;
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, bankMsg.updateFailed);
  }
}

export async function deleteBankService(res, id) {
  try {
    await findBankById(id);
    await deleteBank(id);
    return true;
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, bankMsg.deleteFailed);
  }
}
