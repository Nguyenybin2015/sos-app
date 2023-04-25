import { httpStatus } from '../constants/constants.http-status.code.js';

export default function responseRequest(res, data, message) {
  res.status(httpStatus.ok).send({
    statusCode: httpStatus.ok,
    data,
    message
  });
}
