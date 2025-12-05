"use client"

import { useCommunity } from "@/lib/community-context"
import { Users } from "lucide-react"

function formatTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60))
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }
}

export function ChatList() {
  const { chats, setActiveChat } = useCommunity()

  return (
    <div className="divide-y divide-border">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => setActiveChat(chat)}
          className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50"
        >
          <div className="relative">
            <img
              src={chat.avatar || "/placeholder.svg"}
              alt={chat.name}
              className="h-12 w-12 rounded-full object-cover"
            />
            {chat.isGroup && (
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                <Users className="h-3 w-3" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="truncate font-semibold text-foreground">{chat.name}</h3>
              <span className="text-xs text-muted-foreground">{formatTime(chat.lastMessageTime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
              {chat.unreadCount > 0 && (
                <span className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                  {chat.unreadCount}
                </span>
              )}
            </div>
            {chat.isGroup && chat.members && <p className="text-xs text-muted-foreground">{chat.members} members</p>}
          </div>
        </button>
      ))}
    </div>
  )
}
