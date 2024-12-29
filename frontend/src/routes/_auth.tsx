import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

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
      <Toaster />
    </>
  )
}
