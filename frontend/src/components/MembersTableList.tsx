import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMemberQuery } from "@/api/member-query"
import { useMembershipQuery } from "@/api/membership-query"

export default function MembersTableList() {

  const memberQuery = useMemberQuery()
  const membershipQuery = useMembershipQuery()

  const getMembershipName = (membershipId: number) => {
    const membership = membershipQuery.data?.find((membership) => membership.membershipId === membershipId)
    return membership?.membershipName
  }

  return (
    <Table className="border-2 border-gray-200 rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Membership Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          memberQuery.data && memberQuery.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4">No membership found</TableCell>
            </TableRow>
          ) : (
            memberQuery.data?.map((member) => (
              <TableRow key={member.membershipId}>
                <TableCell>{member.firstName}</TableCell>
                <TableCell>{member.lastName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phoneNumber}</TableCell>
                <TableCell>{getMembershipName(member.membershipId)}</TableCell>
              </TableRow>
            ))
          )
        }
      </TableBody>
    </Table>
  )
}