import { Router } from 'express';
import {
  addNewBankController,
  getBankByIdController,
  initBanksController,
  getListBankController,
  updateBankController,
  deleteBankController,
} from '../controllers/bank.controller.js';
import {
  addNewBankValidation,
  updateBankBody,
} from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';
import { bankQuery } from '../validates/validates.query-request.js';
import isAdmin from '../middlewares/check-role.js';

const bankRoutes = Router();

bankRoutes.get('/list', [...bankQuery, validateResult], getListBankController);
bankRoutes.post(
  '/add-new-bank',
  [...addNewBankValidation, validateResult, isAuth, isAdmin],
  addNewBankController
);
bankRoutes.put(
  '/update/:id',
  [...updateBankBody, validateResult, isAuth, isAdmin],
  updateBankController
);
bankRoutes.delete('/delete/:id', [isAuth, isAdmin], deleteBankController);
bankRoutes.get('/:id', [isAuth], getBankByIdController);
bankRoutes.post('/init-banks', [isAuth, isAdmin], initBanksController);

export default bankRoutes;
