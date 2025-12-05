"use client"

import { Clock, MapPin, Users, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { GymClass } from "@/lib/classes-context"

interface ClassCardProps {
  gymClass: GymClass
  onReschedule?: () => void
}

const typeColors: Record<GymClass["type"], string> = {
  yoga: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  hiit: "bg-red-500/20 text-red-400 border-red-500/30",
  strength: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cardio: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  pilates: "bg-purple-500/20 text-purple-400 border-purple-500/30",
}

const typeLabels: Record<GymClass["type"], string> = {
  yoga: "Yoga",
  hiit: "HIIT",
  strength: "Strength",
  cardio: "Cardio",
  pilates: "Pilates",
}

export function ClassCard({ gymClass, onReschedule }: ClassCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-xs", typeColors[gymClass.type])}>
              {typeLabels[gymClass.type]}
            </Badge>
            {gymClass.status === "reschedule-pending" && (
              <Badge variant="outline" className="border-accent/50 bg-accent/20 text-accent text-xs">
                Reschedule Pending
              </Badge>
            )}
          </div>

          <h3 className="font-semibold text-foreground text-lg leading-tight">{gymClass.title}</h3>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(gymClass.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{formatTime(gymClass.time)}</span>
              <span className="text-muted-foreground/60">({gymClass.duration}min)</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{gymClass.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              <span>
                {gymClass.participants}/{gymClass.maxParticipants}
              </span>
            </div>
          </div>
        </div>

        {gymClass.status === "upcoming" && onReschedule && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReschedule}
            className="shrink-0 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <span className="hidden sm:inline">Reschedule</span>
            <ArrowRight className="h-4 w-4 sm:ml-1" />
          </Button>
        )}
      </div>

      {gymClass.rescheduleRequest && (
        <div className="mt-4 rounded-lg bg-accent/10 border border-accent/20 p-3">
          <p className="text-xs font-medium text-accent mb-1">Requested Change:</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(gymClass.rescheduleRequest.newDate)} at {formatTime(gymClass.rescheduleRequest.newTime)}
          </p>
          <p className="text-xs text-muted-foreground/80 mt-1 italic">
            &quot;{gymClass.rescheduleRequest.reason}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
