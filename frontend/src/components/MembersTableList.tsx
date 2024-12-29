"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function MembersTableList() {
  return (
    <Table className="border-2 border-gray-200 rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Birthdate</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Membership Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Justine Ivan</TableCell>
          <TableCell>Gueco</TableCell>
          <TableCell>bebecakes@gmail.com</TableCell>
          <TableCell>09/26/2002</TableCell>
          <TableCell>093121292912</TableCell>
          <TableCell>Monthly</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}