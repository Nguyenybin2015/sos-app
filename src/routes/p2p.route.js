import { Router } from 'express';
import { normalUser, blockUser, updateUserP2PController } from '../controllers/p2p.controller.js';
import isAuth from '../middlewares/authen-token.js';
import { verifyOtp } from '../controllers/auth.controller.js';
import checkOTP from '../middlewares/check-otp.js';

const p2pRoutes = Router();

p2pRoutes.get('/get-user-normal', [isAuth], normalUser);
p2pRoutes.get('/get-user-blocked', [isAuth], blockUser);
p2pRoutes.put('/update', [isAuth, checkOTP], updateUserP2PController);

export default p2pRoutes;
