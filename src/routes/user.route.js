import { Router } from 'express';
import * as userControllerJs from '../controllers/user.controller.js';
import * as validatesBodyRequestJs from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';
import isAdmin from '../middlewares/check-role.js';
import checkOTP from '../middlewares/check-otp.js';
import upload from '../controllers/upload-file.controller.js';
import sendEmail from '../services/send-mail.service.js';

const userRoutes = Router();

// userRoutes.get('/get-app-user-condition', [isAuth], userControllerJs.getAppCondition);
// userRoutes.get('/get-user-services', [isAuth], userControllerJs.getUserStateController);
userRoutes.put('/update-user-profile', [isAuth], userControllerJs.updateUserProfile);
// userRoutes.put('/update-app-user-condition', [isAuth, checkOTP], userControllerJs.updateAppCondition);
// userRoutes.put('/on-maintenance', [isAuth, checkOTP], userControllerJs.onMaintenanceController);
// userRoutes.put('/off-maintenance', [isAuth, checkOTP], userControllerJs.offMaintenanceController);
// userRoutes.put('/on-system', [isAuth, checkOTP], userControllerJs.onSystemController);
// userRoutes.put('/off-system', [isAuth, checkOTP], userControllerJs.offSystemController);
userRoutes.get('/profile', [isAuth], userControllerJs.getUserById);
userRoutes.post(
  '/register-acount',
  [...validatesBodyRequestJs.registerValidation, validateResult],
  userControllerJs.registerAccount
);
userRoutes.put('/update-avatar', [isAuth, upload.single('image_avatar')], userControllerJs.updateAvatarProfile);

export default userRoutes;
