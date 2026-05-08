"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../api/mutations";
import { loginSchema, LoginValues } from "../schemas";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Library, Loader2 } from "lucide-react";

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-zinc-200 shadow-sm rounded-xl">
      <CardContent>
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-xl">
              <Library className="w-6 h-6 text-zinc-900" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Bookshelf
            </span>
          </div>
        </div>

        {loginMutation.error && (
          <div className="p-3 mb-4 text-sm text-red-500 bg-red-50/50 border border-red-200 rounded-lg">
            {loginMutation.error.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="bg-zinc-50/50 border-zinc-200 rounded-lg"
            />
            {errors.email && (
              <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="**********"
              {...register("password")}
              className="bg-zinc-50/50 border-zinc-200 rounded-lg"
            />
            {errors.password && (
              <p className="text-sm text-red-500 font-medium">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-6 mt-2 font-semibold"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            No account?{" "}
            <Link href="/signup" className="text-zinc-900 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
