import bcrypt from "bcrypt";

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

export default {
  hashPassword, comparePassword
};