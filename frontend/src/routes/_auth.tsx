import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context }) => {
    if (context.auth?.status === "AUTHENTICATED") {
      return redirect({ to: "/dashboard" })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
