"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EmergencyButton() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)

  const handleEmergency = () => {
    setIsEmergencyActive(true)
    // In a real app, this would trigger emergency protocols
    console.log("Emergency alert triggered!")

    // Auto-reset after 5 seconds for demo
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 5000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm" className={`${isEmergencyActive ? "animate-pulse" : ""}`}>
          <AlertTriangle className="w-4 h-4 mr-2" />
          SOS
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Emergency Alert
          </DialogTitle>
          <DialogDescription>
            This will immediately alert authorities and nearby users. Only use in genuine emergencies.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Button variant="destructive" className="w-full" onClick={handleEmergency}>
            <Phone className="w-4 h-4 mr-2" />
            Activate Emergency Alert
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Your location and bus information will be shared with emergency services
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
