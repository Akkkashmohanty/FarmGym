"use client"

import { useFarmPlans } from "../hooks/use-planner"

interface Crop {
  id: number
  crop_name: string
  status: string
}

interface FarmPlan {
  crops?: Crop[]
}

export default function CropHealthCard() {
  const { data: farmPlans, isLoading } = useFarmPlans()

  const crops =
    farmPlans?.flatMap(
      (plan: FarmPlan) => plan.crops ?? [],
    ) ?? []

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-card p-6">
        <h3 className="text-2xl font-semibold">
          Crop Health Tracking
        </h3>

        <p className="mt-6 text-muted-foreground">
          Loading crop health...
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border bg-card p-6">
      <h3 className="text-2xl font-semibold">
        Crop Health Tracking
      </h3>

      <div className="mt-6 space-y-5">
        {crops.length === 0 ? (
          <p className="text-muted-foreground">
            No crops added yet.
          </p>
        ) : (
          crops.map((crop: Crop) => (
            <div
              key={crop.id}
              className="flex items-center justify-between"
            >
              <span>{crop.crop_name}</span>

              <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-600">
                {crop.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}