/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { db } from '../configs/configs.db.js';
import * as constantsNameTableJs from '../constants/constants.name-table.js';

export async function getAll(id) {
  const results = await db
    .select('*')
    .from(constantsNameTableJs.service)
    .where('userId', id);
  return results;
}
export async function getService(body) {
  const { type } = body.body;
  const { id } = body.user;
  const results = await db
    .select('*')
    .from(constantsNameTableJs.service)
    .where('userId', id).andWhere('type', type);
  return results;
}
export async function addServiceModel(body) {
  const {
    name, link_on, link_off, type
  } = body.body;
  const { id } = body.user;
  if (!body.file) {
    await db(constantsNameTableJs.service).insert({
      userId: id,
      name,
      link_on,
      link_off,
      type,
    });
  }
  else {
    const avatar = `/avatar/${body.file.filename}`;
    await db(constantsNameTableJs.service).insert({
      userId: id,
      name,
      link_on,
      link_off,
      avatar,
      type,
    });
  }
  const result = await getAll(id);
  return result;
}

export async function updateLinkOnModel(body) {
  const { idService, link } = body;
  await db(constantsNameTableJs.service)
    .where('id', idService)
    .update('link_on', link);
  const result = await getAll(id);
  return result;
}
export async function updateLinkOffModel(body) {
  const { idService, link } = body;
  await db(constantsNameTableJs.service)
    .where('id', idService)
    .update('link_off', link);
  const result = await getAll(id);
  return result;
}
export async function updateAvatarModel(body) {
  const { idService } = body.body;
  // console.log(body.file.filename);
  const avatar = `/avatar/${body.file.filename}`;
  await db(constantsNameTableJs.service)
    .where('id', idService)
    .update({ avatar });
}
export async function stateOn(body) {
  const { idService } = body;
  await db(constantsNameTableJs.service)
    .where('id', idService)
    .update('state', 1);
  const result = await db
    .select('id', 'userId', 'type', 'link_on')
    .from(constantsNameTableJs.service)
    .where('id', idService);
  return result;
}
export async function stateOff(body) {
  const { idService } = body;
  await db(constantsNameTableJs.service)
    .where('id', idService)
    .update('state', 0);
  const result = await db
    .select('id', 'userId', 'type', 'link_off')
    .from(constantsNameTableJs.service)
    .where('id', idService);
  return result;
}
export async function updateState(body) {
  const { idService } = body;
  // console.log(body);
  const result = await db
    .select('state')
    .from(constantsNameTableJs.service)
    .where('id', idService);
  // console.log(result);
  if (result[0].state) {
    console.log('off');
    const stateOnRedult = await stateOff(body);
    return stateOnRedult;
  }
  console.log('on');
  const stateOnRedult = await stateOn(body);
  return stateOnRedult;
}

// export async function getDeposit() {

// }
// export async function getWithdrawl() {}
// export async function getMaintanence() {

// }
// export async function getSystem() {

// }
