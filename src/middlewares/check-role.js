import { httpStatus } from '../constants/constants.http-status.code.js';
import { authMsg } from '../constants/constants.message-response.js';
import { userRoles } from '../constants/constant.js';
import responseRequest from '../utils/utils.response.js';

export default function isAdmin(req, res, next) {
  console.log('jsjjs');
  try {
    const { user } = req;
    if (user.role !== userRoles.ADMIN) {
      return responseRequest(res, httpStatus.forbidden, null, authMsg.notPermisson);
      // next();
    }
    next();
  } catch (error) {
    return responseRequest(res, httpStatus.forbidden, null, authMsg.notPermisson);
  }
}
