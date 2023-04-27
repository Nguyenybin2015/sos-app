import { httpStatus } from '../constants/constants.http-status.code.js';

export default function responseFailed(res, statusCode, message) {
  res.status(httpStatus.ok).send({
    statusCode,
    message
  });
}
