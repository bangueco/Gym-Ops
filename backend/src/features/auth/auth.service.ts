import jwt from "@lib/jwt";
import { ApiError } from "@lib/utils/appError";
import httpStatusCode from "@lib/utils/httpStatusCode";
import bcrypt from "@lib/bcrypt";
import { userService } from "@features/users";

const register = async (firstName: string, lastName: string,
  email: string, password: string
) => {

  const newUser = await userService.createUser(firstName, lastName, email, password);
  const accessToken = jwt.generateAccessToken(newUser.userId, newUser.firstName, newUser.lastName, newUser.email);
  const refreshToken = jwt.generateRefreshToken(newUser.userId, newUser.firstName, newUser.lastName, newUser.email);

  return {
    user: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    },
    accessToken,
    refreshToken
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

  const accessToken = jwt.generateAccessToken(existingUser.userId, existingUser.firstName, existingUser.lastName, existingUser.email);
  const refreshToken = jwt.generateRefreshToken(existingUser.userId, existingUser.firstName, existingUser.lastName, existingUser.email);

  return {
    user: {
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email
    },
    accessToken,
    refreshToken
  };
};

export default {
  register, login
};