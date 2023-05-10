import { db } from '../configs/configs.db.js';
import { bankTable } from '../constants/constants.name-table.js';
import { bankListInfo } from '../constants/constants.bank-list.js';
import generateUUID from '../utils/generate-uuid.js';

export async function findBankById(id) {
  const result = await db.select('*').from(bankTable).where('id', id);
  return result[0];
}

export async function findBankByCollunm(colunm, value) {
  const result = await db.select('*').from(bankTable).where(colunm, value);
  return result[0];
}

export async function initMultiBank() {
  for await (const bank of bankListInfo) {
    const existedBank = await findBankByCollunm('short_name', bank.short_name);
    if (existedBank) {
      continue;
    }
    const bankBody = { ...bank };
    await db(bankTable).insert(bankBody);
  }
}

export async function findAllBanks(query) {
  const { page, limit, searchKey } = query;
  const results = db(bankTable)
    .select('*')
    .modify((queryBuilder) => {
      if (searchKey) {
        queryBuilder
          .where('short_name', 'like', `%${searchKey}%`)
          .orWhere('vietnamese_name', 'like', `%${searchKey}%`)
          .orWhere('english_name', 'like', `%${searchKey}%`);
      }
    })
    .limit(limit && page ? Number(limit) : null)
    .offset(limit && page ? Number(limit) * (Number(page) - 1) : null);
  return results;
}

export async function updateBank(id, body) {
  await db(bankTable).where('id', id).update(body);
}

export async function deleteBank(id) {
  await db(bankTable).where('id', id).del();
}
