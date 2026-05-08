"use client";

import { useMe } from "@/features/auth/api/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function GuestGuard({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && data) {
            router.replace("/books");
        }
    }, [isLoading, data, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900" />
            </div>
        );
    }

    if (data) {
        return null;
    }

    return <>{children}</>;
}
