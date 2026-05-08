"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export function UsersAdminTableSkeleton() {
    return (
        <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        {["Name", "Email", "Role", "Actions"].map((label) => (
                            <TableHead key={label}>{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="h-4 w-32 rounded bg-zinc-100 animate-pulse" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 w-40 rounded bg-zinc-100 animate-pulse" />
                            </TableCell>
                            <TableCell>
                                <div className="h-5 w-16 rounded-full bg-zinc-100 animate-pulse" />
                            </TableCell>
                            <TableCell>
                                <div className="ml-auto h-7 w-24 rounded-full bg-zinc-100 animate-pulse" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
