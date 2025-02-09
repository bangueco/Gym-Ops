import { Membership, Prisma } from "@prisma/client";
import membershipRepository from "./membership.repository";
import { ApiError } from "@lib/utils/appError";

const getMemberships = async (filter: Prisma.MembershipWhereInput, page: number | undefined, pageSize: number | undefined) => {
  return await membershipRepository.getMemberships(filter, page, pageSize);
};

const getMembershipById = async (membershipId: number) => {
  return await membershipRepository.getMembershipById(membershipId);
};

const createMembership = async (membershipName: string, membershipLength: number, createdBy: number, membershipFee: number) => {
  return await membershipRepository.createMembership(membershipName, membershipLength, createdBy, membershipFee);
};

const updateMembership = async (membershipId: number, membershipData: Partial<Membership>) => {

  const membership = await membershipRepository.getMembershipById(membershipId);

  if (!membership) {
    throw new ApiError(404, "Membership not found!");
  }

  return await membershipRepository.updateMembership(membershipId, membershipData);
};

const deleteMembership = async (membershipId: number) => {
  const membership = await membershipRepository.getMembershipById(membershipId);

  if (!membership) {
    throw new ApiError(404, "Membership not found!");
  }

  return await membershipRepository.deleteMembership(membershipId);
};

export default {
  getMemberships, getMembershipById, createMembership, updateMembership, deleteMembership
};