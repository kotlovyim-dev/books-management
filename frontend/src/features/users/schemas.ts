import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "user"]);

const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters");

export const createUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    role: userRoleSchema,
    password: passwordSchema,
});

const optionalPasswordSchema = z.preprocess(
    (value) => (value === "" ? undefined : value),
    passwordSchema.optional(),
);

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    role: userRoleSchema,
    password: optionalPasswordSchema,
});

export type CreateUserInput = z.input<typeof createUserSchema>;
export type CreateUserValues = z.output<typeof createUserSchema>;
export type UpdateUserInput = z.input<typeof updateUserSchema>;
export type UpdateUserValues = z.output<typeof updateUserSchema>;
