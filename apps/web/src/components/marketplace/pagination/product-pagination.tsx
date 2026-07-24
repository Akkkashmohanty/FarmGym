"use client"

import { Button } from "@/components/ui/button"

interface ProductPaginationProps {
  page: number
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
}

export default function ProductPagination({
  page,
  hasNext,
  onPrevious,
  onNext,
}: ProductPaginationProps) {
  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={onPrevious}
      >
        Previous
      </Button>

      <span className="rounded-lg border bg-card px-4 py-2 font-semibold">
        Page {page}
      </span>

      <Button
        variant="outline"
        disabled={!hasNext}
        onClick={onNext}
      >
        Next
      </Button>
    </div>
  )
}
