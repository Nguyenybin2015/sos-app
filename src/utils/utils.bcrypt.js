import bcrypt from "bcryptjs";

export const saltRounds = 10;

export async function hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassWord(password, hashPass) {
    return bcrypt.compare(password, hashPass);
}