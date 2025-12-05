"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Clock, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { GymClass } from "@/lib/classes-context"

interface RescheduleModalProps {
  gymClass: GymClass
  onClose: () => void
  onSubmit: (newDate: string, newTime: string, reason: string) => void
}

export function RescheduleModal({ gymClass, onClose, onSubmit }: RescheduleModalProps) {
  const [newDate, setNewDate] = useState("")
  const [newTime, setNewTime] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newDate && newTime && reason) {
      onSubmit(newDate, newTime, reason)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-border bg-card p-6 shadow-xl animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-semibold text-foreground mb-1">Reschedule Class</h2>
        <p className="text-sm text-muted-foreground mb-6">{gymClass.title}</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-primary" />
              New Date
            </Label>
            <Input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="bg-muted border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              New Time
            </Label>
            <Input
              id="time"
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="bg-muted border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="flex items-center gap-2 text-sm">
              <MessageSquare className="h-4 w-4 text-primary" />
              Reason for Reschedule
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please provide a reason for the reschedule request..."
              className="bg-muted border-border min-h-[100px] resize-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!newDate || !newTime || !reason}
            >
              Send Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
