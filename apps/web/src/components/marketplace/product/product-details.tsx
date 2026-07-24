"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

import { ShoppingCart } from "lucide-react"

import { toast } from "sonner"

import ProductCard from "@/components/marketplace/cards/product-card"
import ReviewsSection from "@/components/marketplace/reviews/reviews-section"

import {
  useProduct,
  useProducts,
} from "@/features/marketplace/hooks/use-products"

import { useCartStore } from "@/features/marketplace/store/cart.store"

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({
  productId,
}: ProductDetailsProps) {
  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(productId)

  const {
    data: products,
  } = useProducts()

  const { addToCart } = useCartStore()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!product) return

    addToCart(product)

    toast.success(
      `${product.name} added to cart!`,
      {
        description:
          "Manage quantities in your shopping cart.",
      },
    )
  }

  const handleBuyNow = () => {
    if (!product) return

    addToCart(product)
    router.push("/checkout")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        Loading product...
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </div>
    )
  }

    return (
    <>
      <div className="grid gap-10 lg:grid-cols-2">

        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src={
              product.image_url ??
              "/images/product-placeholder.png"
            }
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">

          <span className="inline-flex w-fit rounded-full bg-green-500/10 px-4 py-2 text-xs font-bold text-green-600">
            {product.category}
          </span>

          <h1 className="mt-4 text-5xl font-bold">
            {product.name}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-6 space-y-2 text-sm text-muted-foreground">

            <p>
              SKU: {product.sku}
            </p>

            {product.brand && (
              <p>
                Brand: {product.brand}
              </p>
            )}

            <p>
              Unit: {product.unit}
            </p>

            <p>
              Stock Available: {product.stock}
            </p>

          </div>

          <div className="mt-8">
            <span className="text-4xl font-bold text-emerald-600">
              ₹{product.price}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={handleAddToCart}
              className="rounded-2xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add To Cart
              </div>
            </button>

            <button
              onClick={handleBuyNow}
              className="rounded-2xl border border-border px-8 py-3 font-semibold transition hover:bg-muted"
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

      <div className="mt-16">
        <ReviewsSection />
      </div>

      <div className="mt-16">

        <h2 className="text-3xl font-bold">
          Related Products
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {products
            ?.filter(
              (item) =>
                item.id !== product.id &&
                item.category === product.category,
            )
            .slice(0, 4)
            .map((item) => (
              <ProductCard
                key={item.id}
                product={item}
              />
            ))}

        </div>

      </div>
    </>
  )
}