"use client";

import { useState } from "react";
import { useBooks } from "../api/queries";
import { useCreateBook, useDeleteBook, useUpdateBook } from "../api/mutations";
import { Book } from "../types";
import { BookFormValues } from "../schemas";
import { BooksAdminTable } from "./books-admin-table";
import { BooksAdminTableSkeleton } from "./books-admin-table-skeleton";
import { CreateBookModal } from "./create-book-modal";
import { DeleteBookModal } from "./delete-book-modal";
import { EditBookModal } from "./edit-book-modal";

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

                    <CreateBookModal
                        open={createOpen}
                        onOpenChange={setCreateOpen}
                        onSubmit={handleCreate}
                        isSubmitting={createBook.isPending}
                        error={createBook.error}
                    />
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

            <EditBookModal
                book={editBook}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditBook(null);
                    }
                }}
                onSubmit={handleEdit}
                isSubmitting={updateBook.isPending}
                error={updateBook.error}
            />

            <DeleteBookModal
                book={deleteTarget}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
                onConfirm={handleDelete}
                isSubmitting={deleteBook.isPending}
                error={deleteBook.error}
            />
        </div>
    );
}
