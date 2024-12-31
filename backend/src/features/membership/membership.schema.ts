import { z } from "zod";

const membership = z.object({
  membershipName: z.string()
    .min(2, { message: "Membership name must be at least 2 characters long." })
    .max(30, { message: "Membership name must be at most 30 characters long." }),

  membershipLength: z.number()
    .int()
    .min(1, { message: "Membership length must be at least 1 month." })
    .max(12, { message: "Membership length must be at most 12 months." })
});

export default {
  membership
};