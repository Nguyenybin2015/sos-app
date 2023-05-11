import { Router } from 'express';
import isAuth from '../middlewares/authen-token.js';
import * as serviceControllerJs from '../controllers/service.controller.js';
import upload from '../controllers/upload-file.controller.js';

const services = Router();

services.post('/add-service', [isAuth], serviceControllerJs.add);
services.get('/get-all', [isAuth], serviceControllerJs.getAll);
services.put('/update-avatar', [isAuth, upload.single('image_avatar')], serviceControllerJs.updateAvatar);
services.put('/update-state', [isAuth], serviceControllerJs.updateState);
services.put('/update-name', [isAuth], serviceControllerJs.updateName);

export default services;
