import { createFileRoute, Link } from '@tanstack/react-router'

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
import { loginSchema } from '@/schemas'

import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useLoginMutation } from '@/api/auth-query'
import { useAuth } from '@/hooks/useAuth'

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

function LoginPage() {

  const loginMutation = useLoginMutation()
  const auth = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const login = await loginMutation.mutateAsync(values)
      toast.success(login.data.message)
      auth.login()
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
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in now to manage gym related operations!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormDescription className="flex flex-col justify-end items-end gap-3">
                <Link>Forgot password?</Link>
                <Button disabled={form.formState.isSubmitting} className="w-full" type="submit">
                  {form.formState.isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
              </FormDescription>
              <FormDescription className="text-center">
                <Link className="text-center" to="/register">
                  Don&apos;t have account yet?
                </Link>
              </FormDescription>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
