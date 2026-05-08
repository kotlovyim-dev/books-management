"use client";

import { useMe } from "@/features/auth/api/queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data, isError, isLoading } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (isError || (!isLoading && !data)) {
            router.replace("/login");
        }
    }, [isError, isLoading, data, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900" />
            </div>
        );
    }

    if (isError || !data) {
        return null;
    }

    return <>{children}</>;
}
