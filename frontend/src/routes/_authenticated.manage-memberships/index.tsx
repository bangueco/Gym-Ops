import InputMembershipForm from '@/components/Forms/InputMembershipForm'
import MembershipsTableList from '@/components/MembershipsTableList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/manage-memberships/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-4xl mb-6">Manage Membership</h1>
      <InputMembershipForm />
      <h1 className="text-lg mb-6 mt-12">Membership&apos;s List</h1>
      <MembershipsTableList />
    </div>
  )
}
