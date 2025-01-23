import { useAuthQuery } from '@/api/auth-query'
import { useMembershipQuery } from '@/api/membership-query'
import InputMembershipForm from '@/components/Forms/InputMembershipForm'
import MembershipsTableList from '@/components/MembershipsTableList'
import { Button } from '@/components/ui/button'
import useNavigateTablePage from '@/hooks/useNavigateTablePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/manage-memberships/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { page, onPressPreviousPage, onPressNextPage } = useNavigateTablePage();
  const authQuery = useAuthQuery()
  const membershipQuery = useMembershipQuery(authQuery.data?.user.userId)

  return (
    <div>
      <h1 className="text-4xl mb-6">Manage Membership</h1>
      <InputMembershipForm />
      <h1 className="text-lg mb-6 mt-12">Membership&apos;s List</h1>
      <MembershipsTableList memberships={membershipQuery.data ?? []} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onPressPreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onPressNextPage}
        // disabled={memberQuery.data?.hasNextPage === false}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
