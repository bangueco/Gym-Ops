import { useAuthQuery } from '@/api/auth-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data, isPending, isError } = useAuthQuery()

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error...</span>
  }

  return <div>Hello {data?.firstName}</div>
}
