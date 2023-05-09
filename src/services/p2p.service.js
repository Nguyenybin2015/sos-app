import responseFailed from '../utils/utils.response-failed.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import * as p2pModelJs from '../access-database/p2p.model.js';
import { serverMsg } from '../constants/constants.message-response.js';
import { verifyOtpService } from './auth.service.js';

export async function getUserNormal(res) {
  const result = await p2pModelJs.getUserNotBlock();
  if (!result) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
  return result;
}
export async function getUserBlocked(res) {
  const result = await p2pModelJs.getUserBlock();
  if (!result) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
  return result;
}
export async function updateUserBlock(res, body) {
  await p2pModelJs.updateUserModel(body);
  const result = await p2pModelJs.getP2PById(body);
  if (!result) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
  return result;
}
