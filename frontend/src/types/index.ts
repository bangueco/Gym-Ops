export type User = {
  firstName: string
  lastName: string
  email: string
}

export type AuthenticationResponse = {
  message: string
  user: User
  token: string
}