import { sign, verify } from "jsonwebtoken";

export function generateToken(payload, keySecret, time) {
  return new Promise((resolve, reject) => {
    sign(
      payload,
      keySecret,
      {
        algorithm: "HS256",
        expiresIn: time,
      },
      (error, token) => {
        if (error) return reject(error);
        resolve(token);
      }
    );
  });
}

export function verifyToken(token, keySecret) {
  return new Promise((resolve, reject) => {
    verify(token, keySecret, (error, decoded) => {
        if (error) return reject(error);
        resolve(decoded);
    });
  });
}
