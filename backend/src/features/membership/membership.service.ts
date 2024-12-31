import { Membership } from "@prisma/client";
import membershipRepository from "./membership.repository";
import { ApiError } from "@lib/utils/appError";

const getMemberships = async () => {
  return await membershipRepository.getMemberships();
};

const getMembershipById = async (membershipId: number) => {
  return await membershipRepository.getMembershipById(membershipId);
};

const createMembership = async (membershipName: string, membershipLength: number) => {
  return await membershipRepository.createMembership(membershipName, membershipLength);
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