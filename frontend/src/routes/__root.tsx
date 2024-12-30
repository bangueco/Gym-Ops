import { AuthContext } from '@/hooks/useAuth'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from 'react-hot-toast'

interface IAuthContext {
  auth: AuthContext
}

export const Route = createRootRouteWithContext<IAuthContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
})