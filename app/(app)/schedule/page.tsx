"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClassCard } from "@/components/class-card"
import { RescheduleModal } from "@/components/reschedule-modal"
import { useClasses, type GymClass } from "@/lib/classes-context"
import { cn } from "@/lib/utils"

export default function SchedulePage() {
  const { classes, requestReschedule } = useClasses()
  const [selectedClass, setSelectedClass] = useState<GymClass | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-06")

  // Generate week dates
  const getWeekDates = () => {
    const dates = []
    const startDate = new Date("2025-01-06")
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push({
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: date.getDate(),
      })
    }
    return dates
  }

  const weekDates = getWeekDates()

  const filteredClasses = classes.filter(
    (c) => c.date === selectedDate && (c.status === "upcoming" || c.status === "reschedule-pending"),
  )

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
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-foreground">Schedule</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-muted-foreground">Jan 2025</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Week Calendar */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {weekDates.map((d) => (
              <button
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={cn(
                  "flex flex-col items-center justify-center min-w-[52px] h-16 rounded-xl transition-all",
                  selectedDate === d.date
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                <span className="text-xs font-medium">{d.day}</span>
                <span className="text-lg font-bold">{d.dayNum}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 sm:px-6">
        {filteredClasses.length > 0 ? (
          <div className="space-y-3">
            {filteredClasses.map((gymClass) => (
              <ClassCard
                key={gymClass.id}
                gymClass={gymClass}
                onReschedule={gymClass.status === "upcoming" ? () => setSelectedClass(gymClass) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ChevronRight className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No classes scheduled for this day</p>
          </div>
        )}
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
