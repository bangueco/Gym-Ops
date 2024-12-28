import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register } from "./auth.service";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthenticationResponse } from "@/types";

export function useLoginMutation() {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: LoginSchema) => {
      const response = await login(email, password)
      return await response.json() as AuthenticationResponse
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["login"], { user: data.user })
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
      const response = await register(firstName, lastName, email, password)
      return await response.json() as AuthenticationResponse
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["login"], { user: data.user })
      localStorage.setItem("token", data.token)
    },
    onError: () => {
      localStorage.removeItem("token")
    }
  })
}