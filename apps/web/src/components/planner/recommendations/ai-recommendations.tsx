"use client"

import { useState, useEffect } from "react"
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Droplets,
  Sun,
  Loader2,
  AlertCircle,
} from "lucide-react"

import { useFarmAdvice } from "@/features/planner/hooks/use-planner"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const seasons = ["Spring", "Summer", "Monsoon", "Autumn", "Winter"]

const sunlightOptions = [
  "Full Sun",
  "Partial Sun",
]

const waterOptions = [
  "Low",
  "Medium",
  "High",
]

export default function AIRecommendations() {
  const [season, setSeason] = useState("Summer")
  const [sunlight, setSunlight] = useState("Full")
  const [water, setWater] = useState("Medium")

  const {
    mutate,
    data,
    isPending,
    error,
  } = useFarmAdvice()

  useEffect(() => {
    if (!season || !sunlight || !water) return

    mutate({
      city: "Bengaluru",
      crop_name: "Tomato",
      garden_type: "Balcony",
      garden_size: "Medium",
      sunlight,
      water_availability: water,
      temperature: 28,
      humidity: 65,
      season,

      experience_level: "Beginner",
      goals: ["Healthy Food"],
      preferred_crops: [],
      avoid_crops: [],
      organic_only: false,
    })
  }, [
    season,
    sunlight,
    water,
    mutate,
  ])

  return (
    <div className="rounded-3xl border border-green-600/20 bg-card p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10">
            <Sparkles className="h-5 w-5 text-green-600" />
          </span>

          <div>
            <h3 className="text-xl font-bold">
              AI Crop Recommendations
            </h3>

            <p className="text-xs text-muted-foreground">
              Personalized recommendations from your Farm Planner
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            mutate({
              city: "Bengaluru",
              crop_name: "Tomato",
              garden_type: "Balcony",
              garden_size: "Medium",
              sunlight,
              water_availability: water,
              temperature: 28,
              humidity: 65,
              season,
              experience_level: "Beginner",
              goals: ["Healthy Food"],
              preferred_crops: [],
              avoid_crops: [],
              organic_only: false,
            })
          }}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
        >
          Refresh
        </button>

      </div>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Season
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={season}
            onChange={(e) =>
              setSeason(e.target.value)
            }
          >
            {seasons.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Sunlight
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={sunlight}
            onChange={(e) =>
              setSunlight(e.target.value)
            }
          >
            {sunlightOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Water
          </label>

          <select
            className="mt-2 w-full rounded-xl border bg-background px-3 py-2"
            value={water}
            onChange={(e) =>
              setWater(e.target.value)
            }
          >
            {waterOptions.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Loading */}

      {isPending && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      )}

      {/* Error */}

      {!isPending && error && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
          <h4 className="font-semibold">Unable to load recommendations</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Please try refreshing or changing the filters.
          </p>
        </div>
      )}

      {/* Empty */}

      {!isPending &&
        !error &&
        !data?.advice && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Leaf className="h-10 w-10 text-green-600 mb-3" />
            <h4 className="font-semibold">
              No matching crops found
            </h4>

            <p className="text-sm text-muted-foreground mt-2">
              Try changing season, sunlight or water availability.
            </p>
          </div>
        )}

      {/* Dashboard */}

      {!isPending &&
        !error &&
        data?.advice && (
          <div className="mt-6 space-y-6">
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.advice.summary}
                </p>
              </CardContent>
            </Card>

            {/* Crops & Companions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Recommended Crops
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {data.advice.recommended_crops?.map((crop, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Companion Plants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {data.advice.companion_plants?.map((plant, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {plant}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Watering & Fertilizer */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    Watering Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {data.advice.watering_strategy}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {data.advice.watering_schedule?.map((schedule, i) => (
                      <li key={i}>{schedule}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    Fertilizer Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {data.advice.fertilizer_plan}
                  </p>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {data.advice.fertilizer_schedule?.map((schedule, i) => (
                      <li key={i}>{schedule}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Harvest & Sustainability */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-orange-500" />
                    Harvest Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {data.advice.harvest_timeline}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    Sustainability Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {data.advice.sustainability_tips?.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Warnings & Next Actions */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Seasonal Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {data.advice.seasonal_warnings?.map((warning, i) => (
                      <li
                        key={i}
                        className="text-red-600/80 dark:text-red-400/80"
                      >
                        {warning}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-blue-500" />
                    Next Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {data.advice.next_actions?.map((action, i) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      {/* Footer */}

      <div className="mt-8 border-t border-border pt-4">
        <div className="flex items-start gap-2 rounded-xl bg-green-50 dark:bg-green-950/20 p-4">
          <Sparkles className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />

          <div>
            <p className="text-sm font-semibold">
              Smart Recommendation Engine
            </p>

            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              Recommendations are calculated using season compatibility,
              sunlight requirements and water availability from your crop
              database. Crops with the highest recommendation score are shown
              first.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}