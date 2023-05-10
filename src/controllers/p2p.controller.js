import { getUserNormal, getUserBlocked, updateUserBlock } from '../services/p2p.service.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg, p2pMsg } from '../constants/constants.message-response.js';
import responseRequest from '../utils/utils.response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function normalUser(req, res) {
  try {
    const result = await getUserNormal();
    if (!res.headersSent) {
      responseRequest(res, result, p2pMsg.success);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function blockUser(req, res) {
  try {
    const result = await getUserBlocked();
    if (!res.headersSent) {
      responseRequest(res, result, p2pMsg.success);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function updateUserP2PController(req, res) {
  try {
    const result = await updateUserBlock(res, req.body);
    // console.log(result);
    if (result) {
      responseRequest(res, result, p2pMsg.success);
    }
  } catch (error) {
    execptionErrorCommon(res, httpStatus.serverInterval, serverMsg);
  }
}
