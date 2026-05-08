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
import { Book } from "../types";

interface BooksAdminTableProps {
    data: Book[];
    onEdit: (book: Book) => void;
    onDelete: (book: Book) => void;
}

export function BooksAdminTable({
    data,
    onEdit,
    onDelete,
}: BooksAdminTableProps) {
    const columns = React.useMemo<ColumnDef<Book>[]>(
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
                accessorKey: "author",
                header: "Author",
                cell: ({ row }) => (
                    <div className="text-zinc-600">
                        {row.getValue("author")}
                    </div>
                ),
            },
            {
                accessorKey: "pageCount",
                header: "Pages",
                cell: ({ row }) => (
                    <div className="text-zinc-600">
                        {row.getValue("pageCount")}
                    </div>
                ),
            },
            {
                id: "actions",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => {
                    const book = row.original;

                    return (
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 rounded-full px-3 text-xs"
                                onClick={() => onEdit(book)}
                            >
                                edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 rounded-full px-3 text-xs border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => onDelete(book)}
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
                                No books found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export function BooksAdminTableSkeleton() {
    return (
        <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        {["Name", "Author", "Pages", "Actions"].map((label) => (
                            <TableHead key={label}>{label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="h-4 w-40 rounded bg-zinc-100 animate-pulse" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 w-32 rounded bg-zinc-100 animate-pulse" />
                            </TableCell>
                            <TableCell>
                                <div className="h-4 w-16 rounded bg-zinc-100 animate-pulse" />
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
