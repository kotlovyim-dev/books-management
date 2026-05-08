"use client";

import { AppHeader } from "@/components/layout/app-header";
import { useMe } from "@/features/auth/api/queries";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: user } = useMe();

    return (
        <>
            <AppHeader
                username={user?.name || "User"}
                role={user?.role || "user"}
            />
            <div className="min-h-[calc(100vh-4rem)] bg-zinc-50">
                {children}
            </div>
        </>
    );
}
