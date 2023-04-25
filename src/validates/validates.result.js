import { validationResult } from 'express-validator';
import { httpStatus } from '../constants/constants.http-status.code.js';

export default function validateResult(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(httpStatus.badRequest)
      .send({ statusCode: httpStatus.badRequest, message: err.mapped() });
  }
  next();
}
