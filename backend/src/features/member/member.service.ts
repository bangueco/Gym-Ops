import { ApiError } from "@lib/utils/appError";
import memberRepository from "./member.repository";
import { Member, Prisma } from "@prisma/client";
import { membershipRepository, membershipService } from "@features/membership";

const getMembers = async (filter: Prisma.MemberWhereInput, page: number | undefined, pageSize: number | undefined, descending: boolean | undefined) => {
  return await memberRepository.getMembers(filter, page, pageSize, descending);
};

const getMemberById = async (memberId: number) => {
  return await memberRepository.getMemberById(memberId);
};

const createMember = async (firstName: string, lastName: string, email: string, phoneNumber: string, membershipId: number, createdBy: number) => {

  const emailExists = await memberRepository.getMemberByEmail(email);

  if (emailExists) {
    throw new ApiError(400, "Email already exists!");
  }

  if (membershipId === 0) {
    return await memberRepository.createMember(firstName, lastName, email, phoneNumber, null, null, null, createdBy);
  }

  const membership = await membershipService.getMembershipById(membershipId);

  if (!membership) {
    throw new ApiError(404, "Membership not found!");
  }

  const membershipStart = new Date();
  const membershipEnd = new Date();
  membershipEnd.setDate(membershipStart.getDate() + membership.membershipLength + 1);

  return await memberRepository.createMember(firstName, lastName, email, phoneNumber, membershipId, membershipStart, membershipEnd, createdBy);
};

const updateMember = async (memberId: number, memberData: Partial<Member>) => {
  const member = await memberRepository.getMemberById(memberId);

  if (!member) {
    throw new ApiError(404, "Member not found!");
  }

  if (memberData.email) {
    const emailExists = await memberRepository.getMemberByEmail(memberData.email);

    if (emailExists && emailExists.memberId !== memberId) {
      throw new ApiError(400, "Email already exists!");
    }

  }

  if (memberData.membershipId === 0) {
    return await memberRepository.updateMember(memberId, {...memberData, membershipId: null, membershipStart: null, membershipEnd: null});
  }

  if (!memberData.membershipId) {
    throw new ApiError(404, "Membership not defined!");
  }

  const membership = await membershipRepository.getMembershipById(memberData.membershipId);

  if (!membership) {
    throw new ApiError(404, "Membership not found!");
  }

  if (memberData.membershipId === membership.membershipId) {
    return await memberRepository.updateMember(memberId, memberData);
  }

  const membershipStart = new Date();
  const membershipEnd = new Date();
  membershipEnd.setDate(membershipStart.getDate() + membership.membershipLength + 1);

  memberData.membershipStart = membershipStart;
  memberData.membershipEnd = membershipEnd;

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