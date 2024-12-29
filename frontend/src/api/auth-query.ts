import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { AuthenticationResponse } from "@/types";
import axios from "axios"
import baseURL from "./baseURL";

function useAuthQueryOptions() {

  const queryClient = useQueryClient()

  return queryOptions({
    queryKey: ["auth"],
    queryFn: async () => {
      const token = localStorage.getItem("token")
      if (!token) return { user: null }
      const response = await axios.get(`${baseURL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 401) {
        localStorage.removeItem("token")
        return { user: null }
      }
      return queryClient.setQueryData(["auth"], { user: response.data.user })
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
      return await axios.post(`${baseURL}/auth/login`, { email, password })
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
      return await axios.post(`${baseURL}/auth/register`, { firstName, lastName, email, password })
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