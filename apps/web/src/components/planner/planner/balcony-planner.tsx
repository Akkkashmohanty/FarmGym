"use client"

import { useMemo, useState } from "react"
import {
  LayoutGrid,
  Sprout,
  Sun,
  Info,
  Droplets,
  CalendarDays,
} from "lucide-react"

import { useFarmPlans } from "@/features/planner/hooks/use-planner"

type FarmPlanCrop = {
  id: number
  crop_name: string
  planting_date: string
  expected_harvest_date: string
  watering_frequency: string
  status: string
}

type FarmPlan = {
  id: number
  city: string
  garden_type: string
  garden_size: string
  sunlight: string
  water_availability: string
  status: string
  created_at: string
  crops: FarmPlanCrop[]
}

export default function BalconyPlanner() {
  const {
    data,
    isLoading,
  } = useFarmPlans()

  const allCrops = useMemo(() => {
    const farmPlans = (data ?? []) as FarmPlan[]

    return farmPlans.flatMap((plan) =>
      plan.crops.map((crop) => ({
        ...crop,
        plan,
      })),
    )
  }, [data])

  const farmPlans = (data ?? []) as FarmPlan[]

  const [selectedCropId, setSelectedCropId] =
    useState<number | null>(null)

  const selectedCrop =
    allCrops.find(
      (crop) => crop.id === selectedCropId,
    ) ?? null

  const totalSlots = Math.max(
    allCrops.length,
    6,
  )

  const occupiedSlots =
    allCrops.length

  const efficiency =
    totalSlots === 0
      ? 0
      : Math.round(
        (occupiedSlots / totalSlots) * 100,
      )

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-64 rounded bg-muted" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-xl bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (allCrops.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">
        <Sprout className="mx-auto mb-4 h-10 w-10 text-green-600" />

        <h3 className="text-xl font-bold">
          No Saved Farm Plans
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Generate a farm plan and click
          <strong> Save Farm Plan </strong>
          to see it here.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">
          Balcony Layout Planner
        </h3>

        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <LayoutGrid className="h-4 w-4" />
          {occupiedSlots} Saved Crops
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Crop Grid */}

        <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
          {allCrops.map((crop) => {
            const selected =
              selectedCropId === crop.id

            return (
              <button
                key={crop.id}
                onClick={() =>
                  setSelectedCropId(crop.id)
                }
                className={`rounded-2xl border p-4 text-left transition-all ${selected
                  ? "border-green-600 ring-1 ring-green-600"
                  : "border-border hover:border-green-600"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-green-500/10 p-2">
                    <Sprout className="h-4 w-4 text-green-700" />
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-bold ${crop.status === "ACTIVE"
                      ? "bg-green-500/10 text-green-700"
                      : "bg-muted text-muted-foreground"
                      }`}
                  >
                    {crop.status}
                  </span>
                </div>

                <h4 className="mt-4 text-base font-bold">
                  {crop.crop_name}
                </h4>

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">

                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Planted: {crop.planting_date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    {crop.plan.sunlight}
                  </div>

                  <div className="flex items-center gap-2">
                    <Droplets className="h-3.5 w-3.5 text-blue-500" />
                    {crop.watering_frequency}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Inspector */}

        <div className="rounded-2xl border border-border bg-muted/20 p-5">

          {selectedCrop ? (
            <div className="space-y-5">

              <div>

                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Selected Crop
                </span>

                <h4 className="mt-1 text-lg font-bold">
                  {selectedCrop.crop_name}
                </h4>

              </div>

              <div className="space-y-3 rounded-xl border bg-background p-4 text-sm">

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    City
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.plan.city}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Garden
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.plan.garden_type}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Size
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.plan.garden_size}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Sunlight
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.plan.sunlight}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Water
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.plan.water_availability}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Planting
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.planting_date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Harvest
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.expected_harvest_date}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Watering
                  </span>

                  <span className="font-semibold">
                    {selectedCrop.watering_frequency}
                  </span>
                </div>

              </div>

            </div>
          ) : (
            <div className="space-y-5">

              <div>

                <span className="text-[10px] font-bold uppercase text-muted-foreground">
                  Planner Metrics
                </span>

                <h4 className="mt-1 text-lg font-bold">
                  Farm Summary
                </h4>

              </div>

              <div className="rounded-xl border bg-background p-4 text-center">

                <div className="text-3xl font-extrabold text-green-600">
                  {efficiency}%
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  Space Utilization
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">

                  <div
                    className="h-full rounded-full bg-green-600"
                    style={{
                      width: `${efficiency}%`,
                    }}
                  />

                </div>

              </div>

              <div className="space-y-3 rounded-xl border bg-background p-4 text-sm">

                <div className="flex items-center justify-between">
                  <span>Total Farm Plans</span>
                  <strong>{farmPlans.length}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span>Total Crops</span>
                  <strong>{allCrops.length}</strong>
                </div>

                <div className="flex items-center justify-between">
                  <span>Garden Types</span>
                  <strong>
                    {
                      new Set(
                        farmPlans.map(
                          (x) => x.garden_type,
                        ),
                      ).size
                    }
                  </strong>
                </div>

              </div>

              <div className="flex items-start gap-2 rounded-xl bg-green-500/5 p-3 text-xs text-muted-foreground">

                <Info className="mt-0.5 h-4 w-4 text-green-600" />

                <span>
                  Select any saved crop to view
                  complete planting details.
                </span>

              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}