"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Plus, Minus, UserCheck } from "lucide-react"

export function PassengerCounter() {
  const [passengerCount, setPassengerCount] = useState(24)
  const [capacity] = useState(50)
  const [boardingQueue, setBoardingQueue] = useState(3)

  const occupancyPercentage = (passengerCount / capacity) * 100

  const getOccupancyStatus = () => {
    if (occupancyPercentage < 50) return { text: "Comfortable", color: "text-chart-1" }
    if (occupancyPercentage < 80) return { text: "Moderate", color: "text-chart-3" }
    return { text: "Crowded", color: "text-chart-4" }
  }

  const status = getOccupancyStatus()

  return (
    <div className="space-y-4">
      {/* Current Occupancy */}
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">
          {passengerCount}/{capacity}
        </div>
        <p className="text-sm text-muted-foreground mb-3">Current Passengers</p>
        <Progress value={occupancyPercentage} className="mb-2" />
        <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
      </div>

      {/* Manual Counter Controls */}
      <Card className="p-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          Manual Count Adjustment
        </h4>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setPassengerCount(Math.max(0, passengerCount - 1))}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-lg font-medium min-w-[3rem] text-center">{passengerCount}</span>
          <Button variant="outline" size="sm" onClick={() => setPassengerCount(Math.min(capacity, passengerCount + 1))}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Boarding Queue */}
      <Card className="p-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Boarding Queue
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Waiting to board</span>
          <span className="font-medium">{boardingQueue} passengers</span>
        </div>
      </Card>

      {/* Accessibility Info */}
      <Card className="p-4 bg-secondary/10">
        <h4 className="font-medium mb-2 text-secondary">Accessibility Status</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Wheelchair spaces</span>
            <span className="font-medium">2 available</span>
          </div>
          <div className="flex justify-between">
            <span>Priority seating</span>
            <span className="font-medium">4 available</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
