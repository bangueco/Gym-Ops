import { registerSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { createFileRoute, Link } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useRegisterMutation } from '@/api/auth-query'

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {

  const registerMutation = useRegisterMutation()

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const register = await registerMutation.mutateAsync(values)
      toast.success(register.data.message)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      } else {
        console.error(error)
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Sign up now to manage gym related operations!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your first name" />
                      </FormControl>
                      <FormMessage className="text-xs">
                        {form.formState.errors.firstName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter your first name" />
                      </FormControl>
                      <FormMessage className="text-xs">
                        {form.formState.errors.lastName?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage className="text-xs">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Enter your password again"
                        />
                      </FormControl>
                      <FormMessage className="text-xs">
                        {form.formState.errors.password?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <FormDescription className="flex flex-col justify-end items-end gap-3">
                <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
                  {form.formState.isSubmitting ? 'Registering...' : 'Register'}
                </Button>
              </FormDescription>
              <FormDescription className="text-center">
                <Link className="text-center" to="/login">
                  Already have account?
                </Link>
              </FormDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
