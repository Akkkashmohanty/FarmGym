"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  MapPin,
  Droplets,
  Trees,
  Leaf,
} from "lucide-react";

import {
  useFarmPlan,
  useCreateFarmPlan,
} from "@/features/planner/hooks/use-planner";

type GeneratedCropPlan = {
  crop_id: number;
  crop_name: string;
  score: number;

  planting_date: string;
  expected_harvest_date: string;

  watering_frequency: string;

  watering_schedule: {
    day: string;
    time: string;
  }[];

  timeline: {
    day: number;
    title: string;
    description: string;
  }[];

  tasks: {
    day: number;
    title: string;
    description?: string;
  }[];

  sustainability_tips: string[];

  progress: {
    current_day: number;
    total_days: number;
    remaining_days: number;
  };
};

type GeneratorResponse = {
  recommendations: GeneratedCropPlan[];
};

const gardenTypes = ["Balcony", "Terrace", "Backyard"];

const gardenSizes = ["Small", "Medium", "Large"];

const sunlightOptions = ["Full Sun", "Partial Sun"];

const waterOptions = ["Low", "Medium", "High"];

export default function FarmPlanGenerator() {
  const [city, setCity] = useState("Bengaluru");

  const [gardenType, setGardenType] = useState("Balcony");

  const [gardenSize, setGardenSize] = useState("Medium");

  const [sunlight, setSunlight] = useState("Full Sun");

  const [waterAvailability, setWaterAvailability] = useState("Medium");

  const [result, setResult] = useState<GeneratorResponse | null>(null);

  const { mutate, isPending, isError, error } = useFarmPlan();

  const { mutate: createFarmPlan, isPending: isSaving } = useCreateFarmPlan();

  const generatePlan = () => {
    mutate(
      {
        city,
        garden_type: gardenType,
        garden_size: gardenSize,
        sunlight,
        water_availability: waterAvailability,
      },
      {
        onSuccess: (data) => {
          setResult(data as GeneratorResponse);
        },
      },
    );
  };

  const savePlan = (crop: GeneratedCropPlan) => {
    createFarmPlan({
      city,
      garden_type: gardenType,
      garden_size: gardenSize,
      sunlight,
      water_availability: waterAvailability,
      crops: [
        {
          crop_name: crop.crop_name,
          planting_date: crop.planting_date,
          expected_harvest_date: crop.expected_harvest_date,
          watering_frequency: crop.watering_frequency,
        },
      ],
    });
  };

  return (
    <div className="border-border bg-card rounded-3xl border p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
            <Sparkles className="h-5 w-5 text-green-600" />
          </span>

          <div>
            <h3 className="text-xl font-bold">AI Farm Plan Generator</h3>

            <p className="text-muted-foreground text-xs">
              Generate a complete farming plan using your environment.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* City */}

        <div>
          <label className="text-muted-foreground text-xs font-semibold">
            City
          </label>

          <div className="relative mt-2">
            <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />

            <input
              value={city}
              disabled={isPending}
              onChange={(e) => setCity(e.target.value)}
              className="bg-background w-full rounded-xl border py-2 pr-3 pl-10"
            />
          </div>
        </div>

        {/* Garden */}

        <div>
          <label className="text-muted-foreground text-xs font-semibold">
            Garden
          </label>

          <select
            value={gardenType}
            disabled={isPending}
            onChange={(e) => setGardenType(e.target.value)}
            className="bg-background mt-2 w-full rounded-xl border px-3 py-2"
          >
            {gardenTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Size */}

        <div>
          <label className="text-muted-foreground text-xs font-semibold">
            Size
          </label>

          <select
            value={gardenSize}
            disabled={isPending}
            onChange={(e) => setGardenSize(e.target.value)}
            className="bg-background mt-2 w-full rounded-xl border px-3 py-2"
          >
            {gardenSizes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Sunlight */}

        <div>
          <label className="text-muted-foreground text-xs font-semibold">
            Sunlight
          </label>

          <select
            value={sunlight}
            disabled={isPending}
            onChange={(e) => setSunlight(e.target.value)}
            className="bg-background mt-2 w-full rounded-xl border px-3 py-2"
          >
            {sunlightOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Water */}

        <div>
          <label className="text-muted-foreground text-xs font-semibold">
            Water
          </label>

          <select
            value={waterAvailability}
            disabled={isPending}
            onChange={(e) => setWaterAvailability(e.target.value)}
            className="bg-background mt-2 w-full rounded-xl border px-3 py-2"
          >
            {waterOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={generatePlan}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Farm Plan
            </>
          )}
        </button>
      </div>

      {isError && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600">
          {(error as Error)?.message ?? "Unable to generate farm plan."}
        </div>
      )}

      {result && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-bold">
              Generated Crop Recommendations
            </h4>

            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-700">
              {result.recommendations.length} Crops
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {result.recommendations.map((crop) => (
              <div
                key={crop.crop_id}
                className="bg-background rounded-2xl border border-green-600/10 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-lg font-bold">{crop.crop_name}</h5>

                    <p className="text-muted-foreground mt-1 text-xs">
                      AI Recommendation Score
                    </p>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-bold text-green-700">
                    {crop.score}%
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-muted/20 rounded-xl border p-3">
                    <p className="text-muted-foreground text-xs">
                      Planting Date
                    </p>

                    <p className="mt-1 font-semibold">{crop.planting_date}</p>
                  </div>

                  <div className="bg-muted/20 rounded-xl border p-3">
                    <p className="text-muted-foreground text-xs">
                      Harvest Date
                    </p>

                    <p className="mt-1 font-semibold">
                      {crop.expected_harvest_date}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-xl border border-blue-500/10 bg-blue-500/5 p-3">
                  <Droplets className="h-5 w-5 text-blue-500" />

                  <div>
                    <p className="text-muted-foreground text-xs">
                      Watering Frequency
                    </p>

                    <p className="font-semibold">{crop.watering_frequency}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>

                    <span className="text-muted-foreground text-xs">
                      Day {crop.progress.current_day} /{" "}
                      {crop.progress.total_days}
                    </span>
                  </div>

                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{
                        width: `${(crop.progress.current_day /
                          crop.progress.total_days) *
                          100
                          }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />

                    <h6 className="text-sm font-bold">Sustainability Tips</h6>
                  </div>

                  <ul className="space-y-2">
                    {crop.sustainability_tips.map((tip, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground rounded-lg bg-green-500/5 p-2 text-xs"
                      >
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Trees className="h-4 w-4 text-emerald-600" />

                    <h6 className="text-sm font-bold">Timeline</h6>
                  </div>

                  <div className="space-y-2">
                    {crop.timeline.map((item) => (
                      <div
                        key={`${crop.crop_id}-${item.day}`}
                        className="rounded-lg border p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Day {item.day}</span>

                          <span className="text-muted-foreground text-xs">
                            {item.title}
                          </span>
                        </div>

                        <p className="text-muted-foreground mt-1 text-xs">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => savePlan(crop)}
                    disabled={isSaving}
                    className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
                  >
                    {isSaving ? "Saving..." : "Save Farm Plan"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
