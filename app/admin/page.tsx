"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie } from "recharts"
import { Bus, Users, AlertTriangle, TrendingUp, Clock, Activity, Brain, QrCode } from "lucide-react"
import { FleetOverview } from "@/components/admin/fleet-overview"
import { IncidentManager } from "@/components/admin/incident-manager"
import { PassengerAnalytics } from "@/components/admin/passenger-analytics"
import { AdminHeader } from "@/components/admin/admin-header"
import { CrowdPredictor } from "@/components/ai/crowd-predictor"
import { CivicIntegration } from "@/components/ai/civic-integration"
import { QRBoarding } from "@/components/ai/qr-boarding"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("civicbus_user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const user = JSON.parse(userData)
    if (user.role !== "admin") {
      router.push("/")
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Transit Authority Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor fleet health, incidents, and passenger analytics with AI-powered insights
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="fleet" className="flex items-center gap-2">
              <Bus className="w-4 h-4" />
              Fleet
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Incidents
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Features
            </TabsTrigger>
            <TabsTrigger value="boarding" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              QR Boarding
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Bus className="w-4 h-4 text-chart-1" />
                    Active Buses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-1">42/45</div>
                  <p className="text-sm text-muted-foreground">93% operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4 text-chart-2" />
                    Daily Passengers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-2">12,847</div>
                  <p className="text-sm text-muted-foreground">+8% from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4 text-chart-3" />
                    On-Time Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">87%</div>
                  <p className="text-sm text-muted-foreground">Above target (85%)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-chart-4" />
                    Active Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-4">3</div>
                  <p className="text-sm text-muted-foreground">2 minor, 1 resolved</p>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "On Route", value: 35, fill: "hsl(var(--chart-1))" },
                            { name: "At Station", value: 7, fill: "hsl(var(--chart-2))" },
                            { name: "Maintenance", value: 2, fill: "hsl(var(--chart-3))" },
                            { name: "Off Duty", value: 1, fill: "hsl(var(--chart-4))" },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hourly Passenger Load</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { hour: "6AM", passengers: 450 },
                          { hour: "7AM", passengers: 1200 },
                          { hour: "8AM", passengers: 2100 },
                          { hour: "9AM", passengers: 1800 },
                          { hour: "10AM", passengers: 900 },
                          { hour: "11AM", passengers: 750 },
                          { hour: "12PM", passengers: 1100 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="passengers" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fleet">
            <FleetOverview />
          </TabsContent>

          <TabsContent value="incidents">
            <IncidentManager />
          </TabsContent>

          <TabsContent value="analytics">
            <PassengerAnalytics />
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <CrowdPredictor />
            <CivicIntegration />
          </TabsContent>

          <TabsContent value="boarding">
            <QRBoarding />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
