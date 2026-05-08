import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type CurrentUser = {
    name: string;
    email: string;
    role: string;
};

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            return apiFetch<CurrentUser>("me");
        },
        retry: false,
    });
};
