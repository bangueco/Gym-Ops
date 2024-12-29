import { authQueryOptions, useAuthQuery } from "@/api/auth-query";
import { router } from "@/router";
import { User } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type AuthState =
  | { user: null; status: 'PENDING' }
  | { user: null; status: 'UNAUTHENTICATED' }
  | { user: User; status: 'AUTHENTICATED' }

type AuthAction = {
  login: () => void
  logout: () => void
  ensureData: () => Promise<User | undefined>
}

export type AuthContext = AuthState & AuthAction

export function useAuth(): AuthContext {
  const authQuery = useAuthQuery()
  const queryClient = useQueryClient()

  useEffect(() => {
    router.invalidate()
  }, [authQuery.data])

  useEffect(() => {
    if (authQuery.error === null) return
    queryClient.setQueryData(["auth"], null)
  }, [authQuery.error, queryClient])

  const actions = {
    login: () => {
      router.navigate({ to: "/dashboard" })
    },
    logout: () => {
      queryClient.setQueryData(["auth"], null)
      localStorage.removeItem('token')
      router.navigate({ to: "/login" })
    },
    ensureData: async () => {
      return await queryClient.ensureQueryData(authQueryOptions())
    }
  }

  switch (true) {
    case authQuery.isPending:
      return { ...actions, user: null, status: 'PENDING' }
    case !authQuery.data:
      return { ...actions, user: null, status: "UNAUTHENTICATED" }
    default:
      return { ...actions, user: authQuery.data.user, status: "AUTHENTICATED" }
  }
}