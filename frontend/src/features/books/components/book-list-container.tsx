"use client";

import { BookCard } from "./book-card";
import { useBooks } from "../api/queries";

export function BookListContainer() {
    const { data: books, isLoading, isError } = useBooks();

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <BookCard key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                Failed to load books. Please try again.
            </div>
        );
    }

    if (!books || books.length === 0) {
        return (
            <div className="p-8 text-center text-zinc-500 border border-dashed border-zinc-200 rounded-xl">
                No books available yet.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}
