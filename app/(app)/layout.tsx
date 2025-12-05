import type React from "react"
import { AuthProvider } from "@/lib/auth-context"
import { ClassesProvider } from "@/lib/classes-context"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClassesProvider>
        <div className="min-h-screen bg-background pb-20">
          {children}
          <BottomNavigation />
        </div>
      </ClassesProvider>
    </AuthProvider>
  )
}
