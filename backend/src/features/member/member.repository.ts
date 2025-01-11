import prisma from "@lib/prismaClient";
import { Member, Prisma } from "@prisma/client";

const getMembers = async (filter: Prisma.MemberWhereInput | undefined) => {
  return await prisma.member.findMany({
    where: filter,
    orderBy: {memberId: "asc"}
  });
};

const getMemberById = async (memberId: number) => {
  return await prisma.member.findUnique({ where: { memberId } });
};

const getMemberByEmail = async (email: string) => {
  return await prisma.member.findFirst({ where: { email } });
};

const createMember = async (firstName: string, lastName: string, email: string, phoneNumber: string,
  membershipId: number | null, membershipStart: Date | null, membershipEnd: Date | null, createdBy: number
) => {
  return await prisma.member.create({data: {
    firstName, lastName, email, phoneNumber, membershipId, membershipStart, membershipEnd, createdBy
  }});
};

const updateMember = async (memberId: number, memberData: Partial<Member>) => {
  return await prisma.member.update({ where: { memberId }, data: memberData });
};

const deleteMember = async (memberId: number) => {
  return await prisma.member.delete({ where: { memberId } });
};

export default {
  getMembers, getMemberById, getMemberByEmail, createMember, updateMember, deleteMember
};