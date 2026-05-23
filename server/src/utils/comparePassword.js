import bcrypt from "bcrypt";

export const comparePassword = (plain, hash) => {
  return bcrypt.compare(plain, hash);
};
