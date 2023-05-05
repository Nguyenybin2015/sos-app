/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

export function generateToken(payload, keySecret, time) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      keySecret,
      {
        algorithm: 'HS256',
        expiresIn: time,
      },
      (error, token) => {
        if (error) return reject(error);
        resolve(token);
      }
    );
  });
}
// export function generateToken(id, secretKey) {
//   jwt.sign({ foo: id }, secretKey);
// }

export function verifyToken(token, keySecret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, keySecret, (error, decoded) => {
      if (error) return reject(error);
      resolve(decoded);
    });
  });
}
