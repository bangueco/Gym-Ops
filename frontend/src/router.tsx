import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

import { AuthContext } from '@/hooks/useAuth'

export const router = createRouter({
  routeTree,
  context: {
    auth: null as unknown as AuthContext,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}