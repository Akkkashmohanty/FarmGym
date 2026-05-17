"use client";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import api from "@/services/api";

import { useRouter } from "next/navigation";

type RegisterFormData = {
  full_name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {

    try {

      await api.post(
        "/auth/register",
        data
      );

      toast.success(
        "Registration successful"
      );

      reset();

      router.push("/login");

    } catch (error: any) {

      toast.error(
        error.response?.data?.detail ||
        "Registration failed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >

        <h1 className="text-3xl font-bold text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          {...register("full_name")}
          className="w-full border p-3 rounded-lg"
        />

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
          Register
        </button>

      </form>

    </div>
  );
}