import * as bcrypt from 'bcrypt';
export const gen_hash = async (pwd: string): Promise<string> => {
  return bcrypt.hash(pwd, 10);
}
export const compare_hash = async (pwd: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(pwd, hash);
}
