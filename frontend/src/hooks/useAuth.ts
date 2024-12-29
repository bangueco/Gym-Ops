import { useAuthQuery } from "@/api/auth-query";
import { router } from "@/router";
import { User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export type AuthState =
  | { user: null; status: 'PENDING' }
  | { user: null; status: 'UNAUTHENTICATED' }
  | { user: User; status: 'AUTHENTICATED' }

type AuthAction = {
  login: () => void
  logout: () => void
}

export type AuthContext = AuthState & AuthAction

export function useAuth(): AuthContext {
  const authQuery = useAuthQuery()
  const queryClient = useQueryClient()

  useEffect(() => {
    router.invalidate()
  }, [authQuery.data])

  useEffect(() => {
    if (authQuery.error) {
      queryClient.setQueryData(["auth"], null)
      localStorage.removeItem('token')
    }
  }, [authQuery.error, queryClient])

  const actions = {
    login: () => {
      router.invalidate()
    },
    logout: () => {
      queryClient.setQueryData(["auth"], null)
      localStorage.removeItem('token')
      router.invalidate()
      router.navigate({ to: "/login" })
    }
  }

  switch (true) {
    case authQuery.isPending:
      return { ...actions, user: null, status: 'PENDING' }
    case !authQuery.data:
      return { ...actions, user: null, status: 'UNAUTHENTICATED' }
    default:
      return { ...actions, user: authQuery.data, status: "AUTHENTICATED" }
  }
}