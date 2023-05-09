import { db } from '../configs/configs.db.js';
import * as constantsNameTableJs from '../constants/constants.name-table.js';

export async function getUserNotBlock() {
  const results = await db(constantsNameTableJs.p2p)
    .innerJoin(
      constantsNameTableJs.userBank,
      'p2p.id_user_bank',
      '=',
      'bank_user.id'
    )
    .where('p2p.block', '=', 0);
  return results;
}
export async function getUserBlock() {
  const results = await db(constantsNameTableJs.p2p)
    .innerJoin(
      constantsNameTableJs.userBank,
      'p2p.id_user_bank',
      '=',
      'bank_user.id'
    )
    .where('p2p.block', '=', 1);
  return results;
}
export async function updateUserModel(body) {
  const { id, block } = body;
  const results = await db(constantsNameTableJs.p2p).where(
    'p2p.user_locked_id',
    '=',
    id
  ).update({ block }, ['*']);
  return results;
}
export async function getP2PById(body) {
  const { id } = body;
  const results = await db.select('*').from(constantsNameTableJs.p2p).where(
    'p2p.user_locked_id',
    '=',
    id
  );
  return results;
}
