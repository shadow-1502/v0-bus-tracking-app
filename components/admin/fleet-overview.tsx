"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bus, MapPin, Users, Wrench, CheckCircle, AlertCircle, Search } from "lucide-react"

interface BusData {
  id: string
  route: string
  driver: string
  status: "active" | "maintenance" | "offline"
  location: string
  passengers: number
  capacity: number
  lastUpdate: string
  health: "good" | "warning" | "critical"
}

export function FleetOverview() {
  const [searchTerm, setSearchTerm] = useState("")
  const [buses] = useState<BusData[]>([
    {
      id: "BUS-001",
      route: "Route 42 - Downtown",
      driver: "John Smith",
      status: "active",
      location: "Main St & 5th Ave",
      passengers: 24,
      capacity: 50,
      lastUpdate: "2 min ago",
      health: "good",
    },
    {
      id: "BUS-015",
      route: "Route 15 - University",
      driver: "Sarah Johnson",
      status: "active",
      location: "Campus Drive",
      passengers: 38,
      capacity: 45,
      lastUpdate: "1 min ago",
      health: "warning",
    },
    {
      id: "BUS-028",
      route: "Route 28 - Airport",
      driver: "Mike Wilson",
      status: "maintenance",
      location: "Depot A",
      passengers: 0,
      capacity: 55,
      lastUpdate: "45 min ago",
      health: "critical",
    },
    {
      id: "BUS-033",
      route: "Route 7 - Mall",
      driver: "Lisa Chen",
      status: "active",
      location: "Shopping Center",
      passengers: 12,
      capacity: 40,
      lastUpdate: "3 min ago",
      health: "good",
    },
  ])

  const filteredBuses = buses.filter(
    (bus) =>
      bus.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">Active</Badge>
      case "maintenance":
        return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Maintenance</Badge>
      case "offline":
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Offline</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "good":
        return <CheckCircle className="w-4 h-4 text-chart-1" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-chart-3" />
      case "critical":
        return <AlertCircle className="w-4 h-4 text-chart-4" />
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Bus className="w-4 h-4 text-chart-1" />
              Total Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-sm text-muted-foreground">Buses in service</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4 text-chart-3" />
              Maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">3</div>
            <p className="text-sm text-muted-foreground">Scheduled & repairs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-chart-1" />
              Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">94%</div>
            <p className="text-sm text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Management</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search buses, routes, or drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus ID</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Passengers</TableHead>
                <TableHead>Health</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell className="font-medium">{bus.id}</TableCell>
                  <TableCell>{bus.route}</TableCell>
                  <TableCell>{bus.driver}</TableCell>
                  <TableCell>{getStatusBadge(bus.status)}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    {bus.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-muted-foreground" />
                      {bus.passengers}/{bus.capacity}
                    </div>
                  </TableCell>
                  <TableCell>{getHealthIcon(bus.health)}</TableCell>
                  <TableCell className="text-muted-foreground">{bus.lastUpdate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
