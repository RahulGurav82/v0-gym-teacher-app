"use client"

import { useState } from "react"
import { Calendar, ChevronRight, Dumbbell } from "lucide-react"
import { ClassCard } from "@/components/class-card"
import { RescheduleModal } from "@/components/reschedule-modal"
import { useClasses, type GymClass } from "@/lib/classes-context"

export default function HomePage() {
  const { classes, requestReschedule } = useClasses()
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null)

  const upcomingClasses = classes.filter((c) => c.status === "upcoming" || c.status === "reschedule-pending")

  const todayClasses = upcomingClasses.filter((c) => {
    const today = new Date().toISOString().split("T")[0]
    return c.date === today || c.date === "2025-01-06" // Demo: show first date as "today"
  })

  const handleRescheduleSubmit = (newDate: string, newTime: string, reason: string) => {
    if (selectedClass) {
      requestReschedule(selectedClass.id, newDate, newTime, reason)
      setSelectedClass(null)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Dumbbell className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Good Morning</h1>
                <p className="text-sm text-muted-foreground">Coach Mike</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-bold text-primary">{todayClasses.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Today</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{upcomingClasses.length}</p>
            <p className="text-xs text-muted-foreground mt-1">This Week</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 text-center">
            <p className="text-2xl font-bold text-accent">
              {classes.filter((c) => c.status === "reschedule-pending").length}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Pending</p>
          </div>
        </div>

        {/* Today's Classes */}
        {todayClasses.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Today&apos;s Classes</h2>
              <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                View all <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {todayClasses.map((gymClass) => (
                <ClassCard
                  key={gymClass.id}
                  gymClass={gymClass}
                  onReschedule={gymClass.status === "upcoming" ? () => setSelectedClass(gymClass) : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Classes */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Classes</h2>
          </div>
          <div className="space-y-3">
            {upcomingClasses
              .filter((c) => !todayClasses.includes(c))
              .map((gymClass) => (
                <ClassCard
                  key={gymClass.id}
                  gymClass={gymClass}
                  onReschedule={gymClass.status === "upcoming" ? () => setSelectedClass(gymClass) : undefined}
                />
              ))}
          </div>
        </section>
      </main>

      {/* Reschedule Modal */}
      {selectedClass && (
        <RescheduleModal
          gymClass={selectedClass}
          onClose={() => setSelectedClass(null)}
          onSubmit={handleRescheduleSubmit}
        />
      )}
    </div>
  )
}
