"use client"

import ProductEditForm from "@/components/marketplace/seller/product-edit-form"

interface Props {
  params: {
    id: string
  }
}

export default function EditProductPage({
  params,
}: Props) {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <ProductEditForm
          productId={Number(params.id)}
        />
      </div>
    </main>
  )
}