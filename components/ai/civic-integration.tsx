"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cloud, MapPin, Shield, Car, RefreshCw } from "lucide-react"

interface CivicData {
  weather: {
    condition: string
    temperature: number
    impact: string
    severity: "low" | "medium" | "high"
  }
  traffic: {
    congestion: number
    incidents: number
    avgDelay: number
    affectedRoutes: string[]
  }
  safety: {
    alerts: number
    level: "green" | "yellow" | "red"
    lastUpdate: string
    zones: string[]
  }
}

export function CivicIntegration() {
  const [civicData, setCivicData] = useState<CivicData>({
    weather: {
      condition: "Partly Cloudy",
      temperature: 22,
      impact: "Minimal impact on service",
      severity: "low",
    },
    traffic: {
      congestion: 65,
      incidents: 2,
      avgDelay: 3,
      affectedRoutes: ["Route 42", "Route 15"],
    },
    safety: {
      alerts: 0,
      level: "green",
      lastUpdate: "5 minutes ago",
      zones: [],
    },
  })

  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time civic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCivicData((prev) => ({
        ...prev,
        traffic: {
          ...prev.traffic,
          congestion: Math.max(20, Math.min(95, prev.traffic.congestion + Math.floor(Math.random() * 10) - 5)),
          avgDelay: Math.max(0, Math.min(15, prev.traffic.avgDelay + Math.floor(Math.random() * 3) - 1)),
        },
      }))
      setLastUpdate(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const refreshData = () => {
    // Simulate API refresh
    setLastUpdate(new Date())
  }

  const getTrafficColor = (congestion: number) => {
    if (congestion < 40) return "text-chart-1"
    if (congestion < 70) return "text-chart-3"
    return "text-chart-4"
  }

  const getSafetyBadge = (level: string) => {
    switch (level) {
      case "green":
        return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">All Clear</Badge>
      case "yellow":
        return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Caution</Badge>
      case "red":
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Alert</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Civic Data Integration
            </CardTitle>
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Real-time integration with city services and APIs</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Weather Integration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-chart-2" />
                  Weather Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-lg font-bold">{civicData.weather.condition}</div>
                  <div className="text-2xl font-bold text-chart-2">{civicData.weather.temperature}°C</div>
                  <p className="text-xs text-muted-foreground">{civicData.weather.impact}</p>
                  <Badge variant={civicData.weather.severity === "low" ? "secondary" : "destructive"}>
                    {civicData.weather.severity} impact
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Integration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Car className="w-4 h-4 text-chart-3" />
                  Traffic Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Congestion Level</div>
                  <div className={`text-2xl font-bold ${getTrafficColor(civicData.traffic.congestion)}`}>
                    {civicData.traffic.congestion}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {civicData.traffic.incidents} incidents, +{civicData.traffic.avgDelay}min avg delay
                  </div>
                  <div className="text-xs">Affected: {civicData.traffic.affectedRoutes.join(", ")}</div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Integration */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-chart-1" />
                  Police Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Safety Level</div>
                  {getSafetyBadge(civicData.safety.level)}
                  <div className="text-lg font-bold">{civicData.safety.alerts} Active Alerts</div>
                  <p className="text-xs text-muted-foreground">Updated {civicData.safety.lastUpdate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Status */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Data Feed Active</span>
              </div>
              <span className="text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
