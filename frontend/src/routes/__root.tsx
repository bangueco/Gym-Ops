import { AuthState } from '@/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

interface IAuthContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<IAuthContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})