"use client"

import { useState, useRef, useEffect } from "react"
import { useCommunity } from "@/lib/community-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Users } from "lucide-react"
import { cn } from "@/lib/utils"

function formatMessageTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

export function ChatView() {
  const { activeChat, setActiveChat, sendMessage } = useCommunity()
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages])

  if (!activeChat) return null

  const handleSend = () => {
    if (!message.trim()) return
    sendMessage(activeChat.id, message.trim())
    setMessage("")
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card p-4">
        <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)} className="shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <img
          src={activeChat.avatar || "/placeholder.svg"}
          alt={activeChat.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-semibold text-foreground">{activeChat.name}</h2>
          {activeChat.isGroup && activeChat.members && (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {activeChat.members} members
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {activeChat.messages.map((msg) => (
            <div key={msg.id} className={cn("flex gap-2", msg.isOwn ? "flex-row-reverse" : "flex-row")}>
              {!msg.isOwn && activeChat.isGroup && (
                <img
                  src={msg.senderAvatar || "/placeholder.svg"}
                  alt={msg.senderName}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2",
                  msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                )}
              >
                {!msg.isOwn && activeChat.isGroup && (
                  <p className="mb-1 text-xs font-medium text-primary">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p
                  className={cn("mt-1 text-[10px]", msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}
                >
                  {formatMessageTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4 pb-safe">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon" disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
