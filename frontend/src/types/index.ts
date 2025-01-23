export type User = {
  userId: number
  firstName: string
  lastName: string
  email: string
}

export type Member = {
  memberId: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  membershipId?: number
  membershipStart?: Date
  membershipEnd?: Date
  createdBy: number
}

export type Membership = {
  membershipId: number
  membershipName: string
  membershipLength: number
  membershipFee: number
  createdBy: number
  members?: Member[]
}

export type AuthenticationResponse = {
  message: string
  user: User
  token: string
}

export type AuthenticatedUserResponse = {
  message: string
  user: User
}

export type MembersResponse = {
  totalMembers: number
  members: Member[]
  hasNextPage: boolean
}

export type MemberResponse = {
  message: string
  member: Member
}

export type MembershipResponse = {
  message: string
  membership: Membership
}