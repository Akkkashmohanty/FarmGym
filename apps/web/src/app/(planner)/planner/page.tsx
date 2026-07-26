"use client"

import {
  CalendarDays,
  Leaf,
  Sprout,
  Droplets,
} from "lucide-react"

import ProtectedRoute from "@/components/auth/protected-route"

import PlantingCalendar from "@/components/planner/calendar/planting-calendar"
import WeatherWidget from "@/components/planner/weather/weather-widget"
import ReminderList from "@/components/planner/reminders/reminder-list"
import FarmPlanGenerator from "@/components/planner/planner/farm-plan-generator"
import BalconyPlanner from "@/components/planner/planner/balcony-planner"
import HarvestTimeline from "@/components/planner/timeline/harvest-timeline"
import AIRecommendations from "@/components/planner/recommendations/ai-recommendations"

import WateringSchedule from "@/features/planner/weather/watering-schedule"
import CropLifecycleCard from "@/features/planner/lifecycle/crop-lifecycle-card"
import CropHealthCard from "@/features/planner/analytics/crop-health-card"
import SustainabilityCard from "@/features/planner/analytics/sustainability-card"

import { useDashboardSummary } from "@/features/planner/hooks/use-planner"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function PlannerContent() {
  const {
    data: dashboard,
    isLoading,
  } = useDashboardSummary()

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-background to-background p-6">
      <div className="mx-auto max-w-7xl space-y-10">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-700 via-emerald-600 to-green-500 p-8 text-white shadow-2xl">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

            <div className="max-w-3xl">

              <div className="mb-5 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur">
                  🌱 AI Powered
                </span>

                <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur">
                  📅 Seasonal Planning
                </span>

                <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur">
                  🌦 Live Weather
                </span>

              </div>

              <h1 className="text-5xl font-black tracking-tight">
                AI Farm Planner
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50">
                Create intelligent farm plans, monitor crop progress,
                organize watering schedules and receive AI-powered
                recommendations designed for urban farming.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                <p className="text-sm text-emerald-100">
                  Active Crops
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {isLoading ? "--" : dashboard?.active_crops ?? 0}
                </h2>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                <p className="text-sm text-emerald-100">
                  Water Today
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {isLoading ? "--" : dashboard?.water_today ?? 0}
                </h2>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                <p className="text-sm text-emerald-100">
                  Harvest Soon
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {isLoading ? "--" : dashboard?.harvest_soon ?? 0}
                </h2>

              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                <p className="text-sm text-emerald-100">
                  Planner Tasks
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {isLoading ? "--" : dashboard?.planner_tasks ?? 0}
                </h2>

              </div>

            </div>

          </div>

        </section>

        {/* ================= KPI CARDS ================= */}

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm font-medium">
                Active Crops
              </CardTitle>

              <Sprout className="h-5 w-5 text-emerald-600" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {isLoading ? "--" : dashboard?.active_crops ?? 0}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Currently growing in your garden
              </p>

            </CardContent>

          </Card>

          <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm font-medium">
                Water Today
              </CardTitle>

              <Droplets className="h-5 w-5 text-sky-600" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {isLoading ? "--" : dashboard?.water_today ?? 0}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Plants scheduled today
              </p>

            </CardContent>

          </Card>

          <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm font-medium">
                Harvest Soon
              </CardTitle>

              <Leaf className="h-5 w-5 text-green-600" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {isLoading ? "--" : dashboard?.harvest_soon ?? 0}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Ready within 7 days
              </p>

            </CardContent>

          </Card>

          <Card className="rounded-2xl shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

            <CardHeader className="flex flex-row items-center justify-between pb-2">

              <CardTitle className="text-sm font-medium">
                Planner Tasks
              </CardTitle>

              <CalendarDays className="h-5 w-5 text-orange-600" />

            </CardHeader>

            <CardContent>

              <div className="text-4xl font-bold">
                {isLoading ? "--" : dashboard?.planner_tasks ?? 0}
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Scheduled this month
              </p>

            </CardContent>

          </Card>

        </section>

        {/* ================= OVERVIEW ================= */}

        <section className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              Overview
            </h2>

            <p className="text-muted-foreground">
              Monitor seasonal conditions and upcoming planting activities.
            </p>

          </div>

          <div className="grid gap-6 xl:grid-cols-3">

            <div className="xl:col-span-2">
              <PlantingCalendar />
            </div>

            <WeatherWidget />

          </div>

        </section>

        {/* PART 2 STARTS HERE */}

                {/* ================= PLANNING ================= */}

        <section className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              Planning
            </h2>

            <p className="text-muted-foreground">
              Generate AI-powered crop plans and receive personalized
              recommendations tailored to your growing conditions.
            </p>

          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <FarmPlanGenerator />
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <AIRecommendations />
          </div>

        </section>

        {/* ================= OPERATIONS ================= */}

        <section className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              Operations
            </h2>

            <p className="text-muted-foreground">
              Manage your daily gardening workflow and upcoming harvests.
            </p>

          </div>

          <div className="grid gap-6 lg:grid-cols-3">

            <div className="rounded-3xl border bg-card shadow-sm">
              <ReminderList />
            </div>

            <div className="rounded-3xl border bg-card shadow-sm">
              <WateringSchedule />
            </div>

            <div className="rounded-3xl border bg-card shadow-sm">
              <HarvestTimeline />
            </div>

          </div>

        </section>

        {/* ================= INSIGHTS ================= */}

        <section className="space-y-6">

          <div>

            <h2 className="text-2xl font-bold tracking-tight">
              Insights
            </h2>

            <p className="text-muted-foreground">
              Understand crop health, sustainability metrics and optimize
              your growing strategy.
            </p>

          </div>

          <div className="grid gap-6 xl:grid-cols-2">

            <div className="rounded-3xl border bg-card shadow-sm">
              <BalconyPlanner />
            </div>

            <div className="rounded-3xl border bg-card shadow-sm">
              <CropLifecycleCard />
            </div>

            <div className="rounded-3xl border bg-card shadow-sm">
              <CropHealthCard />
            </div>

            <div className="rounded-3xl border bg-card shadow-sm">
              <SustainabilityCard />
            </div>

          </div>

        </section>

      </div>

    </main>
  )
}

export default function PlannerPage() {
  return (
    <ProtectedRoute>
      <PlannerContent />
    </ProtectedRoute>
  )
}