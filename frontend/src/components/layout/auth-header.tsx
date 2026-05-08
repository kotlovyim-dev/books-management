import Link from "next/link";
import { Library } from "lucide-react";

export function AuthHeader({ isLoginPage }: { isLoginPage: boolean }) {
    const linkHref = isLoginPage ? "/signup" : "/login";
    const linkLabel = isLoginPage
        ? "Don't have an account? Sign up"
        : "Already have an account? Sign in";

    return (
        <div className="flex sticky top-0 z-10 justify-between items-center py-4 px-6 bg-white border-b border-zinc-200">
            <div className="flex items-center gap-2 text-zinc-900">
                <Library className="w-6 h-6" />
                <span className="font-bold text-lg tracking-tight">
                    Bookshelf
                </span>
            </div>
            <Link
                href={linkHref}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
                {linkLabel}
            </Link>
        </div>
    );
}
