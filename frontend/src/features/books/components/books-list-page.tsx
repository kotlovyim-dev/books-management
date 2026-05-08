import { AppHeader } from "@/components/layout/app-header";
import { BookListContainer } from "./book-list-container";

export function BooksListPage() {
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
