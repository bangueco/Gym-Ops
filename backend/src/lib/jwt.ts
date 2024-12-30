import jwt from "jsonwebtoken";
import config from "./utils/config";

const generateAccessToken = (id: number, firstName: string, lastName: string, email: string): string => {
  return jwt.sign({ id, firstName, lastName, email }, config.accessTokenKey, { expiresIn: "5m" });
};

const generateRefreshToken = (id: number, firstName: string, lastName: string, email: string): string => {
  return jwt.sign({ id, firstName, lastName, email }, config.refreshTokenKey, { expiresIn: "30d" });
};

const verifyAccessToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.accessTokenKey);
};

const verifyRefreshToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.refreshTokenKey);
};

export default {
  generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken
};