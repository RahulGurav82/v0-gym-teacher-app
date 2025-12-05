"use client"

import { useRouter } from "next/navigation"
import { User, Phone, Mail, Bell, Shield, HelpCircle, LogOut, ChevronRight, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const menuItems = [
    { icon: User, label: "Personal Information", href: "#" },
    { icon: Bell, label: "Notifications", href: "#", toggle: true },
    { icon: Shield, label: "Privacy & Security", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="px-4 py-6 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">CM</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Coach Mike</h1>
              <p className="text-sm text-muted-foreground">Fitness Instructor</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">156</p>
              <p className="text-xs text-muted-foreground">Classes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">2y</p>
              <p className="text-xs text-muted-foreground">Experience</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 sm:px-6 space-y-6">
        {/* Contact Info */}
        <section className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground">Contact Information</h2>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-3 px-4 py-3">
              <Phone className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <Mail className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">coach.mike@gym.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-3">
              <Dumbbell className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Specialization</p>
                <p className="text-foreground">HIIT, Strength Training, Yoga</p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <h2 className="text-sm font-medium text-muted-foreground">Settings</h2>
          </div>
          <div className="divide-y divide-border">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-3 px-4 py-3 w-full hover:bg-muted/50 transition-colors"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <span className="flex-1 text-left text-foreground">{item.label}</span>
                {item.toggle ? <Switch defaultChecked /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>

        <p className="text-center text-xs text-muted-foreground">GymTeach Pro v1.0.0</p>
      </main>
    </div>
  )
}
