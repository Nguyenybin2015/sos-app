/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { userMsg } from '../constants/constants.message-response.js';
import * as constantsNameTableJs from '../constants/constants.name-table.js';
import responseFailed from '../utils/utils.response-failed.js';
import responseRequest from '../utils/utils.response.js';

export async function findUserByEmail(email) {
  const result = await db
    .select('*')
    .from(constantsNameTableJs.userTable)
    .where('email', email);
  return result[0];
}

export async function findUserProfileByEmail(email) {
  const result = await db
    .select('*')
    .from(constantsNameTableJs.userTable)
    .where('email', email);
  return result[0];
}

export async function insertNewUser(res, userBody, profileBody) {
  let getUser = {};
  await db.transaction(async (trx) => {
    await db(constantsNameTableJs.userTable).insert(userBody);
    getUser = await findUserByEmail(userBody.email);
    try {
      await db
        .insert({ ...profileBody, userId: getUser.id })
        .into(constantsNameTableJs.profileTable)
        .transacting(trx)
        .then(trx.commit)
        .catch(trx.rollback);
      // console.log('second');
    } catch (error) {
      await db(constantsNameTableJs.userTable).delete().where('id', getUser.id);
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
  const result = await db
    .select('*')
    .from(constantsNameTableJs.userTable)
    .innerJoin(
      constantsNameTableJs.profileTable,
      'users.id',
      '=',
      'profile_user.userId'
    )
    .where('users.id', id);
  return result[0];
}

export async function getUserBankCondition(id) {
  // console.log(id);
  const result = await db
    .select('id', 'maintenance', 'close_system')
    .from(constantsNameTableJs.userTable)
    .where('id', id);
  return result[0];
}
export async function updateUserBankCondition(res, body) {
  // console.log(body);
  const { id, maintenance, close_system } = body;
  if (body.maintenance != null || body.close_system != null) {
    await db(constantsNameTableJs.userTable)
      .where('id', id)
      .update({ maintenance, close_system });
    const result = await db
      .select('id', 'maintenance', 'close_system')
      .from(constantsNameTableJs.userTable)
      .where('id', id);
    responseRequest(res, result, userMsg.updateSuccess);
  } else {
    responseFailed(res, httpStatus.noContent, userMsg.updateFail);
  }
}
export async function updateUserProfileModel(res, body) {
  const {
    phoneNumber, name, address, email
  } = body.body;
  const { id } = body.user;
  // console.log(name);
  if (phoneNumber != null || address != null) {
    await db(constantsNameTableJs.profileTable)
      .where('userId', id)
      .update({ phoneNumber, address });
  }
  if (name != null || email != null) {
    await db(constantsNameTableJs.userTable)
      .where('id', id)
      .update({ name, email });
  } else {
    responseFailed(res, httpStatus.noContent, userMsg.updateFail);
  }
  const result = await findUserById(id);
  responseRequest(res, result, userMsg.updateSuccess);
}
export async function updateNameModel(res, body) {
  const {
    idService, name, link_on, link_off
  } = body.body;
  // const result = await findUserById(id);
  if (!body.file) {
    const check = await db
      .select('*')
      .from(constantsNameTableJs.service)
      .where('id', idService)
      .update({ name, link_on, link_off });
  }
  else {
    const avatar = `/avatar/${body.file.filename}`;
    const check = await db
      .select('*')
      .from(constantsNameTableJs.service)
      .where('id', idService)
      .update({
        name, link_on, link_off, avatar
      });
  }
}
export async function updateAvatar(res, body) {
  const { id } = body.user;
  const avatar = `/avatar/${body.file.filename}`;
  if (avatar) {
    await db(constantsNameTableJs.profileTable)
      .where('userId', id)
      .update({ avatar });
    await db(constantsNameTableJs.service)
      .where('userId', id)
      .update({ avatar });
  } else {
    responseFailed(res, httpStatus.noContent, userMsg.updateFail);
  }
  const result = await findUserById(id);
  // console.log(findUserById(id));
  responseRequest(res, result, userMsg.updateSuccess);
}
export async function onSystemModel(res, body) {
  const { id } = body;
  await db(constantsNameTableJs.userTable)
    .where('id', id)
    .update('close_system', 0);
  const result = await db
    .select('id', 'close_system')
    .from(constantsNameTableJs.userTable)
    .where('id', id);
  responseRequest(res, result, userMsg.updateSuccess);
}
export async function offSystemModel(res, body) {
  const { id } = body;
  await db(constantsNameTableJs.userTable)
    .where('id', id)
    .update('close_system', 1);
  const result = await db
    .select('id', 'close_system')
    .from(constantsNameTableJs.userTable)
    .where('id', id);
  responseRequest(res, result, userMsg.updateSuccess);
}
export async function onMaintanenceModel(res, body) {
  const { id } = body;
  await db(constantsNameTableJs.userTable)
    .where('id', id)
    .update('maintenance', 1);
  const result = await db
    .select('id', 'maintenance')
    .from(constantsNameTableJs.userTable)
    .where('id', id);
  responseRequest(res, result, userMsg.updateSuccess);
}
export async function offMaintanenceModel(res, body) {
  const { id } = body;
  await db(constantsNameTableJs.userTable)
    .where('id', id)
    .update('maintenance', 0);
  const result = await db
    .select('id', 'maintenance')
    .from(constantsNameTableJs.userTable)
    .where('id', id);
  responseRequest(res, result, userMsg.updateSuccess);
}

export async function getUserServiceCondition(body) {
  const { id } = body;
  console.log(id);
  const result = await db
    .select('users.*', 'bank_user.lock_deposits', 'bank_user.lock_withdrawals')
    .from(constantsNameTableJs.userTable)
    .innerJoin(
      constantsNameTableJs.userBank,
      'users.id',
      '=',
      'bank_user.userId'
    )
    .where('users.id', id);
  return result[0];
}
export async function deleteUser(body) {
  const { id } = body.user;
  await db(constantsNameTableJs.userTable)
    .innerJoin(
      constantsNameTableJs.profileTable,
      'users.id',
      '=',
      'profile_user.userId'
    )
    .innerJoin(constantsNameTableJs.service, 'users.id', '=', 'service.userId')
    .where('users.id', id)
    .del();
  return true;
}
