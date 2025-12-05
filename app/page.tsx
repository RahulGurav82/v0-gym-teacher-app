"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dumbbell, Phone, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OtpInput } from "@/components/otp-input"
import { useAuth } from "@/lib/auth-context"
import { AuthProvider } from "@/lib/auth-context"

function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length < 10) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setStep("otp")
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    login(phone)
    router.push("/home")
  }

  const handleResendOtp = () => {
    setOtp("")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary mb-4">
              <Dumbbell className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">GymTeach Pro</h1>
            <p className="text-muted-foreground mt-1">Manage your classes with ease</p>
          </div>

          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="pl-10 h-12 bg-muted border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={phone.length < 10 || isLoading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Enter the 6-digit code sent to</p>
                <p className="font-medium text-foreground">+91 {phone}</p>
              </div>

              <OtpInput value={otp} onChange={setOtp} />

              <Button
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Verify & Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground">Didn&apos;t receive code?</span>
                <button type="button" onClick={handleResendOtp} className="font-medium text-primary hover:underline">
                  Resend
                </button>
              </div>

              <button
                type="button"
                onClick={() => setStep("phone")}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Change phone number
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  )
}
