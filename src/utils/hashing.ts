import bcrypt from "bcrypt";
export const gen_hash = async (pwd: string) => {
  return bcrypt.hash(pwd, 10);
}
