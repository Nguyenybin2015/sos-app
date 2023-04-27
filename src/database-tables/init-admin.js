import { userRoles, gender } from '../constants/constant.js';
import { db } from '../configs/configs.db.js';
import { userTable } from '../constants/constants.name-table.js';
import { hashPassword } from '../utils/utils.bcrypt.js';

export default async function initAdmin() {
  try {
    const password = await hashPassword('admin123#');
    const infoAdmin = {
      name: 'Admin',
      password,
      email: 'admin@gmail.com',
      role: userRoles.ADMIN,
    };
    const existedAdmin = await db(userTable).select('*').where('email', infoAdmin.email);
    if (!existedAdmin[0]) {
      await db(userTable).insert(infoAdmin);
    }
  } catch (error) {
    console.log('init admin', error);
  }
}
