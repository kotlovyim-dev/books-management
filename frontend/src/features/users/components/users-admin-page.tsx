"use client";

import { useState } from "react";
import { useUsers } from "../api/queries";
import { useCreateUser, useDeleteUser, useUpdateUser } from "../api/mutations";
import { User } from "../types";
import { CreateUserValues, UpdateUserValues } from "../schemas";
import { UsersAdminTable } from "./users-admin-table";
import { UsersAdminTableSkeleton } from "./users-admin-table-skeleton";
import { CreateUserModal } from "./create-user-modal";
import { DeleteUserModal } from "./delete-user-modal";
import { EditUserModal } from "./edit-user-modal";

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

                    <CreateUserModal
                        open={createOpen}
                        onOpenChange={setCreateOpen}
                        onSubmit={handleCreate}
                        isSubmitting={createUser.isPending}
                        error={createUser.error}
                    />
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

            <EditUserModal
                user={editUser}
                onOpenChange={(open) => {
                    if (!open) {
                        setEditUser(null);
                    }
                }}
                onSubmit={handleEdit}
                isSubmitting={updateUser.isPending}
                error={updateUser.error}
            />

            <DeleteUserModal
                user={deleteTarget}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteTarget(null);
                    }
                }}
                onConfirm={handleDelete}
                isSubmitting={deleteUser.isPending}
                error={deleteUser.error}
            />
        </div>
    );
}
