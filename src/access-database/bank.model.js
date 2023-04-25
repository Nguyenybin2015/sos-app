import { db } from '../configs/configs.db.js';
import { bankMsg } from '../constants/constants.message-response.js';
import { bankTable } from '../constants/constants.name-table.js';

export async function importBankList(bankList = []) {
  for await (const bank of bankList) {
    const {
      name, location, branch, code
    } = bank;
    if (!name || !location || !branch || !code) {
      bank.status = bankMsg.importStatus.requiredFields;
      continue;
    }
    try {
      await db.insert(bank).into(bankTable);
    } catch (error) {
      bank.status = bankMsg.importStatus.insertError;
      continue;
    }
  }
}

export async function findBankById(id) {
  const result = await db.select('*').from(bankTable).where('id', id);
  return result[0];
}

export async function findBankByCollunm(colunm, value) {
  const result = await db.select('*').from(bankTable).where(colunm, value);
  return result[0];
}

export async function inserNewBank(body) {
  const result = await db.insert(body).into(bankTable);
  return result;
}
