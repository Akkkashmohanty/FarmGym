"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

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

  const [name, setName] = useState("")
  const [description, setDescription] =
    useState("")
  const [category, setCategory] =
    useState("")
  const [brand, setBrand] =
    useState("")
  const [unit, setUnit] =
    useState("")
  const [price, setPrice] =
    useState("")
  const [stock, setStock] =
    useState("")
  const [imageUrl, setImageUrl] =
    useState("")

  useEffect(() => {
    if (!product) return

    setName(product.name)
    setDescription(product.description)
    setCategory(product.category)
    setBrand(product.brand ?? "")
    setUnit(product.unit)
    setPrice(product.price.toString())
    setStock(product.stock.toString())
    setImageUrl(product.image_url ?? "")
  }, [product])

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault()

    try {
      await updateProduct.mutateAsync({
        id: productId,
        payload: {
          name,
          description,
          category,
          brand,
          unit,
          price: Number(price),
          stock: Number(stock),
          image_url:
            imageUrl.trim() || null,
        },
      })

      toast.success(
        "Product updated successfully.",
      )

      router.push(
        "/seller/dashboard",
      )
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Unable to update product.",
      )
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
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border bg-card p-6"
    >
      <h2 className="text-2xl font-bold">
        Edit Product
      </h2>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Product Name"
        className="w-full rounded-xl border p-3"
      />

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Description"
        className="w-full rounded-xl border p-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          placeholder="Brand"
          className="rounded-xl border p-3"
        />

        <input
          value={unit}
          onChange={(e) =>
            setUnit(e.target.value)
          }
          placeholder="Unit"
          className="rounded-xl border p-3"
        />
      </div>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
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
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Price"
          className="rounded-xl border p-3"
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          placeholder="Stock"
          className="rounded-xl border p-3"
        />
      </div>

      <input
        value={imageUrl}
        onChange={(e) =>
          setImageUrl(e.target.value)
        }
        placeholder="Image URL"
        className="w-full rounded-xl border p-3"
      />

      <button
        type="submit"
        disabled={
          updateProduct.isPending
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