import prisma from "@lib/prismaClient";
import { Membership, Prisma } from "@prisma/client";

const getMemberships = async (filter: Prisma.MembershipWhereInput) => {
  return await prisma.membership.findMany({
    where: filter,
    orderBy: {membershipId: "asc"},
    include: {
      members: true
    }
  });
};

const getMembershipById = async (membershipId: number) => {
  return await prisma.membership.findUnique({
    where: {
      membershipId
    }
  });
};

const createMembership = async (membershipName: string, membershipLength: number, createdBy: number) => {
  return await prisma.membership.create({data: {membershipName, membershipLength, createdBy}});
};

const updateMembership = async (membershipId: number, membershipData: Partial<Membership>) => {
  return await prisma.membership.update({where: {membershipId}, data: membershipData});
};

const deleteMembership = async (membershipId: number) => {
  return await prisma.membership.delete({where: {membershipId}});
};

export default {
  getMemberships, getMembershipById, createMembership, updateMembership, deleteMembership
};