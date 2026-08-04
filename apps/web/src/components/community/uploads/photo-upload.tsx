"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreatePost } from "@/features/community/hooks/use-community"

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  crop: z.string().optional(),
  state: z.string().optional(),
  tags: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function PhotoUpload() {
  const createPost = useCreatePost()

  const [image, setImage] =
    useState<File>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(
    values: FormValues,
  ) {
    await createPost.mutateAsync({
      ...values,
      image,
    })

    reset()
    setImage(undefined)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl border bg-card p-6 space-y-5"
    >
      <h2 className="text-2xl font-bold">
        Share Your Harvest
      </h2>

      <input
        {...register("title")}
        placeholder="Post title"
        className="w-full rounded-xl border p-3"
      />

      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.message}
        </p>
      )}

      <textarea
        {...register("description")}
        rows={5}
        placeholder="Tell the community..."
        className="w-full rounded-xl border p-3"
      />

      {errors.description && (
        <p className="text-sm text-red-500">
          {errors.description.message}
        </p>
      )}

      <input
        {...register("crop")}
        placeholder="Crop"
        className="w-full rounded-xl border p-3"
      />

      <input
        {...register("state")}
        placeholder="State"
        className="w-full rounded-xl border p-3"
      />

      <input
        {...register("tags")}
        placeholder="Tags (comma separated)"
        className="w-full rounded-xl border p-3"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(e.target.files?.[0])
        }
      />

      <button
        disabled={createPost.isPending}
        className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white"
      >
        {createPost.isPending
          ? "Posting..."
          : "Post to Community"}
      </button>
    </form>
  )
}