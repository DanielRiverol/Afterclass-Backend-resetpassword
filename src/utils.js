import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from 'jsonwebtoken'
import config from "./config/config.js";
import bcrypt from "bcrypt";
export const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwt.SECRET, { expiresIn: "1h" });
};
export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
export const createHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salts);
};
export const isValidPassword = (user, password) =>
  bcrypt.compare(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
