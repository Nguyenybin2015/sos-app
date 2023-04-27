/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const registerValidation = [
  body('name').optional().isString('name must is type string'),
  body('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must is format as example@gmail.com'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password must is > 5 and < 20 character'),
];

export const verifyOtpValidation = [
  body('otpCode').exists().withMessage('otpCode is required'),
];

export const updateBankBody = [
  body('name')
    .optional()
    .isString()
    .withMessage('name must is string'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must is string'),
  body('location')
    .optional()
    .isString()
    .withMessage('location must is string'),
  body('shortName')
    .optional()
    .isString()
    .withMessage('shortName must is string'),
  body('icon').optional().isString().withMessage('icon must is string'),
];
