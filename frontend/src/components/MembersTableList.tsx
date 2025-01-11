import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDeleteMemberMutation, useMemberQuery, useUpdateMemberMutation } from "@/api/member-query"
import { useMembershipQuery } from "@/api/membership-query"
import DropDownMenuAction from "./DropDownMenuAction"
import toast from "react-hot-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { inputMemberSchema } from "@/schemas"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { router } from "@/router"
import { useAuthQuery } from "@/api/auth-query"

export default function MembersTableList() {

  const authQuery = useAuthQuery()
  const memberQuery = useMemberQuery()
  const membershipQuery = useMembershipQuery()
  const updateMemberMutation = useUpdateMemberMutation()
  const deleteMemberMutation = useDeleteMemberMutation()

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [memberId, setMemberId] = useState<number>(0)

  const getMembershipName = (membershipId: number) => {
    const membership = membershipQuery.data?.find((membership) => membership.membershipId === membershipId)
    return membership?.membershipName ?? "Expired"
  }

  const form = useForm<z.infer<typeof inputMemberSchema>>({
    resolver: zodResolver(inputMemberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      membershipId: undefined,
      createdBy: authQuery.data?.user.userId
    },
  })

  async function onSubmit(values: z.infer<typeof inputMemberSchema>) {
    try {
      const updateMember = await updateMemberMutation.mutateAsync({
        memberId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        membershipId: parseInt(values.membershipId),
        createdBy: authQuery.data?.user.userId
      })
      toast.success(updateMember.message)
      form.reset()
      router.invalidate()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <>
      <Table className="border-2 border-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Membership Status</TableHead>
            <TableHead>Membership Start</TableHead>
            <TableHead>Membership End</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            memberQuery.data && memberQuery.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">No members found</TableCell>
              </TableRow>
            ) : (
              memberQuery.data?.map((member) => (
                <TableRow key={member.memberId}>
                  <TableCell>{member.firstName}</TableCell>
                  <TableCell>{member.lastName}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.phoneNumber}</TableCell>
                  <TableCell>
                    {
                      member.membershipId ? (getMembershipName(member.membershipId)) : "Inactive"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      member.membershipStart ? (new Date(member.membershipStart).toLocaleDateString()) : "N/A"
                    }
                  </TableCell>
                  <TableCell>
                    {
                      member.membershipEnd ? (new Date(member.membershipEnd).toLocaleDateString()) : "N/A"
                    }
                  </TableCell>
                  <TableCell>
                    <DropDownMenuAction
                      editItem={() => {
                        setEditDialogOpen(true)
                        setMemberId(member.memberId)
                        form.setValue('firstName', member.firstName)
                        form.setValue('lastName', member.lastName)
                        form.setValue('email', member.email)
                        form.setValue('phoneNumber', member.phoneNumber)
                        form.setValue('membershipId', member.membershipId?.toString() || "0")
                      }}
                      deleteItem={async () => {
                        await deleteMemberMutation.mutateAsync(member.memberId)
                        toast.success("Member deleted successfully")
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )
          }
        </TableBody>
      </Table>
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Make changes to a member. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
              <div className="w-full flex flex-col gap-5 mb-10">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-3 items-center justify-center">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter phone number" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="membershipId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Status</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="w-[250px]">
                            {
                              membershipQuery.isLoading && <SelectValue placeholder="Loading" />
                            }
                            {
                              membershipQuery.isError && <SelectValue placeholder="Error fetching data" />
                            }
                            {
                              !membershipQuery.isLoading && !membershipQuery.isError && <SelectValue placeholder="Select status" />
                            }
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">
                              Inactive
                            </SelectItem>
                            {
                              membershipQuery.data?.map((membership) => (
                                <SelectItem key={membership.membershipId} value={membership.membershipId.toString()}>
                                  {membership.membershipName}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button type="reset" onClick={() => {
                  setEditDialogOpen(false)
                  form.reset()
                }}>
                  Cancel
                </Button>
                <Button type="submit" onClick={() => setEditDialogOpen(false)}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}