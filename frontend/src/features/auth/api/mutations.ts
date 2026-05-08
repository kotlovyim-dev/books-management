import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { LoginValues, SignupValues } from "../schemas";
import { useRouter } from "next/navigation";

type AuthResponse = {
    accessToken: string;
    user: { email: string; name: string; role: string };
};

export const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginValues) => {
            return apiFetch<AuthResponse>("login", {
                method: "POST",
                body: JSON.stringify(credentials),
            });
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            queryClient.setQueryData(["me"], data.user);
            queryClient.invalidateQueries({ queryKey: ["books"] });
            router.push("/books");
        },
    });
};

export const useSignup = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SignupValues) => {
            return apiFetch<AuthResponse>("signup", {
                method: "POST",
                body: JSON.stringify(data),
            });
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            queryClient.setQueryData(["me"], data.user);
            queryClient.invalidateQueries({ queryKey: ["books"] });
            router.push("/books");
        },
    });
};
