"use client"

import { useState } from "react"
import { Search } from "lucide-react"

const categories = ["All", "Terrace Farming", "Balcony Setup", "Organic Pest Control", "Hydroponics"]
const states = ["All States", "Karnataka", "Tamil Nadu", "Maharashtra", "Delhi"]
const languages = ["All Languages", "Kannada", "Tamil", "Marathi", "English", "Hindi"]

export default function VideoFilters() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [search, setSearch] = useState("")
  const [selectedState, setSelectedState] = useState("All States")
  const [selectedLang, setSelectedLang] = useState("All Languages")

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search urban farming tutorials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>

        {/* Dropdowns selectors */}
        <div className="flex w-full sm:w-auto items-center gap-3">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="h-11 border border-border bg-background rounded-xl px-3 text-xs font-semibold focus:outline-none cursor-pointer flex-1 sm:flex-none"
          >
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="h-11 border border-border bg-background rounded-xl px-3 text-xs font-semibold focus:outline-none cursor-pointer flex-1 sm:flex-none"
          >
            {languages.map((lng) => (
              <option key={lng} value={lng}>
                {lng}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Row */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-xl border font-bold transition-all ${
                isActive
                  ? "bg-green-600 border-green-600 text-white shadow-sm"
                  : "bg-background border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
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
