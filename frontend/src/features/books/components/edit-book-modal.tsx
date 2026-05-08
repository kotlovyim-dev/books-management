"use client";

import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { BookForm } from "./book-form";
import type { BookFormValues } from "../schemas";
import type { Book } from "../types";

interface EditBookModalProps {
    book: Book | null;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: BookFormValues) => void;
    isSubmitting?: boolean;
    error?: unknown;
}

export function EditBookModal({
    book,
    onOpenChange,
    onSubmit,
    isSubmitting,
    error,
}: EditBookModalProps) {
    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : null;

    return (
        <ResponsiveDialog open={Boolean(book)} onOpenChange={onOpenChange}>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>Edit book</ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        Update the book details below.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    <BookForm
                        defaultValues={
                            book
                                ? {
                                      name: book.name,
                                      author: book.author,
                                      pageCount: book.pageCount,
                                  }
                                : undefined
                        }
                        submitLabel="Save changes"
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                    />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
