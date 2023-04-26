import { db } from '../configs/configs.db.js';
import { bankTable } from '../constants/constants.name-table.js';

export async function findBankById(id) {
  const result = await db.select('*').from(bankTable).where('id', id);
  return result[0];
}

export async function findBankByCollunm(colunm, value) {
  const result = await db.select('*').from(bankTable).where(colunm, value);
  return result[0];
}

export async function inserNewBank(body) {
  await db.insert(body).into(bankTable);
  return true;
}
