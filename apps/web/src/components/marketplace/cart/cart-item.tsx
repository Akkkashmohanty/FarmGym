"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"

import {
  CartItem as CartProduct,
  useCartStore,
} from "@/features/marketplace/store/cart.store"

interface Props {
  item: CartProduct
}

export default function CartItem({ item }: Props) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore()

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">

      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-muted">
          <Image
            src={
              item.image_url ??
              "/images/product-placeholder.png"
            }
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="font-bold">
            {item.name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {item.category}
          </p>

          <p className="font-semibold text-emerald-600">
            ₹{item.price}
          </p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">

        <button
          onClick={() =>
            decreaseQuantity(item.id)
          }
          className="rounded-lg border p-2 transition hover:bg-muted"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-8 text-center font-bold">
          {item.quantity}
        </span>

        <button
          onClick={() =>
            increaseQuantity(item.id)
          }
          className="rounded-lg border p-2 transition hover:bg-muted"
        >
          <Plus className="h-4 w-4" />
        </button>

        <button
          onClick={() =>
            removeFromCart(item.id)
          }
          className="ml-4 rounded-lg border border-red-300 p-2 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950"
        >
          <Trash2 className="h-4 w-4" />
        </button>

      </div>

      {/* Total */}
      <div className="text-right">
        <p className="text-sm text-muted-foreground">
          Total
        </p>

        <p className="text-lg font-bold text-emerald-600">
          ₹{item.price * item.quantity}
        </p>
      </div>

    </div>
  )
}