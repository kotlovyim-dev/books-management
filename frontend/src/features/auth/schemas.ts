import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters").max(32, "Password must be at most 32 characters"),
});

export type SignupValues = z.infer<typeof signupSchema>;
