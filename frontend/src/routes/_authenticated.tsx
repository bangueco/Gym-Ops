import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {

    let shouldRedirect = false

    if (context.auth.status === "PENDING") {
      try {
        await context.auth.ensureData()
      } catch {
        shouldRedirect = true
      }
    }

    if (context.auth.status === "UNAUTHENTICATED") {
      shouldRedirect = true
    }

    if (shouldRedirect) {
      return redirect({ to: "/login" })
    }
  },
  component: AuthDashboardLayout,
})

function AuthDashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
