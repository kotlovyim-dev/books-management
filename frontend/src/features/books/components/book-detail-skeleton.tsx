export function BookDetailSkeleton() {
    return (
        <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div className="aspect-3/4 w-full rounded-2xl border border-zinc-200 bg-zinc-100 animate-pulse" />
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
