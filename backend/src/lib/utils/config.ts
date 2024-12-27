import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();

const { DATABASE_URL, NODE_ENV, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = process.env;

if (!DATABASE_URL) {
  logger.error("DATABASE_URL environment variable is not defined!");
  throw new Error("DATABASE_URL environment variable is not defined!");
}

if (!NODE_ENV) {
  logger.error("NODE_ENV environment variable is not defined!");
  throw new Error("NODE_ENV environment variable is not defined!");
}

if (!ACCESS_TOKEN_KEY) {
  logger.error("ACCESS_TOKEN_KEY environment variable is not defined!");
  throw new Error("ACCESS_TOKEN_KEY environment variable is not defined!");
}

if (!REFRESH_TOKEN_KEY) {
  logger.error("REFRESH_TOKEN_KEY environment variable is not defined!");
  throw new Error("REFRESH_TOKEN_KEY environment variable is not defined!");
}

const config: {
  port: number
  databaseUrl: string
  environment: string
  accessTokenKey: string
  refreshTokenKey: string
} = {
  port: Number(process.env.PORT) || 3000,
  databaseUrl: DATABASE_URL,
  environment: NODE_ENV,
  accessTokenKey: ACCESS_TOKEN_KEY,
  refreshTokenKey: REFRESH_TOKEN_KEY
};

export default config;