"use client";

import { useMe } from "@/features/auth/api/queries";
import { BookListContainer } from "./book-list-container";
import { BooksAdminPage } from "./books-admin-page";

export function BooksListPage() {
    const { data: user, isLoading } = useMe();

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-white">
                <main className="max-w-7xl mx-auto px-6 py-8">
                    <div className="h-6 w-40 rounded bg-zinc-100 animate-pulse" />
                </main>
            </div>
        );
    }

    if (user?.role === "admin") {
        return <BooksAdminPage />;
    }

    return (
        <div className="min-h-screen bg-white">
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                        All Books
                    </h1>
                </div>

                <BookListContainer />
            </main>
        </div>
    );
}
