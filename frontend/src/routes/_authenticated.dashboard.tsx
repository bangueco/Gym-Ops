import { useAuthQuery } from '@/api/auth-query'
import { useRecentMemberQuery } from '@/api/member-query'
import { useMembershipQuery } from '@/api/membership-query'
import MembersTableList from '@/components/MembersTableList'
import { Button } from '@/components/ui/button'
import useNavigateTablePage from '@/hooks/useNavigateTablePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {

  const { page, onPressPreviousPage, onPressNextPage } = useNavigateTablePage();
  const authQuery = useAuthQuery()
  const memberQuery = useRecentMemberQuery(authQuery.data?.user.userId, page, 3)
  const membershipQuery = useMembershipQuery(authQuery.data?.user.userId)

  return (
    <div>
      <h1 className="text-4xl mb-12">Dashboard</h1>
      <div className="flex gap-3">
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">TOTAL MEMBERS</h1>
          <p>{memberQuery.data?.totalMembers ?? 0}</p>
        </div>
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">ACTIVE MEMBERSHIPS</h1>
          <p>{membershipQuery.data?.reduce((count, membership) => count + membership.members.length, 0)}</p>
        </div>
        <div className="p-3 border-primary border-2 rounded-md w-60">
          <h1 className="text-md font-extrabold">TOTAL REVENUE</h1>
          <p>₱12,500</p>
        </div>
      </div>
      <div className="mt-12">
        <h1>Recent members</h1>
        <MembersTableList members={memberQuery.data?.members} />
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
            disabled={memberQuery.data?.hasNextPage === false}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="mt-12">
        <h1>Expiring memberships</h1>
      </div>
    </div>
  )
}