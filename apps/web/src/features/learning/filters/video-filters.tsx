"use client"

import { Search } from "lucide-react"

export default function VideoFilters() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>All States</option>
        <option>Karnataka</option>
        <option>Odisha</option>
      </select>

      <select className="h-12 rounded-2xl border bg-background px-4">
        <option>All Languages</option>
        <option>Kannada</option>
        <option>Hindi</option>
      </select>

      <div className="relative h-12 flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search tutorials"
          className="h-12 w-full rounded-2xl border bg-background pl-11 pr-4"
        />
      </div>
    </div>
  )
}