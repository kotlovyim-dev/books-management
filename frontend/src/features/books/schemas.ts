import { z } from "zod";

export const bookSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(200, "Name must be at most 200 characters"),
    author: z
        .string()
        .min(2, "Author must be at least 2 characters")
        .max(100, "Author must be at most 100 characters"),
    pageCount: z.coerce.number().int().min(1, "Page count must be at least 1"),
});

export type BookFormInput = z.input<typeof bookSchema>;
export type BookFormValues = z.output<typeof bookSchema>;
