"use client"

import { useMemo, useState } from "react"

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Award,
} from "lucide-react"

import { useHarvestTimeline } from "@/features/planner/hooks/use-planner"

type TimelineItem = {
  crop_name: string
  planting_date: string
  expected_harvest_date: string
  status: string
}

type CalendarEvent = {
  date: Date
  crop: string
  title: string
  type: "planting" | "harvest"
  status: string
}

export default function PlantingCalendar() {
  const {
    data,
    isLoading,
  } = useHarvestTimeline()

  const [currentMonth, setCurrentMonth] = useState(
    new Date(),
  )

  const events = useMemo<CalendarEvent[]>(() => {
    const timeline = (data ?? []) as TimelineItem[]
    const items: CalendarEvent[] = []

    timeline.forEach((crop) => {
      items.push({
        crop: crop.crop_name,
        title: `Plant ${crop.crop_name}`,
        type: "planting",
        status: crop.status,
        date: new Date(crop.planting_date),
      })

      items.push({
        crop: crop.crop_name,
        title: `Harvest ${crop.crop_name}`,
        type: "harvest",
        status: crop.status,
        date: new Date(
          crop.expected_harvest_date,
        ),
      })
    })

    return items.sort(
      (a, b) =>
        a.date.getTime() -
        b.date.getTime(),
    )
  }, [data])

  const [selectedDate, setSelectedDate] =
    useState<Date | null>(null)

  const month = currentMonth.getMonth()

  const year = currentMonth.getFullYear()

  const monthLabel =
    currentMonth.toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      },
    )

  const firstDay = new Date(
    year,
    month,
    1,
  ).getDay()

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate()

  const days = Array.from(
    {
      length: daysInMonth,
    },
    (_, i) => i + 1,
  )

  const emptySlots = Array.from(
    {
      length: firstDay,
    },
    (_, i) => i,
  )

  const selectedEvents =
    selectedDate == null
      ? []
      : events.filter(
        (event) =>
          event.date.toDateString() ===
          selectedDate.toDateString(),
      )

  const previousMonth = () =>
    setCurrentMonth(
      new Date(year, month - 1, 1),
    )

  const nextMonth = () =>
    setCurrentMonth(
      new Date(year, month + 1, 1),
    )

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="grid grid-cols-7 gap-2">
            {Array.from({
              length: 35,
            }).map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-xl bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8 text-center">

        <Calendar className="mx-auto mb-4 h-10 w-10 text-green-600" />

        <h3 className="text-xl font-bold">
          No Planting Events
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Save a farm plan to populate
          the planting calendar.
        </p>

      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10">

            <Calendar className="h-5 w-5 text-green-700" />

          </span>

          <div>

            <h3 className="text-xl font-bold">
              Planting Calendar
            </h3>

            <p className="text-xs text-muted-foreground">
              Generated from your saved farm plans
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={previousMonth}
            className="rounded-lg border p-2 hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="min-w-[120px] text-center text-sm font-semibold">
            {monthLabel}
          </span>

          <button
            onClick={nextMonth}
            className="rounded-lg border p-2 hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

        </div>

      </div>

      {/* Weekdays */}

      <div className="mb-2 grid grid-cols-7 gap-2">

        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (

          <div
            key={day}
            className="py-2 text-center text-xs font-bold uppercase text-muted-foreground"
          >
            {day}
          </div>

        ))}

      </div>

      {/* Calendar */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">

          <div className="grid grid-cols-7 gap-2">

            {emptySlots.map((slot) => (

              <div
                key={slot}
                className="aspect-square"
              />

            ))}

            {days.map(day => {

              const date = new Date(
                year,
                month,
                day,
              )

              const today =
                new Date().toDateString() ===
                date.toDateString()

              const dayEvents =
                events.filter(
                  e =>
                    e.date.toDateString() ===
                    date.toDateString(),
                )

              return (

                <button
                  key={day}
                  onClick={() =>
                    setSelectedDate(date)
                  }
                  className={`aspect-square rounded-xl border p-2 text-left transition ${today
                    ? "border-green-600 ring-1 ring-green-600"
                    : "border-border hover:border-green-600"
                    }`}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-bold">
                      {day}
                    </span>

                    {dayEvents.length > 0 && (

                      <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] text-white">
                        {dayEvents.length}
                      </span>

                    )}

                  </div>

                  <div className="mt-2 space-y-1">

                    {dayEvents.slice(0, 2).map(event => (

                      <div
                        key={event.title}
                        className={`truncate rounded px-1 py-0.5 text-[9px] ${event.type === "planting"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-green-500/10 text-green-700"
                          }`}
                      >

                        {event.crop}

                      </div>

                    ))}

                  </div>

                </button>

              )

            })}

          </div>

        </div>

        {/* Details */}

        <div className="rounded-2xl border border-border bg-muted/20 p-5">

          {selectedEvents.length > 0 ? (

            <div className="space-y-4">

              <h4 className="font-bold">
                Selected Day
              </h4>

              {selectedEvents.map(event => (

                <div
                  key={`${event.title}-${event.type}`}
                  className="rounded-xl border bg-background p-4"
                >

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">

                      {event.crop}

                    </span>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${event.type === "planting"
                        ? "bg-blue-500/10 text-blue-700"
                        : "bg-green-500/10 text-green-700"
                        }`}
                    >

                      {event.type}

                    </span>

                  </div>

                  <p className="mt-2 text-sm">

                    {event.title}

                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">

                    {event.date.toLocaleDateString()}

                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">

                    Status: {event.status}

                  </p>

                </div>

              ))}

            </div>

          ) : (

            <div className="space-y-4">

              <h4 className="font-bold">

                Upcoming Events

              </h4>

              {events.slice(0, 6).map(event => (

                <div
                  key={`${event.crop}-${event.type}-${event.date}`}
                  className="flex items-start gap-3 rounded-xl border bg-background p-3"
                >

                  {event.type === "planting" ? (

                    <Sprout className="mt-0.5 h-4 w-4 text-blue-600" />

                  ) : (

                    <Award className="mt-0.5 h-4 w-4 text-green-600" />

                  )}

                  <div>

                    <p className="text-sm font-semibold">

                      {event.crop}

                    </p>

                    <p className="text-xs text-muted-foreground">

                      {event.title}

                    </p>

                    <p className="text-[11px] text-muted-foreground">

                      {event.date.toLocaleDateString()}

                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  )
}