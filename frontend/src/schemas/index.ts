import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(30, { message: "First name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+$/, { message: "First name must only contain alphabetic characters." }),

  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .max(30, { message: "Last name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+$/, { message: "Last name must only contain alphabetic characters." }),

  email: z.string()
    .email({ message: "Please provide a valid email address." }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(128, { message: "Password must be at most 128 characters long." })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),

  confirmPassword: z.string()
    .min(6, { message: "Password must be at least 6 characters." })
  }).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
      code: "custom",
      message: "The passwords do not match",
      path: ['confirmPassword']
    });
  }
});

const loginSchema = z.object({
  email: z.string()
    .email({ message: "Please provide a valid email address." }),

  password: z.string()
});

export {
  registerSchema, loginSchema
};