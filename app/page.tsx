"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Shield, AlertTriangle, Navigation, Settings, Brain, QrCode } from "lucide-react"
import { EmergencyButton } from "@/components/emergency-button"
import { BusTracker } from "@/components/bus-tracker"
import { LanguageSelector } from "@/components/language-selector"
import { PassengerCounter } from "@/components/passenger-counter"
import { CrowdPredictor } from "@/components/ai/crowd-predictor"
import { CivicIntegration } from "@/components/ai/civic-integration"
import { UserMenu } from "@/components/auth/user-menu"
import Link from "next/link"

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [showAIFeatures, setShowAIFeatures] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <Navigation className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Find My Bus App</h1>
              <p className="text-sm opacity-90">Punjab Transit Tracking</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAIFeatures(!showAIFeatures)}
              className={showAIFeatures ? "bg-secondary/20" : ""}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Features
            </Button>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
            <EmergencyButton />
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Quick Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-chart-1" />
                Next Bus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">5 min</div>
              <p className="text-sm text-muted-foreground">Route PB-101 - Chandigarh to Ludhiana</p>
              <Badge variant="secondary" className="mt-2">
                On Time
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4 text-chart-2" />
                Passenger Load
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">32/55</div>
              <p className="text-sm text-muted-foreground">Moderate capacity</p>
              <Badge variant="outline" className="mt-2">
                Comfortable
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-chart-1" />
                Safety Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">All Clear</div>
              <p className="text-sm text-muted-foreground">No incidents reported</p>
              <Badge variant="secondary" className="mt-2">
                Secure
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Booking Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Book Your Bus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">From</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Chandigarh</option>
                    <option>Ludhiana</option>
                    <option>Amritsar</option>
                    <option>Jalandhar</option>
                    <option>Patiala</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">To</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Ludhiana</option>
                    <option>Chandigarh</option>
                    <option>Amritsar</option>
                    <option>Jalandhar</option>
                    <option>Patiala</option>
                  </select>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input type="date" className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="text-sm font-medium">Passengers</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>1 Passenger</option>
                    <option>2 Passengers</option>
                    <option>3 Passengers</option>
                    <option>4+ Passengers</option>
                  </select>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4 bg-chart-1 hover:bg-chart-1/90">Search Available Buses</Button>
          </CardContent>
        </Card>

        {/* AI Features Section */}
        {showAIFeatures && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-secondary" />
              <h2 className="text-xl font-bold">AI-Powered Features</h2>
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">Beta</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CrowdPredictor />
              <CivicIntegration />
            </div>
          </div>
        )}

        {/* Bus Tracking Map */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Live Bus Tracking - Punjab Routes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BusTracker />
          </CardContent>
        </Card>

        {/* Passenger Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Passenger Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PassengerCounter />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Enhanced Safety Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-chart-1/10 rounded-lg">
                  <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Route Clear</p>
                    <p className="text-xs text-muted-foreground">No safety concerns detected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-chart-2/10 rounded-lg">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Driver Verified</p>
                    <p className="text-xs text-muted-foreground">Sardar Singh - License: PB-2024-001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-chart-3/10 rounded-lg">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Women Safety Zone Active</p>
                    <p className="text-xs text-muted-foreground">Dedicated seating monitored</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Report Safety Concern
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex justify-around items-center">
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">Track</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs">Book</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Passengers</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <Shield className="w-4 h-4" />
              <span className="text-xs">Safety</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col gap-1">
              <QrCode className="w-4 h-4" />
              <span className="text-xs">QR Board</span>
            </Button>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="flex flex-col gap-1">
                <Settings className="w-4 h-4" />
                <span className="text-xs">Admin</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
