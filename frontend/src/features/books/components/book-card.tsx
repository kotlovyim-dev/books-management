import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Book } from "../types";

export function BookCard({ book }: { book?: Book }) {
    if (!book) {
        return (
            <Card className="border-zinc-200 shadow-sm rounded-xl overflow-hidden p-4 flex flex-col space-y-4">
                <div className="w-full h-32 bg-zinc-100 rounded-md animate-pulse"></div>
                <div className="space-y-2 mt-auto">
                    <div className="w-full h-4 bg-zinc-100 rounded-sm animate-pulse"></div>
                    <div className="w-2/3 h-4 bg-zinc-100 rounded-sm animate-pulse"></div>
                </div>
            </Card>
        );
    }

    return (
        <Link href={`/books/${book.id}`} className="block">
            <Card className="border-zinc-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow p-4 flex flex-col space-y-4">
                <div className="w-full h-32 bg-zinc-100 rounded-md flex items-center justify-center text-zinc-400">
                    <span className="text-sm font-medium">Cover</span>
                </div>
                <div className="space-y-1 mt-auto">
                    <h3 className="font-bold text-lg text-zinc-900 leading-tight">
                        {book.name}
                    </h3>
                    <p className="text-sm text-zinc-600 font-medium">
                        {book.author}
                    </p>
                    <p className="text-xs text-zinc-400">
                        {book.pageCount} pages
                    </p>
                </div>
            </Card>
        </Link>
    );
}
