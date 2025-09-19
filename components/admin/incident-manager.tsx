"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, Clock, MapPin, User, FileText, Plus } from "lucide-react"

interface Incident {
  id: string
  type: "safety" | "mechanical" | "passenger" | "route"
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "investigating" | "resolved"
  busId: string
  location: string
  description: string
  reportedBy: string
  timestamp: string
  assignedTo?: string
}

export function IncidentManager() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: "INC-001",
      type: "mechanical",
      severity: "medium",
      status: "investigating",
      busId: "BUS-028",
      location: "Main St & 3rd Ave",
      description: "Engine making unusual noise, reduced performance",
      reportedBy: "Mike Wilson (Driver)",
      timestamp: "2024-01-15 14:30",
      assignedTo: "Maintenance Team A",
    },
    {
      id: "INC-002",
      type: "safety",
      severity: "high",
      status: "open",
      busId: "BUS-015",
      location: "University Campus",
      description: "Passenger reported suspicious activity",
      reportedBy: "Sarah Johnson (Driver)",
      timestamp: "2024-01-15 16:45",
    },
    {
      id: "INC-003",
      type: "passenger",
      severity: "low",
      status: "resolved",
      busId: "BUS-001",
      location: "Downtown Terminal",
      description: "Passenger complaint about air conditioning",
      reportedBy: "John Smith (Driver)",
      timestamp: "2024-01-15 12:15",
      assignedTo: "Customer Service",
    },
  ])

  const [newIncident, setNewIncident] = useState({
    type: "",
    severity: "",
    busId: "",
    location: "",
    description: "",
  })

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "low":
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Low</Badge>
      case "medium":
        return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Medium</Badge>
      case "high":
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">High</Badge>
      case "critical":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Critical</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Open</Badge>
      case "investigating":
        return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Investigating</Badge>
      case "resolved":
        return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "safety":
        return <AlertTriangle className="w-4 h-4 text-chart-4" />
      case "mechanical":
        return <FileText className="w-4 h-4 text-chart-3" />
      case "passenger":
        return <User className="w-4 h-4 text-chart-2" />
      case "route":
        return <MapPin className="w-4 h-4 text-chart-1" />
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Incident Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-chart-4" />
              Open Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">2</div>
            <p className="text-sm text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-chart-3" />
              Investigating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">1</div>
            <p className="text-sm text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4 text-chart-1" />
              Resolved Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">5</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">0</div>
            <p className="text-sm text-muted-foreground">Emergency level</p>
          </CardContent>
        </Card>
      </div>

      {/* Incident Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Incident Reports</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Incident
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report New Incident</DialogTitle>
                  <DialogDescription>Create a new incident report for tracking and resolution.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      value={newIncident.type}
                      onValueChange={(value) => setNewIncident({ ...newIncident, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Incident Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="mechanical">Mechanical</SelectItem>
                        <SelectItem value="passenger">Passenger</SelectItem>
                        <SelectItem value="route">Route</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={newIncident.severity}
                      onValueChange={(value) => setNewIncident({ ...newIncident, severity: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea
                    placeholder="Describe the incident..."
                    value={newIncident.description}
                    onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  />
                  <Button className="w-full">Submit Report</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bus</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(incident.type)}
                      <span className="capitalize">{incident.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                  <TableCell>{getStatusBadge(incident.status)}</TableCell>
                  <TableCell>{incident.busId}</TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.reportedBy}</TableCell>
                  <TableCell>{incident.timestamp}</TableCell>
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
