"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface GymClass {
  id: string
  title: string
  type: "yoga" | "hiit" | "strength" | "cardio" | "pilates"
  date: string
  time: string
  duration: number
  location: string
  participants: number
  maxParticipants: number
  status: "upcoming" | "completed" | "cancelled" | "reschedule-pending"
  rescheduleRequest?: {
    newDate: string
    newTime: string
    reason: string
    status: "pending" | "approved" | "rejected"
  }
}

interface ClassesContextType {
  classes: GymClass[]
  requestReschedule: (classId: string, newDate: string, newTime: string, reason: string) => void
  cancelRescheduleRequest: (classId: string) => void
}

const initialClasses: GymClass[] = [
  {
    id: "1",
    title: "Morning Yoga Flow",
    type: "yoga",
    date: "2025-01-06",
    time: "07:00",
    duration: 60,
    location: "Studio A",
    participants: 12,
    maxParticipants: 20,
    status: "upcoming",
  },
  {
    id: "2",
    title: "HIIT Burn",
    type: "hiit",
    date: "2025-01-06",
    time: "09:30",
    duration: 45,
    location: "Main Gym",
    participants: 18,
    maxParticipants: 25,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Strength & Conditioning",
    type: "strength",
    date: "2025-01-07",
    time: "11:00",
    duration: 60,
    location: "Weight Room",
    participants: 8,
    maxParticipants: 15,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Cardio Blast",
    type: "cardio",
    date: "2025-01-07",
    time: "17:00",
    duration: 45,
    location: "Studio B",
    participants: 22,
    maxParticipants: 30,
    status: "upcoming",
  },
  {
    id: "5",
    title: "Pilates Core",
    type: "pilates",
    date: "2025-01-08",
    time: "08:00",
    duration: 50,
    location: "Studio A",
    participants: 10,
    maxParticipants: 15,
    status: "upcoming",
  },
  {
    id: "6",
    title: "Evening Yoga",
    type: "yoga",
    date: "2025-01-08",
    time: "18:30",
    duration: 60,
    location: "Studio A",
    participants: 15,
    maxParticipants: 20,
    status: "reschedule-pending",
    rescheduleRequest: {
      newDate: "2025-01-09",
      newTime: "18:30",
      reason: "Personal appointment conflict",
      status: "pending",
    },
  },
]

const ClassesContext = createContext<ClassesContextType | undefined>(undefined)

export function ClassesProvider({ children }: { children: ReactNode }) {
  const [classes, setClasses] = useState<GymClass[]>(initialClasses)

  const requestReschedule = (classId: string, newDate: string, newTime: string, reason: string) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? {
              ...c,
              status: "reschedule-pending" as const,
              rescheduleRequest: {
                newDate,
                newTime,
                reason,
                status: "pending" as const,
              },
            }
          : c,
      ),
    )
  }

  const cancelRescheduleRequest = (classId: string) => {
    setClasses((prev) =>
      prev.map((c) =>
        c.id === classId
          ? {
              ...c,
              status: "upcoming" as const,
              rescheduleRequest: undefined,
            }
          : c,
      ),
    )
  }

  return (
    <ClassesContext.Provider value={{ classes, requestReschedule, cancelRescheduleRequest }}>
      {children}
    </ClassesContext.Provider>
  )
}

export function useClasses() {
  const context = useContext(ClassesContext)
  if (context === undefined) {
    throw new Error("useClasses must be used within a ClassesProvider")
  }
  return context
}
