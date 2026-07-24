"use client"

import Image from "next/image"
import Link from "next/link"

import { ShoppingCart } from "lucide-react"

import { toast } from "sonner"

import { Product } from "@/features/marketplace/types/product.types"
import { useCartStore } from "@/features/marketplace/store/cart.store"

interface Props {
  product: Product
}

export default function ProductCard({
  product,
}: Props) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart(product)

    toast.success(
      `${product.name} added to cart!`,
      {
        description:
          "Manage quantities in your shopping cart.",
      },
    )
  }

  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/marketplace/${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={
              product.image_url ??
              "/images/product-placeholder.png"
            }
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute bottom-3 left-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <h3 className="line-clamp-1 text-lg font-bold">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-emerald-600">
            ₹{product.price}
          </span>

          <span className="text-sm text-muted-foreground">
            Stock {product.stock}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}