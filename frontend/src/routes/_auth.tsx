import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from 'react-hot-toast'

export const Route = createFileRoute('/_auth')({
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
