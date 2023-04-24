/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator';

export const registerValidation = [
  check('name', 'Name is requied').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
];
