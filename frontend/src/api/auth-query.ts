import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthenticationResponse } from "@/types";
import authAxios from "@/lib/axios";

export function authQueryOptions() {
  return queryOptions({
    queryKey: ["auth"],
    queryFn: async () => (await authAxios.get("/auth")).data,
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
      return await authAxios.post("/auth/login", { email, password })
    },
    onSuccess: (response) => {
      const data = response.data as AuthenticationResponse
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
      return await authAxios.post('/auth/register', { firstName, lastName, email, password })
    },
    onSuccess: (response) => {
      const data = response.data as AuthenticationResponse
      queryClient.setQueryData(["auth"], { user: data.user })
      localStorage.setItem("token", data.token)
    },
    onError: () => {
      localStorage.removeItem("token")
    }
  })
}