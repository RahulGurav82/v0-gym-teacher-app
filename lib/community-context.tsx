"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  isOwn: boolean
}

export interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isGroup: boolean
  members?: number
  messages: Message[]
}

interface CommunityContextType {
  chats: Chat[]
  activeChat: Chat | null
  setActiveChat: (chat: Chat | null) => void
  sendMessage: (chatId: string, content: string) => void
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Yoga Teachers Hub",
    avatar: "/yoga-group.png",
    lastMessage: "Anyone tried the new flow sequence?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 3,
    isGroup: true,
    members: 24,
    messages: [
      {
        id: "m1",
        senderId: "u1",
        senderName: "Sarah Chen",
        senderAvatar: "/diverse-woman-avatar.png",
        content: "Good morning everyone! Ready for today's sessions?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "u2",
        senderName: "Mike Johnson",
        senderAvatar: "/man-avatar.png",
        content: "I have a packed schedule today.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isOwn: false,
      },
      {
        id: "m3",
        senderId: "current",
        senderName: "You",
        senderAvatar: "/trainer-avatar.png",
        content: "Same here! Anyone tried the new flow sequence?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOwn: true,
      },
      {
        id: "m4",
        senderId: "u1",
        senderName: "Sarah Chen",
        senderAvatar: "/diverse-woman-avatar.png",
        content: "Yes! It's great for beginners. Very smooth transitions.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    name: "HIIT Trainers",
    avatar: "/hiit-fitness-group.jpg",
    lastMessage: "Check out this new circuit workout!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 45),
    unreadCount: 0,
    isGroup: true,
    members: 18,
    messages: [
      {
        id: "m1",
        senderId: "u3",
        senderName: "Alex Rivera",
        senderAvatar: "/diverse-fitness-trainer.png",
        content: "Check out this new circuit workout!",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    name: "Gym Announcements",
    avatar: "/gym-announcement.jpg",
    lastMessage: "New equipment arriving next week!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1,
    isGroup: true,
    members: 45,
    messages: [
      {
        id: "m1",
        senderId: "admin",
        senderName: "Gym Admin",
        senderAvatar: "/admin-avatar.png",
        content: "New equipment arriving next week! We're getting new treadmills and weight racks.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isOwn: false,
      },
    ],
  },
  {
    id: "4",
    name: "Lisa Thompson",
    avatar: "/female-trainer-portrait.jpg",
    lastMessage: "Can you cover my 3pm class?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unreadCount: 0,
    isGroup: false,
    messages: [
      {
        id: "m1",
        senderId: "u4",
        senderName: "Lisa Thompson",
        senderAvatar: "/female-trainer.png",
        content: "Hey! Are you free tomorrow afternoon?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "current",
        senderName: "You",
        senderAvatar: "/trainer-avatar.png",
        content: "Should be! What's up?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5.5),
        isOwn: true,
      },
      {
        id: "m3",
        senderId: "u4",
        senderName: "Lisa Thompson",
        senderAvatar: "/female-trainer.png",
        content: "Can you cover my 3pm class?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        isOwn: false,
      },
    ],
  },
]

const CommunityContext = createContext<CommunityContextType | undefined>(undefined)

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(mockChats)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)

  const sendMessage = (chatId: string, content: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "current",
      senderName: "You",
      senderAvatar: "/trainer-avatar.png",
      content,
      timestamp: new Date(),
      isOwn: true,
    }

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: content,
              lastMessageTime: new Date(),
            }
          : chat,
      ),
    )

    if (activeChat?.id === chatId) {
      setActiveChat((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, newMessage],
              lastMessage: content,
              lastMessageTime: new Date(),
            }
          : null,
      )
    }
  }

  return (
    <CommunityContext.Provider value={{ chats, activeChat, setActiveChat, sendMessage }}>
      {children}
    </CommunityContext.Provider>
  )
}

export function useCommunity() {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error("useCommunity must be used within a CommunityProvider")
  }
  return context
}
