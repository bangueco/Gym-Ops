import prisma from "@lib/prismaClient";
import { Membership, Prisma } from "@prisma/client";

const getMemberships = async (filter: Prisma.MembershipWhereInput | undefined, page: number | undefined, pageSize: number | undefined,) => {
  return await prisma.membership.findMany({
    skip: page && pageSize ? (page - 1) * pageSize : undefined,
    take: pageSize || undefined,
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

const createMembership = async (membershipName: string, membershipLength: number, createdBy: number, membershipFee: number) => {
  return await prisma.membership.create({data: {membershipName, membershipLength, createdBy, membershipFee}});
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