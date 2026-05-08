"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bookSchema, BookFormInput, BookFormValues } from "../schemas";

interface BookFormProps {
    defaultValues?: BookFormValues;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: BookFormValues) => void;
}

const emptyValues: BookFormValues = {
    name: "",
    author: "",
    pageCount: 1,
};

export function BookForm({
    defaultValues,
    submitLabel,
    isSubmitting,
    onSubmit,
}: BookFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormInput, unknown, BookFormValues>({
        resolver: zodResolver(bookSchema),
        defaultValues: defaultValues ?? emptyValues,
    });

    useEffect(() => {
        reset(defaultValues ?? emptyValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="book-name">Name</Label>
                <Input
                    id="book-name"
                    placeholder="The Pragmatic Programmer"
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="book-author">Author</Label>
                <Input
                    id="book-author"
                    placeholder="Andrew Hunt"
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("author")}
                />
                {errors.author && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.author.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="book-pages">Pages</Label>
                <Input
                    id="book-pages"
                    type="number"
                    min={1}
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("pageCount", { valueAsNumber: true })}
                />
                {errors.pageCount && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.pageCount.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-6 mt-2 font-semibold"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    submitLabel
                )}
            </Button>
        </form>
    );
}
