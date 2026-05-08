import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { User } from "../types";
import { CreateUserValues, UpdateUserValues } from "../schemas";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateUserValues) => {
            return apiFetch<User>("users", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            payload,
        }: {
            id: string;
            payload: UpdateUserValues;
        }) => {
            return apiFetch<User>(`users/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({
                queryKey: ["users", variables.id],
            });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return apiFetch<void>(`users/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["users", id] });
        },
    });
};
