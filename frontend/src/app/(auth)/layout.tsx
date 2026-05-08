"use client";
import { AuthHeader } from "@/components/layout/auth-header";
import { usePathname } from "next/navigation";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isLoginPage = usePathname() === "/login";
    console.log("isLoginPage", isLoginPage);
    return (
        <>
            <AuthHeader isLoginPage={isLoginPage} />
            <div className="min-h-[calc(100vh-4rem)] bg-zinc-50 flex items-center justify-center p-4">
                <div className="w-full">{children}</div>
            </div>
        </>
    );
}
