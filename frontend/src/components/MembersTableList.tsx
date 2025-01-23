import { useDeleteMemberMutation, useUpdateMemberMutation } from "@/api/member-query"
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
import { ColumnDef } from "@tanstack/react-table"
import { Member } from "@/types"
import { DataTable } from "./ui/data-table"

type MembersTableListProps = {
  members: Member[] | undefined
}

export default function MembersTableList({ members }: MembersTableListProps) {

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [memberId, setMemberId] = useState<number>(0)

  const authQuery = useAuthQuery()
  // const memberQuery = useMemberQuery(authQuery.data?.user.userId, page, 10)
  const membershipQuery = useMembershipQuery(authQuery.data?.user.userId)
  const updateMemberMutation = useUpdateMemberMutation()
  const deleteMemberMutation = useDeleteMemberMutation()

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

  const columns: ColumnDef<Member>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
    },
    {
      accessorKey: "membershipId",
      header: "Membership Status",
      cell: ({ row }) => {
        const membership = membershipQuery.data?.find(m => m.membershipId === row.getValue("membershipId"))

        return <div>{membership?.membershipName ?? "Inactive"}</div>
      }
    },
    {
      accessorKey: "membershipStart",
      header: "Membership Start",
      cell: ({ row }) => {
        const membershipStart: Date = row.getValue("membershipStart")

        return <div>{membershipStart ? (new Date(membershipStart).toLocaleDateString()) : "N/A"}</div>
      }
    },
    {
      accessorKey: "membershipEnd",
      header: "Membership End",
      cell: ({ row }) => {
        const membershipEnd: Date = row.getValue("membershipEnd")

        return <div>{membershipEnd ? (new Date(membershipEnd).toLocaleDateString()) : "N/A"}</div>
      }
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropDownMenuAction
            editItem={() => {
              setMemberId(row.original.memberId)
              setEditDialogOpen(true)
              form.setValue('firstName', row.original.firstName)
              form.setValue('lastName', row.original.lastName)
              form.setValue('email', row.original.email)
              form.setValue('phoneNumber', row.original.phoneNumber)
              form.setValue('membershipId', row.original.membershipId?.toString() || "0")
            }}
            deleteItem={async () => {
              await deleteMemberMutation.mutateAsync(row.original.memberId)
              toast.success("Member deleted successfully")
            }}
          />
        )
      }
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={members ?? []} />
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
    </div>
  )
}