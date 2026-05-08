"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    createUserSchema,
    updateUserSchema,
    CreateUserInput,
    CreateUserValues,
    UpdateUserInput,
    UpdateUserValues,
} from "../schemas";

type UserFormMode = "create" | "edit";

type UserFormInput = CreateUserInput | UpdateUserInput;
type UserFormValues = CreateUserValues | UpdateUserValues;

interface UserFormProps {
    mode: UserFormMode;
    defaultValues?: UserFormValues;
    submitLabel: string;
    isSubmitting?: boolean;
    onSubmit: (values: UserFormValues) => void;
}

const emptyValues: UserFormValues = {
    name: "",
    email: "",
    role: "user",
    password: "",
};

export function UserForm({
    mode,
    defaultValues,
    submitLabel,
    isSubmitting,
    onSubmit,
}: UserFormProps) {
    const schema = mode === "create" ? createUserSchema : updateUserSchema;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormInput, unknown, UserFormValues>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues ?? emptyValues,
    });

    useEffect(() => {
        reset(defaultValues ?? emptyValues);
    }, [defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="user-name">Name</Label>
                <Input
                    id="user-name"
                    placeholder="Jane Doe"
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input
                    id="user-email"
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>
                <select
                    id="user-role"
                    className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50/50 px-3 text-sm text-zinc-900 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    {...register("role")}
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
                {errors.role && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.role.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="user-password">Password</Label>
                <Input
                    id="user-password"
                    type="password"
                    placeholder={
                        mode === "edit" ? "Leave blank to keep" : "********"
                    }
                    className="bg-zinc-50/50 border-zinc-200 rounded-lg"
                    {...register("password")}
                />
                {mode === "edit" && (
                    <p className="text-xs text-zinc-400">
                        Leave blank to keep the current password.
                    </p>
                )}
                {errors.password && (
                    <p className="text-sm text-red-500 font-medium">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-6 mt-2 font-semibold"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    submitLabel
                )}
            </Button>
        </form>
    );
}
