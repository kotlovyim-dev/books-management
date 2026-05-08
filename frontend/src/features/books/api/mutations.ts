import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Book } from "../types";

export type BookPayload = Pick<Book, "name" | "author" | "pageCount">;

export const useCreateBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: BookPayload) => {
            return apiFetch<Book>("books", {
                method: "POST",
                body: JSON.stringify(payload),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
        },
    });
};

export const useUpdateBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            payload,
        }: {
            id: number;
            payload: BookPayload;
        }) => {
            return apiFetch<Book>(`books/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({
                queryKey: ["books", variables.id],
            });
        },
    });
};

export const useDeleteBook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            return apiFetch<void>(`books/${id}`, {
                method: "DELETE",
            });
        },
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["books", id] });
        },
    });
};
