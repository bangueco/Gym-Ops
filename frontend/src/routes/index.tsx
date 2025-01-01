import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {

    let shouldRedirect = false

    if (context.auth.status === "PENDING") {
      try {
        await context.auth.ensureData()
      } catch {
        shouldRedirect = true
      }
    }

    if (context.auth.status === "AUTHENTICATED") {
      throw redirect({ to: "/dashboard" })
    }

    if (context.auth.status === "UNAUTHENTICATED") {
      shouldRedirect = true
    }

    if (shouldRedirect) {
      return redirect({ to: "/login" })
    }
  },
})
