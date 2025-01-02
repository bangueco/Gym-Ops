import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import compression from "compression";

import errorHandler from "@middlewares/errorHandler";
import unknownEndpoint from "@middlewares/unknownEndpoint";

import { JwtPayload } from "jsonwebtoken";
import apiRouter from "src/routes";

declare module "express-serve-static-core" {
  interface Request {
    user: JwtPayload;
  }
}

const app = express();

// parse json body request
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({extended: true}));

// enable cors
app.use(cors({origin: "http://localhost:5173", credentials: true}));

// set security HTTP headers
app.use(helmet());

// set rate limiting for endpoints
app.use(rateLimit({windowMs: 15 * 60 * 1000, max: 100}));

// parse cookies
app.use(cookieParser());

// gzip compression
app.use(compression());

// Routes for api features
app.use("/api", apiRouter);

// Error handler middlewares
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;