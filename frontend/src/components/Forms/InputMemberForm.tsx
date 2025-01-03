import { inputMemberSchema } from "@/schemas"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddMemberMutation } from "@/api/member-query"
import toast from "react-hot-toast"
import { AxiosError } from "axios"
import { useMembershipQuery } from "@/api/membership-query"
import { router } from "@/router"

export default function InputMemberForm() {

  const addMemberMutation = useAddMemberMutation()
  const { data, isLoading, isError } = useMembershipQuery()

  const form = useForm<z.infer<typeof inputMemberSchema>>({
    resolver: zodResolver(inputMemberSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      membershipId: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof inputMemberSchema>) {
    try {
      const addMember = await addMemberMutation.mutateAsync(values)
      toast.success(addMember.message)
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
                        isLoading && <SelectValue placeholder="Loading" />
                      }
                      {
                        isError && <SelectValue placeholder="Error fetching data" />
                      }
                      {
                        !isLoading && !isError && <SelectValue placeholder="Select status" />
                      }
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">
                        Inactive
                      </SelectItem>
                      {
                        data?.map((membership) => (
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
        <Button type="submit">Add Member</Button>
      </form>
    </Form>
  )
}