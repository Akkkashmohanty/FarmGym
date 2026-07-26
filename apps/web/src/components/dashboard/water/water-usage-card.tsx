"use client"

import { Info, BarChart2, TrendingDown, Check } from "lucide-react"

export default function WaterUsageCard() {
  const tips = [
    "Water before 8:00 AM to prevent sun evaporation.",
    "Reuse cooking starch water for pot soil minerals.",
    "Inspect North balcony tray drainage holes.",
  ]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight">Water Monitoring</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingDown className="h-3.5 w-3.5 text-green-500" />
          -15% usage this week
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Statistics and Dial */}
        <div className="flex flex-col justify-between border border-border/50 rounded-2xl p-4 bg-muted/20">
          <div>
            <span className="text-xs text-muted-foreground font-semibold">Total Saved This Month</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-4xl font-extrabold text-foreground">520L</span>
              <span className="text-xs font-semibold text-green-600">Saved</span>
            </div>
          </div>

          <div className="mt-4 flex gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Recycled Ratio</span>
              <p className="font-semibold mt-0.5 text-sm text-blue-600">45% (Rain/AC)</p>
            </div>
            <div className="border-l border-border pl-4">
              <span className="text-muted-foreground">Irrigation Type</span>
              <p className="font-semibold mt-0.5 text-sm">Micro-Drip System</p>
            </div>
          </div>
        </div>

        {/* Visual Progress ring/bar info */}
        <div className="flex flex-col justify-between border border-border/50 rounded-2xl p-4 bg-muted/20">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BarChart2 className="h-4.5 w-4.5 text-blue-600" />
            <span>Efficiency Distribution</span>
          </div>

          <div className="mt-3 space-y-2">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Soil Absorption</span>
                <span className="font-semibold text-foreground">92%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "92%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Evaporation Loss</span>
                <span className="font-semibold text-foreground">8%</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: "8%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Irrigation Tips */}
      <div className="mt-6 border-t border-border pt-6">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-green-700 dark:text-green-400">
          <Info className="h-4 w-4" />
          <span>Smart Conservation Tips</span>
        </div>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-normal">
              <Check className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
