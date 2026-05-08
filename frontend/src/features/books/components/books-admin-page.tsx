"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { useBooks } from "../api/queries";
import { useCreateBook, useDeleteBook, useUpdateBook } from "../api/mutations";
import { Book } from "../types";
import { BookForm } from "./book-form";
import { BookFormValues } from "../schemas";
import { BooksAdminTable, BooksAdminTableSkeleton } from "./books-admin-table";

export function BooksAdminPage() {
    const { data: books, isLoading, isError } = useBooks();
    const createBook = useCreateBook();
    const updateBook = useUpdateBook();
    const deleteBook = useDeleteBook();

    const [createOpen, setCreateOpen] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);

    const handleCreate = (values: BookFormValues) => {
        createBook.mutate(values, {
            onSuccess: () => setCreateOpen(false),
        });
    };

    const handleEdit = (values: BookFormValues) => {
        if (!editBook) {
            return;
        }

        updateBook.mutate(
            { id: editBook.id, payload: values },
            {
                onSuccess: () => setEditBook(null),
            },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) {
            return;
        }

        deleteBook.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-white">
            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                            Books
                        </p>
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                            Admin Library
                        </h1>
                    </div>

                    <ResponsiveDialog
                        open={createOpen}
                        onOpenChange={setCreateOpen}
                    >
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
                                    Fill in the details to add a new book to the
                                    library.
                                </ResponsiveDialogDescription>
                            </ResponsiveDialogHeader>
                            {createBook.error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                                    {createBook.error.message}
                                </div>
                            )}
                            <BookForm
                                submitLabel="Create book"
                                onSubmit={handleCreate}
                                isSubmitting={createBook.isPending}
                            />
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                </div>

                <div className="mt-6">
                    {isLoading && <BooksAdminTableSkeleton />}

                    {isError && (
                        <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            Failed to load books. Please try again.
                        </div>
                    )}

                    {!isLoading && !isError && books && (
                        <BooksAdminTable
                            data={books}
                            onEdit={setEditBook}
                            onDelete={setDeleteTarget}
                        />
                    )}
                </div>
            </main>

            <ResponsiveDialog
                open={Boolean(editBook)}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditBook(null);
                    }
                }}
            >
                <ResponsiveDialogContent>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Edit book</ResponsiveDialogTitle>
                        <ResponsiveDialogDescription>
                            Update the book details below.
                        </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>
                    {updateBook.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {updateBook.error.message}
                        </div>
                    )}
                    <BookForm
                        defaultValues={
                            editBook
                                ? {
                                      name: editBook.name,
                                      author: editBook.author,
                                      pageCount: editBook.pageCount,
                                  }
                                : undefined
                        }
                        submitLabel="Save changes"
                        onSubmit={handleEdit}
                        isSubmitting={updateBook.isPending}
                    />
                </ResponsiveDialogContent>
            </ResponsiveDialog>

            <ResponsiveDialog
                open={Boolean(deleteTarget)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <ResponsiveDialogContent>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                            Delete book
                        </ResponsiveDialogTitle>
                        <ResponsiveDialogDescription>
                            This action cannot be undone. This will permanently
                            delete "{deleteTarget?.name}".
                        </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>

                    {deleteBook.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {deleteBook.error.message}
                        </div>
                    )}

                    <ResponsiveDialogFooter>
                        <ResponsiveDialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </ResponsiveDialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteBook.isPending}
                        >
                            {deleteBook.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </ResponsiveDialogFooter>
                </ResponsiveDialogContent>
            </ResponsiveDialog>
        </div>
    );
}
