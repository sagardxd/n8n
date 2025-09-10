import z from "zod";

export const SignupSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "password must be at least 6 character long").max(10, 'password cannot be more than 10 characters long')
})