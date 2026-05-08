"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { UserForm } from "./user-form";
import type { CreateUserValues } from "../schemas";

interface CreateUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: CreateUserValues) => void;
    isSubmitting?: boolean;
    error?: unknown;
}

export function CreateUserModal({
    open,
    onOpenChange,
    onSubmit,
    isSubmitting,
    error,
}: CreateUserModalProps) {
    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : null;

    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
            <ResponsiveDialogTrigger asChild>
                <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-5">
                    <Plus className="h-4 w-4" />
                    New user
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>
                        Add a new user
                    </ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        Create a new account and set their role.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    <UserForm
                        mode="create"
                        submitLabel="Create user"
                        onSubmit={(values) =>
                            onSubmit(values as CreateUserValues)
                        }
                        isSubmitting={isSubmitting}
                    />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
