import { z } from "zod";

export const register = z.object({
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
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." })
});

export const login = z.object({
  email: z.string()
    .email({ message: "Please provide a valid email address." }),

  password: z.string()
});

export const membership = z.object({
  membershipName: z.string()
    .min(2, { message: "Membership name must be at least 2 characters long." })
    .max(30, { message: "Membership name must be at most 30 characters long." }),

  membershipLength: z.number()
    .min(1, { message: "Membership length must be at least 1 day." })
});

export const member = z.object({
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

  membershipId: z.number({ message: "Please select membership type." })
});