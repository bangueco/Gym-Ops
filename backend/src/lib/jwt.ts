import jwt from "jsonwebtoken";
import config from "./utils/config";

const generateAccessToken = (id: number): string => {
  return jwt.sign({ id }, config.accessTokenKey, { expiresIn: "10m" });
};

const generateRefreshToken = (id: number): string => {
  return jwt.sign({ id }, config.refreshTokenKey, { expiresIn: "30d" });
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.accessTokenKey);
};

export default {
  generateAccessToken, generateRefreshToken, verifyToken
};