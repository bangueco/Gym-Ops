import { z } from "zod";

export const registerSchema = z.object({
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

export const loginSchema = z.object({
  email: z.string()
    .email({ message: "Please provide a valid email address." }),

  password: z.string()
});

export const inputMemberSchema = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters long." })
    .max(30, { message: "First name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, { message: "First name must only contain alphabetic characters." }),

  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters long." })
    .max(30, { message: "Last name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, { message: "Last name must only contain alphabetic characters." }),

  email: z.string()
    .email({ message: "Please provide a valid email address." }),

  phoneNumber: z.string()
    .min(11, { message: "Phone number must be at least 11 characters long." })
    .max(11, { message: "Phone number must be at most 11 characters long." }),

  membershipId: z.string({ message: "Please select membership type." }),

  createdBy: z.number()
});

export const inputMembershipSchema = z.object({
  membershipName: z.string()
    .min(2, { message: "Membership name must be at least 2 characters long." })
    .max(30, { message: "Membership name must be at most 30 characters long." }),

  membershipLength: z.coerce.number()
    .min(1, { message: "Membership length must be at least 1 day." }),

  membershipFee: z.coerce.number()
    .min(1, { message: "Membership fee must be at least 1." }),

  createdBy: z.number()
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type InputMemberSchema = z.infer<typeof inputMemberSchema>;
export type InputMembershipSchema = z.infer<typeof inputMembershipSchema>;
