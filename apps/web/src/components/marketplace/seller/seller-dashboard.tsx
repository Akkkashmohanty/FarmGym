"use client"

import { useState } from "react"
import Link from "next/link"

import {
  Edit3,
  Minus,
  Package,
  Plus,
  Trash2,
} from "lucide-react"

import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import {
  useDeleteProduct,
  useMyProducts,
  useUpdateProduct,
} from "@/features/marketplace/hooks/use-products"

export default function SellerDashboard() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useMyProducts()

  const deleteProduct =
    useDeleteProduct()

  const updateProduct =
    useUpdateProduct()

  async function updateStock(
    id: number,
    stock: number,
  ) {
    if (stock < 0) return

    try {
      await updateProduct.mutateAsync({
        id,
        payload: {
          stock,
        },
      })

      toast.success("Inventory updated.")
    } catch {
      toast.error("Unable to update inventory.")
    }
  }

  const [deleteOpen, setDeleteOpen] =
    useState(false)

  const [selectedProduct, setSelectedProduct] =
    useState<{
      id: number
      name: string
    } | null>(null)

  async function confirmDelete() {
    if (!selectedProduct) return

    try {
      await deleteProduct.mutateAsync(
        selectedProduct.id,
      )

      toast.success(
        "Product deleted successfully.",
      )

      setDeleteOpen(false)

      setSelectedProduct(null)

    } catch {

      toast.error(
        "Unable to delete product.",
      )

    }
  }

  const totalProducts =
    products.length

  const totalStock =
    products.reduce(
      (sum, product) =>
        sum + product.stock,
      0,
    )

  const inventoryValue =
    products.reduce(
      (sum, product) =>
        sum +
        product.stock *
          product.price,
      0,
    )

  const categories =
    new Set(
      products.map(
        (product) =>
          product.category,
      ),
    ).size

  if (isLoading) {
    return (
      <div className="rounded-3xl border p-8">
        Loading seller dashboard...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border p-8 text-red-600">
        Failed to load products.
      </div>
    )
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">
            Seller Dashboard
          </h1>

          <p className="text-muted-foreground">
            Manage your marketplace products.
          </p>
        </div>

        <Link
          href="/seller/uploads"
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          Upload Product
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4">

        <StatCard
          title="Products"
          value={totalProducts}
        />

        <StatCard
          title="Inventory"
          value={totalStock}
        />

        <StatCard
          title="Categories"
          value={categories}
        />

        <StatCard
          title="Inventory Value"
          value={`₹${inventoryValue}`}
        />

      </div>

      <div className="overflow-hidden rounded-3xl border">

        <table className="w-full">

          <thead className="bg-muted">

            <tr>

              <th className="px-6 py-4 text-left">
                Product
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Price
              </th>

              <th className="text-left">
                Stock
              </th>

              <th className="text-left">
                Status
              </th>

              <th className="text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map(
              (product) => (

                <tr
                  key={product.id}
                  className="border-t"
                >

                  <td className="px-6 py-5">

                    <div>

                      <p className="font-bold">
                        {product.name}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {product.category}
                      </p>

                    </div>

                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ₹{product.price}
                  </td>

                  <td>
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          updateStock(
                            product.id,
                            product.stock - 1,
                          )
                        }
                        className="rounded border p-1 hover:bg-muted"
                        disabled={
                          updateProduct.isPending ||
                          product.stock === 0
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {product.stock}
                      </span>

                      <button
                        onClick={() =>
                          updateStock(
                            product.id,
                            product.stock + 1,
                          )
                        }
                        className="rounded border p-1 hover:bg-muted"
                        disabled={updateProduct.isPending}
                      >
                        <Plus className="h-3 w-3" />
                      </button>

                    </div>
                  </td>

                  <td>

                    {product.stock >
                    20 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        In Stock
                      </span>
                    ) : product.stock >
                      0 ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        Low Stock
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Out of Stock
                      </span>
                    )}

                  </td>

                  <td>

                    <div className="flex justify-end gap-2">

                      <Link
                        href={`/seller/edit/${product.id}`}
                        className="rounded-lg border p-2 hover:bg-muted"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedProduct({
                            id: product.id,
                            name: product.name,
                          })

                          setDeleteOpen(true)
                        }}
                        className="rounded-lg border border-red-300 p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>

                  </td>

                </tr>

              ),
            )}

            {products.length ===
              0 && (
              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  <Package className="mx-auto mb-4 h-10 w-10" />

                  No products uploaded yet.

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              Delete Product
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>
                {selectedProduct?.name}
              </strong>
              ?

              <br />
              <br />

              This action cannot be undone.

            </DialogDescription>

          </DialogHeader>

          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setDeleteOpen(false)
              }
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={
                deleteProduct.isPending
              }
            >
              Delete Product
            </Button>

          </DialogFooter>

        </DialogContent>
      </Dialog>

    </div>
  )
}

function StatCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="rounded-3xl border bg-card p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-black">
        {value}
      </h2>
    </div>
  )
}