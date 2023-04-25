/* eslint-disable import/prefer-default-export */
import { body } from 'express-validator';

export const registerValidation = [
  body('name').optional().isString('name must is type string'),
  body('email').exists().withMessage('email is required').isEmail()
    .withMessage('email must is format as example@gmail.com'),
  body('password').exists().withMessage('password is required').isLength({ min: 6, max: 20 })
    .withMessage('password must is > 5 and < 20 character')
];
