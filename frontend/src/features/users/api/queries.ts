import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { User } from "../types";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            return apiFetch<User[]>("users");
        },
    });
};
