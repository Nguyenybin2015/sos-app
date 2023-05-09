import { Router } from 'express';
import isAuth from '../middlewares/authen-token.js';
import isAdmin from '../middlewares/check-role.js';
import * as userBankControllerJs from '../controllers/user-bank.controller.js';
import checkOTP from '../middlewares/check-otp.js';

const userBankRoutes = Router();

userBankRoutes.get('/get-bank-condition', [isAuth], userBankControllerJs.getBankConditionController);
userBankRoutes.put('/update-bank-condition', [isAuth, checkOTP], userBankControllerJs.updateBankConditionController);
userBankRoutes.post('/add', [isAuth], userBankControllerJs.addBankUser);

export default userBankRoutes;
