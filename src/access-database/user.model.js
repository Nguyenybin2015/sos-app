import { db } from '../configs/configs.db.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { userTable, profileTable } from '../constants/constants.name-table.js';
import responseFailed from '../utils/utils.response-failed.js';

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
