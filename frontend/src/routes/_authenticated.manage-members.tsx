import { useAuthQuery } from '@/api/auth-query';
import { useMemberQuery } from '@/api/member-query';
import InputMemberForm from '@/components/Forms/InputMemberForm'
import MembersTableList from '@/components/MembersTableList'
import { Button } from '@/components/ui/button';
import useNavigateTablePage from '@/hooks/useNavigateTablePage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/manage-members')({
  component: ManageMembers,
})

function ManageMembers() {

  const { page, onPressPreviousPage, onPressNextPage } = useNavigateTablePage();
  const authQuery = useAuthQuery();
  const memberQuery = useMemberQuery(authQuery.data?.user.userId, page, 10)

  return (
    <div>
      <h1 className="text-4xl mb-6">Manage Members</h1>
      <InputMemberForm />
      <h1 className="text-lg mt-8">Member&apos;s List</h1>
      <MembersTableList members={memberQuery.data?.members || undefined} />
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
  )
}
