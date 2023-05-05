/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { userTable, profileTable } from '../constants/constants.name-table.js';
import responseFailed from '../utils/utils.response-failed.js';
import responseRequest from '../utils/utils.response.js';

export async function findUserByEmail(email) {
  const result = await db.select('*').from(userTable).where('email', email);
  return result[0];
}

export async function findUserProfileByEmail(email) {
  const result = await db.select('*').from(userTable).where('email', email);
  return result[0];
}

export async function insertNewUser(res, userBody, profileBody) {
  let getUser = {};
  await db.transaction(async (trx) => {
    await db(userTable).insert(userBody);
    getUser = await findUserByEmail(userBody.email);
    try {
      await db
        .insert({ ...profileBody, userId: getUser.id })
        .into(profileTable)
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback);
    } catch (error) {
      await db(userTable).delete().where('id', getUser.id);
      return responseFailed(
        res,
        httpStatus.serverInterval,
        userMsg.createProfileError
      );
    }
  });
  return getUser;
}

export async function findUserById(id) {
  const result = await db.select('*').from(userTable).where('id', id);
  return result[0];
}

export async function getUserBankCondition(id) {
  const result = await db
    .select('id', 'maintenance', 'close_system')
    .from(userTable)
    .where('id', id);
  return result[0];
}

export async function updateUserBankCondition(res, body) {
  console.log(body);
  const { id, maintenance, close_system } = body;
  if (body.maintenance != null || body.close_system != null) {
    await db(userTable)
      .where('id', id)
      .update({ maintenance, close_system });
    const result = await db
      .select('id', 'maintenance', 'close_system')
      .from(userTable)
      .where('id', id);
    responseRequest(res, result, userMsg.updateSuccess);
  } else {
    responseFailed(res, httpStatus.noContent, userMsg.updateFail);
  }
}
