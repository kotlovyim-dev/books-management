import ky from "ky";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const api = ky.create({
    prefix: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    hooks: {
        beforeRequest: [
            ({ request }) => {
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                if (token) {
                    request.headers.set("Authorization", `Bearer ${token}`);
                }
            },
        ],
    },
});
