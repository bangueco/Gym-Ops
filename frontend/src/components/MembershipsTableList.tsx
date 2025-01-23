import { useDeleteMembershipMutation, useUpdateMembershipMutation } from "@/api/membership-query"
import toast from "react-hot-toast";
import DropDownMenuAction from "./DropDownMenuAction";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { inputMembershipSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { router } from "@/router";
import { useAuthQuery } from "@/api/auth-query";
import { Membership } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./ui/data-table";

type MembershipsTableListProps = {
  memberships: Membership[] | undefined
}

export default function MembershipsTableList({ memberships }: MembershipsTableListProps) {

  const authQuery = useAuthQuery()
  const updateMembershipMutation = useUpdateMembershipMutation()
  const deleteMembershipMutation = useDeleteMembershipMutation()

  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [membershipId, setMembershipId] = useState<number>(0)

  const form = useForm<z.infer<typeof inputMembershipSchema>>({
    resolver: zodResolver(inputMembershipSchema),
    defaultValues: {
      createdBy: authQuery.data?.user.userId
    }
  })

  async function onSubmit(values: z.infer<typeof inputMembershipSchema>) {
    try {
      const { membershipName, membershipLength, membershipFee } = values
      console.log(values)
      const updateMembership = await updateMembershipMutation.mutateAsync({ membershipId, membershipName, membershipLength, createdBy: authQuery.data?.user.userId ?? 0, membershipFee })
      toast.success(updateMembership.message)
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

  const columns: ColumnDef<Membership>[] = [
    {
      accessorKey: "membershipName",
      header: "Membership Type"
    },
    {
      accessorKey: "membershipLength",
      header: "Membership Length"
    },
    {
      accessorKey: "membershipFee",
      header: "Membership Fee"
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropDownMenuAction
            editItem={() => {
              setMembershipId(row.original.membershipId)
              setEditDialogOpen(true)
              form.setValue('membershipName', row.original.membershipName)
              form.setValue('membershipLength', row.original.membershipLength)
              form.setValue('membershipFee', row.original.membershipFee)
            }}
            deleteItem={async () => {
              await deleteMembershipMutation.mutateAsync(row.original.membershipId)
              toast.success("Member deleted successfully")
            }}
          />
        )
      }
    }
  ]

  return (
    <>
      <DataTable columns={columns} data={memberships ?? []} />
      <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Membership</DialogTitle>
            <DialogDescription>
              Make changes to membership. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
              <div className="w-full flex flex-col gap-5 mb-10">
                <FormField
                  control={form.control}
                  name="membershipName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter membership name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="membershipLength"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Length</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter membership length"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="membershipFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Membership Fee</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter membership cost"
                          {...field}
                        />
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