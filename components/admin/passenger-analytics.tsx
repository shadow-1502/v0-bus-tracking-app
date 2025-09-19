"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, Clock, Star } from "lucide-react"

export function PassengerAnalytics() {
  const weeklyData = [
    { day: "Mon", passengers: 8500, satisfaction: 4.2 },
    { day: "Tue", passengers: 9200, satisfaction: 4.1 },
    { day: "Wed", passengers: 8800, satisfaction: 4.3 },
    { day: "Thu", passengers: 9500, satisfaction: 4.0 },
    { day: "Fri", passengers: 12000, satisfaction: 3.9 },
    { day: "Sat", passengers: 6500, satisfaction: 4.4 },
    { day: "Sun", passengers: 5200, satisfaction: 4.5 },
  ]

  const routeData = [
    { route: "Route 42", passengers: 2500, efficiency: 92 },
    { route: "Route 15", passengers: 2200, efficiency: 88 },
    { route: "Route 28", passengers: 1800, efficiency: 95 },
    { route: "Route 7", passengers: 1600, efficiency: 85 },
    { route: "Route 33", passengers: 1400, efficiency: 90 },
  ]

  const hourlyData = [
    { hour: "6AM", boarding: 120, alighting: 20 },
    { hour: "7AM", boarding: 450, alighting: 80 },
    { hour: "8AM", boarding: 680, alighting: 150 },
    { hour: "9AM", boarding: 320, alighting: 400 },
    { hour: "10AM", boarding: 180, alighting: 220 },
    { hour: "11AM", boarding: 150, alighting: 180 },
    { hour: "12PM", boarding: 280, alighting: 250 },
    { hour: "1PM", boarding: 320, alighting: 280 },
    { hour: "2PM", boarding: 250, alighting: 200 },
    { hour: "3PM", boarding: 380, alighting: 180 },
    { hour: "4PM", boarding: 520, alighting: 220 },
    { hour: "5PM", boarding: 680, alighting: 450 },
    { hour: "6PM", boarding: 450, alighting: 580 },
  ]

  return (
    <div className="space-y-6">
      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4 text-chart-1" />
              Weekly Passengers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">59,700</div>
            <p className="text-sm text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-chart-3" />
              Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">4.2/5</div>
            <p className="text-sm text-muted-foreground">Average rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-chart-2" />
              Peak Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-2">8AM-9AM</div>
            <p className="text-sm text-muted-foreground">Highest usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-chart-1" />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">+8.5%</div>
            <p className="text-sm text-muted-foreground">Month over month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Passenger Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="passengers" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="passengers" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hourly Boarding & Alighting Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="boarding"
                    stackId="1"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="alighting"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Passenger Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-chart-1/10 rounded-lg">
              <Star className="w-4 h-4 text-chart-1 mt-1" />
              <div>
                <p className="text-sm font-medium">Excellent service on Route 42</p>
                <p className="text-xs text-muted-foreground">Driver was very helpful and bus was clean - Anonymous</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-chart-3/10 rounded-lg">
              <Star className="w-4 h-4 text-chart-3 mt-1" />
              <div>
                <p className="text-sm font-medium">Suggestion for Route 15</p>
                <p className="text-xs text-muted-foreground">
                  Could use more frequent service during peak hours - Student
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-chart-2/10 rounded-lg">
              <Star className="w-4 h-4 text-chart-2 mt-1" />
              <div>
                <p className="text-sm font-medium">Accessibility improvement</p>
                <p className="text-xs text-muted-foreground">New wheelchair ramps work great! - Regular commuter</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
