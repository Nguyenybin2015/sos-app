/* eslint-disable no-else-return */
/* eslint-disable camelcase */
import * as serviceModelJs from '../access-database/service.model.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { serverMsg } from '../constants/constants.message-response.js';
import responseFailed from '../utils/utils.response-failed.js';
import responseRequest from '../utils/utils.response.js';

export async function addService(res, body) {
  try {
    const result = await serviceModelJs.addServiceModel(body);
    return responseRequest(res, result, 'Success');
    // }
  } catch (error) {
    console.log(error);
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function getAllService(res, id) {
  try {
    // console.log(id);
    const result = await serviceModelJs.getAll(id);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function getServiceByType(res, body) {
  try {
    // console.log(id);
    const result = await serviceModelJs.getService(body);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function addLinkOnService(res, body) {
  try {
    const result = await serviceModelJs.updateLinkOnModel(body);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function addLinkOffService(res, body) {
  try {
    const result = await serviceModelJs.updateLinkOffModel(body);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function updateStateService(res, body) {
  try {
    const result = await serviceModelJs.updateState(body);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function updateAvatarService(res, body) {
  try {
    await serviceModelJs.updateAvatarModel(body);
    return responseRequest(res, httpStatus.ok, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
export async function deleteService(res, body) {
  try {
    const result = await serviceModelJs.deleteServiceModal(body);
    return responseRequest(res, result, 'Success');
  } catch (error) {
    return responseFailed(res, httpStatus.serverInterval, serverMsg);
  }
}
