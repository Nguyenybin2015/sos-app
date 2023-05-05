import dotenv from 'dotenv';
import { httpStatus } from '../constants/constants.http-status.code.js';
import { verifyToken } from '../helpers/jwt.helper.js';
import { authMsg } from '../constants/constants.message-response.js';

dotenv.config();
const accessTokenSecret = process.env.SECRET_TOKEN;

export default async function isAuth(req, res, next) {
  try {
    const tokenFromClient = req.headers.authorization.replace('Bearer ', '');
    const decoded = await verifyToken(tokenFromClient, accessTokenSecret);
    // console.log('hhhh', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(httpStatus.ok).send({
      message: authMsg.unauthorized,
      stausCode: httpStatus.unauthorized,
    });
  }
}

// export default async function isAuth(req, res, next) {
//   try {
//     const tokenFromClient = req.headers.authorization.replace('Bearer ', '');
//     const decoded = await verifyToken(tokenFromClient, accessTokenSecret);
//     console.log('hhh', decoded);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(httpStatus.ok).send({
//       message: authMsg.unauthorized,
//       stausCode: httpStatus.unauthorized,
//     });
//   }
// }
