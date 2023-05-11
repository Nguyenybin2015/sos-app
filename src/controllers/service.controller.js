import * as userServiceJs from '../services/user.service.js';
import responseFailed from '../utils/utils.response-failed.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg } from '../constants/constants.message-response.js';
import * as serviceUserServiceJs from '../services/serviceUser.service.js';

export function updateName(req, res) {
  if (req.body) {
    userServiceJs.updateNameService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function add(req, res) {
  if (req.body) {
    serviceUserServiceJs.addService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function getAll(req, res) {
  if (req.body.id) {
    serviceUserServiceJs.getAllService(res, req.body.id);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function addLinkOn(req, res) {
  if (req.body) {
    serviceUserServiceJs.addLinkOnService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function addLinkOff(req, res) {
  if (req.body) {
    serviceUserServiceJs.addLinkOffService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateState(req, res) {
  if (req.body) {
    serviceUserServiceJs.updateStateService(res, req.body);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export function updateAvatar(req, res) {
  // console.log(req.body);
  if (req.body) {
    serviceUserServiceJs.updateAvatarService(res, req);
  } else {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
