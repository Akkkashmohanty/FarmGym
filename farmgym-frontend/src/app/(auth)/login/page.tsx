"use client";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import api from "@/services/api";

import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      const response = await api.post(
        "/auth/login",
        data
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login successful")

      router.push("/dashboard");

    } catch (error: any) {

      alert("Login failed")
      
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </div>
  );
}