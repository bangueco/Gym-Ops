import { ApiError, ValidationError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import logger from "@lib/utils/logger";
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";

const handleZodError = (error: ZodError) => {
  const validationError = error.issues.map((issue: ZodIssue) => {
    switch (issue.code) {
    case "invalid_type":
    case "invalid_literal":
    case "unrecognized_keys":
    case "invalid_union":
    case "invalid_union_discriminator":
    case "invalid_enum_value":
    case "invalid_arguments":
    case "invalid_return_type":
    case "invalid_date":
    case "invalid_string":
    case "too_small":
    case "too_big":
    case "invalid_intersection_types":
    case "not_multiple_of":
    case "not_finite":
    case "custom":
      return {field: issue.path[0], message: issue.message};
    default:
      logger.warn("Unhandled Zod issue code");
      return undefined;
    }
  });

  return validationError;
};

const errorHandler = (error: unknown, _request: Request, response: Response, next: NextFunction): void => {

  if (error instanceof ApiError) {
    response.status(error.status).json({message: error.message});
    return;
  } else if (error instanceof ValidationError) {
    response.status(error.status).json({
      field: error.field,
      message: error.message
    });
    return;
  } else if (error instanceof ZodError) {
    const zodError = handleZodError(error);
    response.status(httpStatusCode.BAD_REQUEST).json(zodError);
    return;
  }

  return next(error);
};

export default errorHandler;