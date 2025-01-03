export type User = {
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
}

export type Membership = {
  membershipId: number
  membershipName: string
  membershipLength: number
}

export type AuthenticationResponse = {
  message: string
  user: User
  token: string
}

export type MemberResponse = {
  message: string
  member: Member
}

export type MembershipResponse = {
  message: string
  membership: Membership
}