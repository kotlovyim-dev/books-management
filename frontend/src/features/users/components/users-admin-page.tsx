"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from "@/components/ui/responsive-dialog";
import { useUsers } from "../api/queries";
import { useCreateUser, useDeleteUser, useUpdateUser } from "../api/mutations";
import { User } from "../types";
import { UserForm } from "./user-form";
import { CreateUserValues, UpdateUserValues } from "../schemas";
import { UsersAdminTable, UsersAdminTableSkeleton } from "./users-admin-table";

export function UsersAdminPage() {
    const { data: users, isLoading, isError } = useUsers();
    const createUser = useCreateUser();
    const updateUser = useUpdateUser();
    const deleteUser = useDeleteUser();

    const [createOpen, setCreateOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

    const handleCreate = (values: CreateUserValues) => {
        createUser.mutate(values, {
            onSuccess: () => setCreateOpen(false),
        });
    };

    const handleEdit = (values: UpdateUserValues) => {
        if (!editUser) {
            return;
        }

        const payload = {
            ...values,
            password: values.password || undefined,
        };

        updateUser.mutate(
            { id: editUser.id, payload },
            {
                onSuccess: () => setEditUser(null),
            },
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) {
            return;
        }

        deleteUser.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
        });
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-white">
            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
                            Users
                        </p>
                        <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
                            Admin Users
                        </h1>
                    </div>

                    <ResponsiveDialog
                        open={createOpen}
                        onOpenChange={setCreateOpen}
                    >
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
                            {createUser.error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                                    {createUser.error.message}
                                </div>
                            )}
                            <UserForm
                                mode="create"
                                submitLabel="Create user"
                                onSubmit={(values) =>
                                    handleCreate(values as CreateUserValues)
                                }
                                isSubmitting={createUser.isPending}
                            />
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                </div>

                <div className="mt-6">
                    {isLoading && <UsersAdminTableSkeleton />}

                    {isError && (
                        <div className="p-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            Failed to load users. Please try again.
                        </div>
                    )}

                    {!isLoading && !isError && users && (
                        <UsersAdminTable
                            data={users}
                            onEdit={setEditUser}
                            onDelete={setDeleteTarget}
                        />
                    )}
                </div>
            </main>

            <ResponsiveDialog
                open={Boolean(editUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditUser(null);
                    }
                }}
            >
                <ResponsiveDialogContent>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Edit user</ResponsiveDialogTitle>
                        <ResponsiveDialogDescription>
                            Update the account details below.
                        </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>
                    {updateUser.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {updateUser.error.message}
                        </div>
                    )}
                    <UserForm
                        mode="edit"
                        defaultValues={
                            editUser
                                ? {
                                      name: editUser.name,
                                      email: editUser.email,
                                      role: editUser.role,
                                      password: "",
                                  }
                                : undefined
                        }
                        submitLabel="Save changes"
                        onSubmit={(values) =>
                            handleEdit(values as UpdateUserValues)
                        }
                        isSubmitting={updateUser.isPending}
                    />
                </ResponsiveDialogContent>
            </ResponsiveDialog>

            <ResponsiveDialog
                open={Boolean(deleteTarget)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
            >
                <ResponsiveDialogContent>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>
                            Delete user
                        </ResponsiveDialogTitle>
                        <ResponsiveDialogDescription>
                            This action cannot be undone. This will permanently
                            delete "{deleteTarget?.name}".
                        </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>

                    {deleteUser.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
                            {deleteUser.error.message}
                        </div>
                    )}

                    <ResponsiveDialogFooter>
                        <ResponsiveDialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </ResponsiveDialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteUser.isPending}
                        >
                            {deleteUser.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </ResponsiveDialogFooter>
                </ResponsiveDialogContent>
            </ResponsiveDialog>
        </div>
    );
}
