import { Router } from 'express';
import {
  addNewBankController,
  getBankByIdController,
  initBanksController,
  getListBankController
} from '../controllers/bank.controller.js';
import { addNewBankValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';
import { bankQuery } from '../validates/validates.query-request.js';

const bankRoutes = Router();

bankRoutes.get('/list', [...bankQuery, validateResult], getListBankController);
bankRoutes.post(
  '/add-new-bank',
  [...addNewBankValidation, validateResult, isAuth],
  addNewBankController
);
bankRoutes.get('/:id', [isAuth], getBankByIdController);
bankRoutes.post('/init-banks', [isAuth], initBanksController);

export default bankRoutes;
