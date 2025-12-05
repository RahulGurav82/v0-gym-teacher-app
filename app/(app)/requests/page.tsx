"use client"

import { Clock, CheckCircle, XCircle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useClasses } from "@/lib/classes-context"
import { cn } from "@/lib/utils"

export default function RequestsPage() {
  const { classes, cancelRescheduleRequest } = useClasses()

  const pendingRequests = classes.filter((c) => c.status === "reschedule-pending" && c.rescheduleRequest)

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

  const statusConfig = {
    pending: {
      icon: Clock,
      label: "Pending",
      className: "border-accent/50 bg-accent/20 text-accent",
    },
    approved: {
      icon: CheckCircle,
      label: "Approved",
      className: "border-green-500/50 bg-green-500/20 text-green-400",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      className: "border-red-500/50 bg-red-500/20 text-red-400",
    },
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-lg">
        <div className="px-4 py-4 sm:px-6">
          <h1 className="text-xl font-semibold text-foreground">Reschedule Requests</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {pendingRequests.length} pending request{pendingRequests.length !== 1 && "s"}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 sm:px-6">
        {pendingRequests.length > 0 ? (
          <div className="space-y-4">
            {pendingRequests.map((gymClass) => {
              const request = gymClass.rescheduleRequest!
              const status = statusConfig[request.status]
              const StatusIcon = status.icon

              return (
                <div key={gymClass.id} className="rounded-xl border border-border bg-card p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{gymClass.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{gymClass.location}</p>
                    </div>
                    <Badge variant="outline" className={cn("text-xs", status.className)}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Original</p>
                      <p className="text-foreground">{formatDate(gymClass.date)}</p>
                      <p className="text-muted-foreground">{formatTime(gymClass.time)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Requested</p>
                      <p className="text-primary font-medium">{formatDate(request.newDate)}</p>
                      <p className="text-muted-foreground">{formatTime(request.newTime)}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Reason</p>
                    <p className="text-sm text-foreground italic">&quot;{request.reason}&quot;</p>
                  </div>

                  {request.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelRescheduleRequest(gymClass.id)}
                      className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Request
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground mb-1">No Pending Requests</p>
            <p className="text-muted-foreground text-sm">Your reschedule requests will appear here</p>
          </div>
        )}
      </main>
    </div>
  )
}
