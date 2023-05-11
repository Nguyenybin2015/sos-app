import { httpStatus } from '../constants/constants.http-status.code.js';
import { bankMsg, serverMsg } from '../constants/constants.message-response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';
import responseRequest from '../utils/utils.response.js';
import {
  findAllBankService,
  getBankIdService,
  initBankListService,
  updateBankService,
  deleteBankService
} from '../services/bank.service.js';

export async function getBankByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getBankIdService(res, id);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.getById);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export async function initBanksController(req, res) {
  try {
    const result = await initBankListService();
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.initBanks);
    }
  } catch (error) {
    console.log(error);
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export async function getListBankController(req, res) {
  try {
    const { query } = req;
    const result = await findAllBankService(query);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.getAllBank);
    }
  } catch (error) {
    console.log('err', error);
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export async function updateBankController(req, res) {
  try {
    const { body } = req;
    const { id } = req.params;
    const result = await updateBankService(res, id, body);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.update);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export async function deleteBankController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteBankService(res, id);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.delete);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
