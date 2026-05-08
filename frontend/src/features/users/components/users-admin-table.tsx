"use client";

import * as React from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "../types";

interface UsersAdminTableProps {
    data: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

const roleStyles: Record<User["role"], string> = {
    admin: "bg-blue-100 text-blue-700 border border-blue-200",
    user: "bg-zinc-100 text-zinc-700 border border-zinc-200",
};

export function UsersAdminTable({
    data,
    onEdit,
    onDelete,
}: UsersAdminTableProps) {
    const columns = React.useMemo<ColumnDef<User>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => (
                    <div className="font-medium text-zinc-900">
                        {row.getValue("name")}
                    </div>
                ),
            },
            {
                accessorKey: "email",
                header: "Email",
                cell: ({ row }) => (
                    <div className="text-zinc-600">{row.getValue("email")}</div>
                ),
            },
            {
                accessorKey: "role",
                header: "Role",
                cell: ({ row }) => {
                    const role = row.getValue("role") as User["role"];
                    return (
                        <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[role]}`}
                        >
                            {role}
                        </span>
                    );
                },
            },
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => {
                    const user = row.original;

                    return (
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 rounded-full px-3 text-xs"
                                onClick={() => onEdit(user)}
                            >
                                edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 rounded-full px-3 text-xs border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => onDelete(user)}
                            >
                                del
                            </Button>
                        </div>
                    );
                },
            },
        ],
        [onDelete, onEdit],
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-zinc-500"
                            >
                                No users found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

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
