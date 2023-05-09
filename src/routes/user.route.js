import { Router } from 'express';
import * as userControllerJs from '../controllers/user.controller.js';
import * as validatesBodyRequestJs from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';
import isAdmin from '../middlewares/check-role.js';
import checkOTP from '../middlewares/check-otp.js';

const userRoutes = Router();

userRoutes.get('/get-app-user-condition', [isAuth], userControllerJs.getAppCondition);
userRoutes.put('/update-app-user-condition', [isAuth, checkOTP], userControllerJs.updateAppCondition);
userRoutes.get('/:id', [isAuth, isAdmin], userControllerJs.getUserById);
userRoutes.post(
  '/register-acount',
  [...validatesBodyRequestJs.registerValidation, validateResult],
  userControllerJs.registerAccount
); // phan quyen, auth, token

export default userRoutes;
