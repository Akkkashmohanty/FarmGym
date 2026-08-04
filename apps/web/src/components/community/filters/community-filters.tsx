"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

interface Props {
  search: string
  crop: string
  state: string

  onSearchChange: (value: string) => void
  onCropChange: (value: string) => void
  onStateChange: (value: string) => void
}

export default function CommunityFilters({
  search,
  crop,
  state,
  onSearchChange,
  onCropChange,
  onStateChange,
}: Props) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search posts..."
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
        />
      </div>

      <Input
        placeholder="Crop"
        value={crop}
        onChange={(e) =>
          onCropChange(e.target.value)
        }
      />

      <Input
        placeholder="State"
        value={state}
        onChange={(e) =>
          onStateChange(e.target.value)
        }
      />
    </div>
  )
}