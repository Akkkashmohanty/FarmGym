"use client"

import { useState } from "react"

import Image from "next/image"

import {
  UploadCloud,
  Loader2,
} from "lucide-react"

import { toast } from "sonner"

import {
  useCreateProduct,
} from "@/features/marketplace/hooks/use-products"
import {
  useUploadImage,
} from "@/features/marketplace/hooks/use-upload"

export default function ProductUploadForm() {
  const createProduct = useCreateProduct()
  const uploadImage = useUploadImage()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Seeds")
  const [brand, setBrand] = useState("FarmGym")
  const [unit, setUnit] = useState("Pack")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [preview, setPreview] = useState("")

  async function handleImageUpload(file: File) {
    try {
      const localPreview = URL.createObjectURL(file)

      setPreview(localPreview)

      const response = await uploadImage.mutateAsync(file)

      setImageUrl(response.image_url)

      toast.success("Image uploaded successfully.")
    } catch {
      toast.error("Image upload failed.")
    }
  }

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault()

    if (
      !name ||
      !description ||
      !price ||
      !stock
    ) {
      toast.error("Fill all required fields.")
      return
    }

    try {
      await createProduct.mutateAsync({
        name,
        description,
        category,
        brand,
        unit,

        sku: `SKU-${Date.now()}`,

        price: Number(price),

        stock: Number(stock),

        image_url:
          imageUrl.trim() || null,
      })

      toast.success(
        "Product created successfully.",
      )

      setName("")
      setDescription("")
      setCategory("Seeds")
      setBrand("FarmGym")
      setUnit("Pack")
      setPrice("")
      setStock("")
      setImageUrl("")
      setPreview("")
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
        "Unable to create product.",
      )
    }
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <UploadCloud className="h-5 w-5 text-green-600" />

        <h2 className="text-xl font-bold">
          Upload Product
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) =>
              setBrand(e.target.value)
            }
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Unit"
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value)
            }
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
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            className="rounded-xl border p-3"
          />
        </div>

        <div className="space-y-4">
          <label className="block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center hover:border-green-600">
            <UploadCloud className="mx-auto mb-3 h-10 w-10" />

            <p className="font-semibold">
              Click to Upload Product Image
            </p>

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]

                if (file) {
                  handleImageUpload(file)
                }
              }}
            />
          </label>

          {uploadImage.isPending && <p>Uploading...</p>}

          {preview && (
            <div className="relative h-60 w-full overflow-hidden rounded-xl border">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        <button
          disabled={createProduct.isPending}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {createProduct.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </form>
    </div>
  )
}