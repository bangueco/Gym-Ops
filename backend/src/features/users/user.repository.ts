import prisma from "@lib/prismaClient";
import { User } from "@prisma/client";

const getUsers = async (): Promise<Array<User> | null> => {
  return await prisma.user.findMany();
};

const getUserById = async (userId: number): Promise<User | null> => {
  return await prisma.user.findUnique({where: {userId}});
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({where: {email}});
};

const createUser = async (firstName: string, lastName: string, email: string, password: string ): Promise<User> => {
  return await prisma.user.create({data: {
    firstName,
    lastName,
    email,
    password
  }});
};

const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  return await prisma.user.update({
    data: userData,
    where: {userId}
  });
};

const deleteUser = async (userId: number) => {
  return await prisma.user.delete({where: {userId}});
};

const deleteUsers = async () => {
  return await prisma.user.deleteMany();
};

export default {
  getUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, deleteUsers
};