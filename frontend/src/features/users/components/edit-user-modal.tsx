"use client";

import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
} from "@/components/ui/responsive-dialog";
import { UserForm } from "./user-form";
import type { UpdateUserValues } from "../schemas";
import type { User } from "../types";

interface EditUserModalProps {
    user: User | null;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: UpdateUserValues) => void;
    isSubmitting?: boolean;
    error?: unknown;
}

export function EditUserModal({
    user,
    onOpenChange,
    onSubmit,
    isSubmitting,
    error,
}: EditUserModalProps) {
    const errorMessage =
        error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : null;

    return (
        <ResponsiveDialog open={Boolean(user)} onOpenChange={onOpenChange}>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>Edit user</ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        Update the account details below.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody className="space-y-4">
                    {errorMessage && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {errorMessage}
                        </div>
                    )}
                    <UserForm
                        mode="edit"
                        defaultValues={
                            user
                                ? {
                                      name: user.name,
                                      email: user.email,
                                      role: user.role,
                                      password: "",
                                  }
                                : undefined
                        }
                        submitLabel="Save changes"
                        onSubmit={(values) =>
                            onSubmit(values as UpdateUserValues)
                        }
                        isSubmitting={isSubmitting}
                    />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    );
}
