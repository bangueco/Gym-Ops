import { useDeleteMembershipMutation, useMembershipQuery, useUpdateMembershipMutation } from "@/api/membership-query"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

export default function MembershipsTableList() {

  const authQuery = useAuthQuery()
  const updateMembershipMutation = useUpdateMembershipMutation()
  const deleteMembershipMutation = useDeleteMembershipMutation()
  const { data, error, isLoading } = useMembershipQuery(authQuery.data?.user.userId)

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

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <Table className="border-2 border-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Membership Type</TableHead>
            <TableHead>Membership Length</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data && data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">No membership found</TableCell>
              </TableRow>
            ) : (
              data?.map((membership) => (
                <TableRow key={membership.membershipId}>
                  <TableCell>{membership.membershipName}</TableCell>
                  <TableCell>{membership.membershipLength}</TableCell>
                  <TableCell>
                    <DropDownMenuAction
                      editItem={() => {
                        setMembershipId(membership.membershipId)
                        setEditDialogOpen(true)
                        form.setValue('membershipName', membership.membershipName)
                        form.setValue('membershipLength', membership.membershipLength)
                      }}
                      deleteItem={async () => {
                        await deleteMembershipMutation.mutateAsync(membership.membershipId)
                        toast.success("Membership deleted successfully")
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