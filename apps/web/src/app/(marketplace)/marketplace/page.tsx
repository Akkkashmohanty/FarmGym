"use client"

import { useMemo, useState } from "react"

import ProductPagination from "@/components/marketplace/pagination/product-pagination"
import MarketplaceAnalytics from "@/components/marketplace/analytics/marketplace-analytics"
import ProductCard from "@/components/marketplace/cards/product-card"
import ProductFilters from "@/components/marketplace/filters/product-filters"
import { useDebounce } from "@/hooks/use-debounce"

import {
  useProducts,
} from "@/features/marketplace/hooks/use-products"

export default function MarketplacePage() {
  const [search, setSearch] =
    useState("")

  const debouncedSearch =
    useDebounce(search, 400)

  const [category, setCategory] =
    useState("All")

  const [sortBy, setSortBy] =
    useState("Newest")

  const [page, setPage] = useState(1)

  const LIMIT = 12

  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts({
    search:
      debouncedSearch || undefined,

    category:
      category === "All"
        ? undefined
        : category,

    page,

    limit: LIMIT,
  })

  const sortedProducts =
    useMemo(() => {
      const items = [...products]

      switch (sortBy) {
        case "Price: Low to High":
          return items.sort(
            (a, b) =>
              a.price - b.price,
          )

        case "Price: High to Low":
          return items.sort(
            (a, b) =>
              b.price - a.price,
          )

        default:
          return items
      }
    }, [products, sortBy])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading products...
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center text-red-600">
        Failed to load marketplace.
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold">
          Farming Marketplace
        </h1>

        <div className="mt-8">
          <MarketplaceAnalytics />
        </div>

        <div className="mt-10">

          <ProductFilters
            search={search}
            category={category}
            sortBy={sortBy}
            onSearchChange={
              setSearch
            }
            onCategoryChange={
              setCategory
            }
            onSortChange={
              setSortBy
            }
          />

        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {sortedProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border bg-card p-12 text-center">
              <h2 className="text-xl font-bold">
                No products found
              </h2>

              <p className="mt-2 text-muted-foreground">
                Try changing your search or selected category.
              </p>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          )}

        </div>

        <ProductPagination
          page={page}
          hasNext={products.length === LIMIT}
          onPrevious={() =>
            setPage((current) =>
              Math.max(1, current - 1),
            )
          }
          onNext={() =>
            setPage((current) => current + 1)
          }
        />

      </div>

    </main>
  )
}