"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import type { ProductUpdate } from "@/features/marketplace/types/product.types"
import {
  useProduct,
  useUpdateProduct,
} from "@/features/marketplace/hooks/use-products"

interface Props {
  productId: number
}

export default function ProductEditForm({
  productId,
}: Props) {
  const router = useRouter()

  const {
    data: product,
    isLoading,
  } = useProduct(productId)

  const updateProduct =
    useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ProductUpdate>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      unit: "",
      price: 0,
      stock: 0,
      image_url: "",
    },
  })

  useEffect(() => {
    if (!product) return

    reset({
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand ?? "",
      unit: product.unit,
      price: product.price,
      stock: product.stock,
      image_url: product.image_url ?? "",
    })
  }, [product, reset])

  async function onSubmit(data: ProductUpdate) {
    try {
      await updateProduct.mutateAsync({
        id: productId,
        payload: {
          ...data,
          image_url: data.image_url?.trim() || null,
        },
      })

      toast.success(
        "Product updated successfully.",
      )

      router.push(
        "/seller/dashboard",
      )
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to update product."

      toast.error(message)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-3xl border bg-card p-6"
    >
      <h2 className="text-2xl font-bold">
        Edit Product
      </h2>

      <input
        {...register("name")}
        placeholder="Product Name"
        className="w-full rounded-xl border p-3"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("brand")}
          placeholder="Brand"
          className="rounded-xl border p-3"
        />

        <input
          {...register("unit")}
          placeholder="Unit"
          className="rounded-xl border p-3"
        />
      </div>

      <select
        {...register("category")}
        className="w-full rounded-xl border p-3"
      >
        <option>Seeds</option>
        <option>Tools</option>
        <option>Pots</option>
        <option>Fertilizer</option>
        <option>Soil</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          {...register("stock", { valueAsNumber: true })}
          placeholder="Stock"
          className="rounded-xl border p-3"
        />
      </div>

      <input
        {...register("image_url")}
        placeholder="Image URL"
        className="w-full rounded-xl border p-3"
      />

      <button
        type="submit"
        disabled={
          updateProduct.isPending || isSubmitting
        }
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {updateProduct.isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Changes
          </>
        )}
      </button>
    </form>
  )
}