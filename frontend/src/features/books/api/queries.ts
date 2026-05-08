import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Book } from "../types";
export const useBooks = () => {
    return useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return apiFetch<Book[]>("books");
        },
    });
};

export const useBook = (id?: number) => {
    return useQuery({
        queryKey: ["books", id],
        queryFn: async () => {
            return apiFetch<Book>(`books/${id}`);
        },
        enabled: typeof id === "number" && !Number.isNaN(id),
    });
};
