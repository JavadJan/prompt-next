// utils/bcrypt.js
import bcrypt from 'bcrypt'

export async function hashPassword(password) {
  const saltRounds = 10;
  console.log(password)
  const hashedPassword = await bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

export async function comparePasswords(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

