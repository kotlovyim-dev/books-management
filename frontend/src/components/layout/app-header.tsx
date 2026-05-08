"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Library } from "lucide-react";
import { Button } from "../ui/button";

export interface AppHeaderProps {
    username?: string;
    role?: string;
}

export function AppHeader({
    username = "Username",
    role = "user",
}: AppHeaderProps) {
    const router = useRouter();

    return (
        <div className="flex sticky top-0 z-50 justify-between items-center py-4 px-6 bg-white border-b border-zinc-200">
            <div className="flex items-center gap-2 text-zinc-900">
                <Library className="w-6 h-6" />
                <span className="font-bold text-lg tracking-tight">
                    Bookshelf
                </span>
            </div>

            <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                <Link
                    href="/books"
                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                    Books
                </Link>
            </nav>

            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-zinc-900">
                    {username}
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-2 text-xs font-semibold bg-zinc-100 text-zinc-900 border border-zinc-200">
                    {role}
                </span>

                <Button
                    variant="outline"
                    onClick={() => {
                        localStorage.removeItem("token");
                        router.push("/login");
                    }}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}
