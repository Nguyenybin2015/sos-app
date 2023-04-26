import { db } from '../configs/configs.db.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import { userTable, profileTable } from '../constants/constants.name-table.js';
import execptionErrorCommon from '../exceptions/exception.errror-common.js';

export async function findUserByEmail(email) {
  const result = await db.select('*').from(userTable).where('email', email);
  return result[0];
}

export async function findUserProfileByEmail(email) {
  const result = await db.select('*').from(userTable).where('email', email);
  return result[0];
}

export async function insertNewUser(res, userBody, profileBody) {
  await db.transaction(async (trx) => {
    await db(userTable).insert(userBody);
    const getUser = await findUserByEmail(userBody.email);
    try {
      await db
        .insert({ ...profileBody, userId: getUser.id })
        .into(profileTable)
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback);
    } catch (error) {
      await db(userTable).delete().where('id', getUser.id);
      return execptionErrorCommon(
        res,
        httpStatus.serverInterval,
        userMsg.createProfileError
      );
    }
  });
}
