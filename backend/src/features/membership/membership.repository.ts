import prisma from "@lib/prismaClient";
import { Membership } from "@prisma/client";

const getMemberships = async () => {
  return await prisma.membership.findMany();
};

const getMembershipById = async (membershipId: number) => {
  return await prisma.membership.findUnique({
    where: {
      membershipId
    }
  });
};

const createMembership = async (membershipName: string, membershipLength: number) => {
  return await prisma.membership.create({data: {membershipName, membershipLength}});
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