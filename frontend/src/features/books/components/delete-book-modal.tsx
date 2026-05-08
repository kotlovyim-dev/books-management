"use client";

import { Button } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import type { Book } from "../types";

interface DeleteBookModalProps {
    book: Book | null;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isSubmitting?: boolean;
    error?: unknown;
}

export function DeleteBookModal({
    book,
    onOpenChange,
    onConfirm,
    isSubmitting,
    error,
}: DeleteBookModalProps) {
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
                    <ResponsiveDialogTitle>Delete book</ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        This action cannot be undone. This will permanently
                        delete "{book?.name}".
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                </ResponsiveDialogBody>
                <ResponsiveDialogFooter>
                    <ResponsiveDialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </ResponsiveDialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Deleting..." : "Delete"}
                    </Button>
                </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
