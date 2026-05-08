"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBook } from "../api/queries";

function BookDetailSkeleton() {
    return (
        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="aspect-[3/4] w-full rounded-2xl border border-zinc-200 bg-zinc-100 animate-pulse" />
            <div className="space-y-6">
                <div className="space-y-3">
                    <div className="h-4 w-20 rounded-md bg-zinc-100 animate-pulse" />
                    <div className="h-8 w-3/4 rounded-lg bg-zinc-100 animate-pulse" />
                    <div className="h-4 w-32 rounded-md bg-zinc-100 animate-pulse" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-24 rounded-xl border border-zinc-200 bg-zinc-50 animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function BookDetailPage() {
    const params = useParams<{ id: string }>();
    const bookId = Number(params?.id);
    const isValidId = Number.isFinite(bookId);
    const {
        data: book,
        isLoading,
        isError,
        error,
    } = useBook(isValidId ? bookId : undefined);

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-white">
            <main className="max-w-5xl mx-auto px-6 py-8">
                <Button
                    variant="ghost"
                    asChild
                    className="pl-0 text-zinc-600 hover:text-zinc-900"
                >
                    <Link href="/books">← Back to books</Link>
                </Button>

                {!isValidId && (
                    <div className="mt-6 p-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                        Invalid book id.
                    </div>
                )}

                {isValidId && isLoading && <BookDetailSkeleton />}

                {isValidId && isError && (
                    <div className="mt-6 p-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                        {error instanceof Error
                            ? error.message
                            : "Failed to load book. Please try again."}
                    </div>
                )}

                {isValidId && book && (
                    <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
                        <div className="w-full">
                            <div className="aspect-[3/4] w-full rounded-2xl border border-zinc-200 bg-zinc-100 flex items-center justify-center text-zinc-400">
                                <span className="text-sm font-medium">
                                    Cover
                                </span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                                    Book details
                                </p>
                                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">
                                    {book.name}
                                </h1>
                                <p className="text-sm text-zinc-500">
                                    ID: {book.id}
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Card className="border-zinc-200 shadow-sm">
                                    <CardContent className="space-y-2">
                                        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                                            Author
                                        </p>
                                        <p className="text-base font-medium text-zinc-900">
                                            {book.author}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="border-zinc-200 shadow-sm">
                                    <CardContent className="space-y-2">
                                        <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400 uppercase">
                                            Pages
                                        </p>
                                        <p className="text-base font-medium text-zinc-900">
                                            {book.pageCount}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
