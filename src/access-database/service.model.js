/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import * as constantsNameTableJs from '../constants/constants.name-table.js';

export async function getAll(id) {
  const results = await db.select('*').from(constantsNameTableJs.service)
    .where('userId', id);
  return results;
}
export async function addServiceModel(body) {
  const {
    id, name, link_on, link_off, avatar
  } = body;
  await db(constantsNameTableJs.service).insert({
    userId: id, name, link_on, link_off, avatar, type: 'deposit'
  });
  await db(constantsNameTableJs.service).insert({
    userId: id, name, link_on, link_off, avatar, type: 'withdrawal'
  });
  await db(constantsNameTableJs.service).insert({
    userId: id, name, link_on, link_off, avatar, type: 'maintanence'
  });
  await db(constantsNameTableJs.service).insert({
    userId: id, name, link_on, link_off, avatar, type: 'system'
  });
  const result = await getAll(id);
  return result;
}

export async function updateLinkOnModel(body) {
  const { id, type, link } = body;
  await db(constantsNameTableJs.service).where('userId', id).andWhere('type', type).update('link_on', link);
  const result = await getAll(id);
  return result;
}
export async function updateLinkOffModel(body) {
  const { id, type, link } = body;
  await db(constantsNameTableJs.service).where('userId', id).andWhere('type', type).update('link_off', link);
  const result = await getAll(id);
  return result;
}
export async function updateAvatarModel(body) {
  const { id, type } = body.body;
  // console.log(body.file.filename);
  const avatar = `/avatar/${body.file.filename}`;
  await db(constantsNameTableJs.service)
    .where('userId', id).andWhere('type', type)
    .update({ avatar });
}
export async function stateOn(body) {
  const { id, type } = body;
  await db(constantsNameTableJs.service).where('userId', id).andWhere('type', type).update('state', 1);
}
export async function stateOff(body) {
  const { id, type } = body;
  await db(constantsNameTableJs.service).where('userId', id).andWhere('type', type).update('state', 0);
}
export async function updateState(body) {
  const { id, type } = body;
  const result = await db.select('state').from(constantsNameTableJs.service).where('userId', id).andWhere('type', type);
  if (result[0].state) {
    console.log('off');
    await stateOff(body);
  }
  else {
    console.log('on');
    await stateOn(body);
  }
}

// export async function getDeposit() {

// }
// export async function getWithdrawl() {}
// export async function getMaintanence() {

// }
// export async function getSystem() {

// }
