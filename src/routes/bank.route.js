import { Router } from 'express';
import {
  addNewBankController,
  getBankByIdController,
} from '../controllers/bank.controller.js';
import { addNewBankValidation } from '../validates/validates.body-request.js';
import validateResult from '../validates/validates.result.js';
import isAuth from '../middlewares/authen-token.js';

const bankRoutes = Router();

bankRoutes.post(
  '/add-new-bank',
  [...addNewBankValidation, validateResult, isAuth],
  addNewBankController
);
bankRoutes.get('/:id', [isAuth], getBankByIdController);

export default bankRoutes;
