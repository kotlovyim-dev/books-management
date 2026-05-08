"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { BookForm } from "./book-form";
import type { BookFormValues } from "../schemas";

interface CreateBookModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: BookFormValues) => void;
    isSubmitting?: boolean;
    error?: unknown;
}

export function CreateBookModal({
    open,
    onOpenChange,
    onSubmit,
    isSubmitting,
    error,
}: CreateBookModalProps) {
    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : null;

    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
            <ResponsiveDialogTrigger asChild>
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5">
                    <Plus className="h-4 w-4" />
                    New book
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>
                        Add a new book
                    </ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        Fill in the details to add a new book to the library.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    <BookForm
                        submitLabel="Create book"
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                    />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
