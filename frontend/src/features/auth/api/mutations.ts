import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { LoginValues, SignupValues } from "../schemas";
import { useRouter } from "next/navigation";
import { HTTPError } from "ky";

type AuthResponse = {
    token: string;
    user: { id: number; email: string; name?: string };
};

export const useLogin = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (credentials: LoginValues) => {
            try {
                return await api
                    .post("login", { json: credentials })
                    .json<AuthResponse>();
            } catch (error) {
                if (error instanceof HTTPError) {
                    const errorData = await error.response.json().catch(() => null);
                    const message = Array.isArray(errorData?.message) 
                        ? errorData.message.join(", ") 
                        : errorData?.message || "An error occurred during login";
                    throw new Error(message);
                }
                throw error;
            }
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        },
    });
};

export const useSignup = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (data: SignupValues) => {
            try {
                return await api
                    .post("signup", { json: data })
                    .json<AuthResponse>();
            } catch (error) {
                if (error instanceof HTTPError) {
                    const errorData = await error.response.json().catch(() => null);
                    const message = Array.isArray(errorData?.message) 
                        ? errorData.message.join(", ") 
                        : errorData?.message || "An error occurred during signup";
                    throw new Error(message);
                }
                throw error;
            }
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        },
    });
};
