import jwt from "jsonwebtoken";
import config from "./utils/config";

const generateAccessToken = (id: number, firstName: string, lastName: string, email: string): string => {
  return jwt.sign({ id, firstName, lastName, email }, config.accessTokenKey, { expiresIn: "5m" });
};

const generateRefreshToken = (id: number, firstName: string, lastName: string, email: string): string => {
  return jwt.sign({ id, firstName, lastName, email }, config.refreshTokenKey, { expiresIn: "30d" });
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, config.accessTokenKey);
};

export default {
  generateAccessToken, generateRefreshToken, verifyToken
};