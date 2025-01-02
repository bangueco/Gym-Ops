import prisma from "@lib/prismaClient";
import { Member } from "@prisma/client";

const getMembers = async () => {
  return await prisma.member.findMany();
};

const getMemberById = async (memberId: number) => {
  return await prisma.member.findUnique({ where: { memberId } });
};

const createMember = async (firstName: string, lastName: string, email: string, phoneNumber: string, membershipId: number) => {
  return await prisma.member.create({ data: { firstName, lastName, email, phoneNumber, membershipId } });
};

const updateMember = async (memberId: number, memberData: Partial<Member>) => {
  return await prisma.member.update({ where: { memberId }, data: memberData });
};

const deleteMember = async (memberId: number) => {
  return await prisma.member.delete({ where: { memberId } });
};

export default {
  getMembers, getMemberById, createMember, updateMember, deleteMember
};