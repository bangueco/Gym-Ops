import { ApiError } from "@lib/utils/appError";
import memberRepository from "./member.repository";
import { Member } from "@prisma/client";

const getMembers = async () => {
  return await memberRepository.getMembers();
};

const getMemberById = async (memberId: number) => {
  return await memberRepository.getMemberById(memberId);
};

const createMember = async (firstName: string, lastName: string, email: string, phoneNumber: string, membershipId: number) => {
  return await memberRepository.createMember(firstName, lastName, email, phoneNumber, membershipId);
};

const updateMember = async (memberId: number, memberData: Partial<Member>) => {
  const member = await memberRepository.getMemberById(memberId);

  if (!member) {
    throw new ApiError(404, "Member not found!");
  }

  return await memberRepository.updateMember(memberId, memberData);
};

const deleteMember = async (memberId: number) => {
  const member = await memberRepository.getMemberById(memberId);

  if (!member) {
    throw new ApiError(404, "Member not found!");
  }

  return await memberRepository.deleteMember(memberId);
};

export default {
  getMembers, getMemberById, createMember, updateMember, deleteMember
};