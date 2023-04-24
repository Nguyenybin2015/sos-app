import { Router } from "express";
import { getUserList } from "../controllers/user.controller.js";
const userRoutes = Router();

userRoutes.get('/:userToken', getUserList)

export default userRoutes;