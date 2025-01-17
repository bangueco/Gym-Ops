import memberService from "./member.service";
import { NextFunction, Request, Response } from "express";

const getAllMembers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { createdBy, page, pageSize, descending } = request.query;
    const members = await memberService.getMembers(
      {createdBy: createdBy ? parseInt(createdBy as string) : undefined},
      page ? parseInt(page as string) : undefined,
      pageSize ? parseInt(pageSize as string) : undefined,
      descending === "true"
    );
    const membersSecondPage = await memberService.getMembers(
      {createdBy: createdBy ? parseInt(createdBy as string) : undefined},
      page ? parseInt(page as string) + 1 : undefined,
      pageSize ? parseInt(pageSize as string) : undefined,
      descending === "true"
    );

    response.status(200).json({
      members,
      hasNextPage: membersSecondPage.length > 0
    });
  } catch (error) {
    next(error);
  }
};

const getMemberById = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    const member = await memberService.getMemberById(parseInt(memberId));
    response.status(200).json(member);
  } catch (error) {
    next(error);
  }
};

const createMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, phoneNumber, membershipId, createdBy } = request.body;
    const member = await memberService.createMember(firstName, lastName, email, phoneNumber, membershipId, createdBy);
    response.status(201).json({ message: "Member created successfully", member });
  } catch (error) {
    next(error);
  }
};

const updateMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    const { firstName, lastName, email, phoneNumber, membershipId } = request.body;

    const member = await memberService.updateMember(parseInt(memberId), { firstName, lastName, email, phoneNumber, membershipId });
    response.status(200).json({ message: "Member updated successfully", member });
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { memberId } = request.params;
    await memberService.deleteMember(parseInt(memberId));
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getAllMembers, getMemberById, createMember, updateMember, deleteMember
};