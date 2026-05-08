"use client";

import { useMe } from "@/features/auth/api/queries";
import { UsersAdminPage } from "./users-admin-page";

export function UsersRoute() {
    const { data: user, isLoading, isError } = useMe();

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-white">
                <main className="max-w-6xl mx-auto px-6 py-8">
                    <div className="h-6 w-40 rounded bg-zinc-100 animate-pulse" />
                </main>
            </div>
        );
    }

    if (isError || user?.role !== "admin") {
        return (
            <div className="min-h-[calc(100vh-4rem)] bg-white">
                <main className="max-w-4xl mx-auto px-6 py-12">
                    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 text-center">
                        <p className="text-sm font-semibold text-zinc-500 uppercase tracking-[0.2em]">
                            Admin only
                        </p>
                        <h1 className="mt-3 text-2xl font-bold text-zinc-900">
                            Access denied
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">
                            You do not have permission to view this page.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    return <UsersAdminPage />;
}
