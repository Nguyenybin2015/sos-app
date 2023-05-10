import { Router } from 'express';
import cryptoController from '../controllers/crypto.controller.js';

const cryptoRoutes = Router();

cryptoRoutes.get('/get-crypto', cryptoController);

export default cryptoRoutes;
