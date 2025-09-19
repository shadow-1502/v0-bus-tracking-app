"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, Shield, Home } from "lucide-react"
import { UserMenu } from "@/components/auth/user-menu"
import Link from "next/link"

export function AdminHeader() {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">CivicBus Admin</h1>
              <p className="text-sm opacity-90">Transit Authority Portal</p>
            </div>
          </Link>
          <Badge variant="secondary" className="bg-chart-1/20 text-chart-1 border-chart-1/30">
            System Online
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-chart-4 rounded-full"></span>
          </Button>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Public View
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
