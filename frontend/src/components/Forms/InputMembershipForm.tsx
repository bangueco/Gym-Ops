import { inputMembershipSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useAddMembershipMutation } from "@/api/membership-query"
import { router } from "@/router"
import { useAuthQuery } from "@/api/auth-query"

export default function InputMembershipForm() {

  const addMembershipMutation = useAddMembershipMutation()
  const authQuery = useAuthQuery()

  const form = useForm<z.infer<typeof inputMembershipSchema>>({
    resolver: zodResolver(inputMembershipSchema),
    defaultValues: {
      membershipName: "",
      membershipLength: 0,
      createdBy: authQuery.data?.user.userId
    },
  })

  async function onSubmit(values: z.infer<typeof inputMembershipSchema>) {
    try {
      const { membershipName, membershipLength } = values
      const addMembership = await addMembershipMutation.mutateAsync({ membershipName, membershipLength, createdBy: authQuery.data?.user.userId ?? 0 })
      toast.success(addMembership.message)
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        <div className="w-full grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="membershipName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Membership Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter membership name" {...field} />
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
                  <Input type="number" placeholder="Enter membership length" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Add Membership</Button>
      </form>
    </Form>
  )
}