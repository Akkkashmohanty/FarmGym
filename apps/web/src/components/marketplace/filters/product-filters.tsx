"use client"

import {
  Search,
  SlidersHorizontal,
} from "lucide-react"

const categories = [
  "All",
  "Seeds",
  "Soil",
  "Tools",
  "Fertilizers",
  "Pots",
]

const sortOptions = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
]

interface ProductFiltersProps {
  search: string
  category: string
  sortBy: string

  onSearchChange: (
    value: string,
  ) => void

  onCategoryChange: (
    value: string,
  ) => void

  onSortChange: (
    value: string,
  ) => void
}

export default function ProductFilters({
  search,
  category,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">

      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

        <div className="relative w-full sm:max-w-md">

          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(
                e.target.value,
              )
            }
            placeholder="Search crop seeds, tools, organic fertilizers..."
            className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />

        </div>

        <div className="flex h-11 w-full items-center gap-2 rounded-xl border border-border bg-background px-3 sm:w-auto">

          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value,
              )
            }
            className="h-full flex-1 cursor-pointer appearance-none border-0 bg-transparent pr-6 text-xs font-semibold focus:outline-none"
          >
            {sortOptions.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ),
            )}
          </select>

        </div>

      </div>

      <div className="flex flex-wrap gap-2 pt-2">

        {categories.map((cat) => {

          const isActive =
            category === cat

          return (
            <button
              key={cat}
              onClick={() =>
                onCategoryChange(cat)
              }
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "border-green-600 bg-green-600 text-white shadow-sm"
                  : "border-border/80 bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          )
        })}

      </div>

    </div>
  )
}