import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (context.auth.status === 'UNAUTHENTICATED') {
      throw redirect({ to: '/login' })
    }
  },
  component: AuthenticatedDashboardLayout,
})

function AuthenticatedDashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
