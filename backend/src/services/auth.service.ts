import jwt from "@lib/jwt";
import userService from "./user.service";
import { ApiError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import bcrypt from "@lib/bcrypt";

const register = async (firstName: string, lastName: string,
  email: string, password: string
) => {

  const newUser = await userService.createUser(firstName, lastName, email, password);
  const accessToken = jwt.generateAccessToken(newUser.userId);

  return {
    user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    },
    accessToken
  };
};

const login = async (email: string, password: string) => {

  const existingUser = await userService.findByEmail(email);

  if (!existingUser) {
    throw new ApiError(httpStatusCode.BAD_REQUEST, "Invalid email or password.");
  }

  const passwordMatch = bcrypt.comparePassword(password, existingUser.password);

  if (!passwordMatch) {
    throw new ApiError(httpStatusCode.BAD_REQUEST, "Invalid email or password");
  }

  const accessToken = jwt.generateAccessToken(existingUser.userId);

  return {
    user: {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email
    },
    accessToken
  };
};

export default {
  register, login
};