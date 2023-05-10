import { httpStatus } from '../constants/constants.http-status.code.js';
import { p2pMsg, serverMsg } from '../constants/constants.message-response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';
import responseRequest from '../utils/utils.response.js';
import getListCrypto from '../services/crypto.service.js';

export default async function cryptoController(req, res) {
  try {
    const result = await getListCrypto(res);
    if (result) {
      responseRequest(res, result, p2pMsg.success);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
