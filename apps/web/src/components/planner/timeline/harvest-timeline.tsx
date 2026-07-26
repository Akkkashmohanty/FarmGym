"use client"

import {
  Hourglass,
  Calendar,
  Sprout,
  ShoppingBag,
  Info,
} from "lucide-react"
import { useHarvestTimeline } from "@/features/planner/hooks/use-planner"

export default function HarvestTimeline() {
  const {
    data: crops = [],
    isLoading,
    isError,
  } = useHarvestTimeline()

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Loading harvest timeline...
        </p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-card p-6">
        <p className="text-sm text-red-500">
          Failed to load harvest timeline.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold tracking-tight">Harvest Timeline</h3>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Hourglass className="h-3.5 w-3.5" />
            Growth Progression
          </span>
        </div>

        <div className="space-y-6">
          {crops.length === 0 ? (
            <p className="text-muted-foreground">No crops available yet.</p>
          ) : (
            crops.map((crop) => {
              const remainingDays = crop.remaining_days

              return (
                <div
                  key={`${crop.crop_name}-${crop.expected_harvest_date}`}
                  className="border border-border/50 bg-muted/15 rounded-2xl p-4 transition-all hover:bg-muted/30"
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/10 text-green-700">
                        <Sprout className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-bold text-foreground">{crop.crop_name}</span>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full shrink-0">
                      {crop.status}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground mb-1 font-medium">
                      <span>{new Date(crop.planting_date).toLocaleDateString()}</span>
                      <span className="text-foreground font-bold">{remainingDays} days remaining</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: `${crop.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground border-t border-border/40 pt-2.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Planted: {new Date(crop.planting_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-green-700 dark:text-green-400 font-semibold">
                      <ShoppingBag className="h-3 w-3" />
                      Harvest: {new Date(crop.expected_harvest_date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-4 flex gap-2 items-start text-[11px] text-muted-foreground leading-relaxed">
        <Info className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
        <span>Timelines are dynamically estimated based on local solar levels and average balcony heat retention.</span>
      </div>
    </div>
  )
}
