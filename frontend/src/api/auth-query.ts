import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthenticationResponse, User } from "@/types";
import authAxios from "@/lib/axios";

function useAuthQueryOptions() {
  return queryOptions({
    queryKey: ["auth"],
    queryFn: async () => {
      return (await authAxios.get("/auth")).data.user as User
    }
  })
}

export function useAuthQuery() {
  return useQuery(useAuthQueryOptions())
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