import httpStatusCode from "@lib/utils/httpStatusCode";
import { NextFunction, Request, Response } from "express";

const unknownEndpoint = (_request: Request, response: Response, next: NextFunction) => {
  response.status(httpStatusCode.NOT_FOUND).json({message: "Unknown endpoint."});
  return next();
};

export default unknownEndpoint;