import { Router } from "express";
import { getUserList } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/authen-token.js";
const userRoutes = Router();

userRoutes.get('/:userToken', [isAuth], getUserList)

export default userRoutes;