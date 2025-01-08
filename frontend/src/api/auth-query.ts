import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthenticatedUserResponse, AuthenticationResponse } from "@/types";
import authAxios from "@/lib/axios";

export function authQueryOptions() {
  return queryOptions({
    queryKey: ["auth"],
    queryFn: async () => (await authAxios.get("/auth")).data as AuthenticatedUserResponse,
  })
}

export function useAuthQuery() {
  return useQuery(authQueryOptions())
}

export function useLoginMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginSchema) => {
      return (await authAxios.post('/auth/login', { email, password })).data as AuthenticationResponse
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], { user: data.user })
      localStorage.setItem("token", data.token)
    },
    onError: () => {
      localStorage.removeItem("token")
    }
  })
}

export function useRegisterMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ firstName, lastName, email, password }: RegisterSchema) => {
      return (await authAxios.post('/auth/register', { firstName, lastName, email, password })).data as AuthenticationResponse
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth"], { user: data.user })
      localStorage.setItem("token", data.token)
    },
    onError: () => {
      localStorage.removeItem("token")
    }
  })
}

export function useLogoutMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return await authAxios.post('/auth/logout')
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null)
      localStorage.removeItem("token")
    }
  })
}