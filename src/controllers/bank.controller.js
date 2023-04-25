import { httpStatus } from '../constants/constants.http-status.code.js';
import { bankMsg, serverMsg } from '../constants/constants.message-response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';
import responseRequest from '../utils/utils.response.js';
import {
  addNewBankService,
  getBankIdService,
} from '../services/bank.service.js';

export async function getBankByIdController(req, res) {
  try {
    const { id } = req.params;
    const result = await getBankIdService(res, id);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.getById);
    }
  } catch (error) {
    console.log('error', error);
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}

export async function addNewBankController(req, res) {
  try {
    const { body } = req;
    const result = await addNewBankService(res, body);
    if (!res.headersSent) {
      responseRequest(res, result, bankMsg.addNew);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
