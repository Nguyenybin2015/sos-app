import { db } from '../configs/configs.db.js';

export async function findUserByEmail(email) {
  const result = await db.select('*').from('users').where('email', email);
  return result;
}

export async function findUserProfileByEmail(email) {
  const result = await db.select('*').from('profile_user').where('email', email);
  return result;
}

export async function insertNewUser(body) {
  console.log('This is function add new user');
}

export async function updateUser(body) {
  console.log('This is function update user');
}
