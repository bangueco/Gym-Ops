import InputMemberForm from '@/components/Forms/InputMemberForm'
import MembersTableList from '@/components/MembersTableList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/manage-members')({
  component: ManageMembers,
})

function ManageMembers() {
  return (
    <div>
      <h1 className="text-4xl mb-6">Manage Members</h1>
      <InputMemberForm />
      <h1 className="text-lg mt-8">Member&apos;s List</h1>
      <MembersTableList />
    </div>
  )
}
