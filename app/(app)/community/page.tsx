"use client"

import { CommunityProvider, useCommunity } from "@/lib/community-context"
import { ChatList } from "@/components/chat-list"
import { ChatView } from "@/components/chat-view"
import { MessageCircle } from "lucide-react"

function CommunityContent() {
  const { activeChat } = useCommunity()

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-40 border-b border-border bg-card/95 px-4 py-4 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Community</h1>
              <p className="text-sm text-muted-foreground">Connect with fellow trainers</p>
            </div>
          </div>
        </div>

        {/* Chat List */}
        <ChatList />
      </div>

      {/* Chat View Overlay */}
      {activeChat && <ChatView />}
    </>
  )
}

export default function CommunityPage() {
  return (
    <CommunityProvider>
      <CommunityContent />
    </CommunityProvider>
  )
}
