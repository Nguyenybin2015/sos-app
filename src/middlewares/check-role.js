import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg } from '../constants/constants.message-response.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';
import { userRoles } from '../constants/constant.js';

export default function isAdmin(req, res, next) {
  try {
    const { user } = req;
    if (user.role !== userRoles.ADMIN) {
      return execptionErrorCommon(res, httpStatus.forbidden, authMsg.notPermisson);
    }
    next();
  } catch (error) {
    return execptionErrorCommon(res, httpStatus.forbidden, authMsg.notPermisson);
  }
}
