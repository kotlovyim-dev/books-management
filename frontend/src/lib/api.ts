const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/";

export async function apiFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<T> {
    const token = localStorage.getItem("token");
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    const res = await fetch(`${API_URL}${path}`, {
        headers,
        ...init,
    });

    if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return new Promise(() => {});
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(
            (error as { message?: string }).message ??
                `API error ${res.status}`,
        );
    }

    if (res.status === 204 || res.headers.get("content-length") === "0") {
        return undefined as T;
    }

    return res.json() as Promise<T>;
}
