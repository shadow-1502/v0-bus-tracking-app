"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Navigation, Satellite, RefreshCw, Phone, Star } from "lucide-react"

interface Driver {
  name: string
  id: string
  phone: string
  rating: number
  experience: string
  photo: string
}

interface Bus {
  id: string
  route: string
  location: { lat: number; lng: number }
  status: "on-time" | "delayed" | "early"
  passengers: number
  capacity: number
  eta: number
  speed: number
  heading: number
  lastUpdate: Date
  driver: Driver
}

interface UserLocation {
  lat: number
  lng: number
  accuracy: number
}

export function BusTracker() {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: "PB-101",
      route: "Chandigarh to Ludhiana Express",
      location: { lat: 30.7333, lng: 76.7794 }, // Chandigarh coordinates
      status: "on-time",
      passengers: 32,
      capacity: 55,
      eta: 5,
      speed: 65,
      heading: 45,
      lastUpdate: new Date(),
      driver: {
        name: "Sardar Singh",
        id: "PB-2024-001",
        phone: "+91-98765-43210",
        rating: 4.8,
        experience: "8 years",
        photo: "/placeholder-ih3r3.png",
      },
    },
    {
      id: "PB-205",
      route: "Amritsar to Jalandhar Local",
      location: { lat: 31.634, lng: 74.8723 }, // Amritsar coordinates
      status: "delayed",
      passengers: 48,
      capacity: 50,
      eta: 12,
      speed: 45,
      heading: 180,
      lastUpdate: new Date(),
      driver: {
        name: "Gurpreet Kaur",
        id: "PB-2024-002",
        phone: "+91-98765-43211",
        rating: 4.6,
        experience: "5 years",
        photo: "/placeholder-7wuzt.png",
      },
    },
    {
      id: "PB-308",
      route: "Patiala to Chandigarh Metro",
      location: { lat: 30.3398, lng: 76.3869 }, // Patiala coordinates
      status: "early",
      passengers: 28,
      capacity: 45,
      eta: 8,
      speed: 55,
      heading: 270,
      lastUpdate: new Date(),
      driver: {
        name: "Rajinder Kumar",
        id: "PB-2024-003",
        phone: "+91-98765-43212",
        rating: 4.9,
        experience: "12 years",
        photo: "/placeholder-x7t3p.png",
      },
    },
    {
      id: "PB-412",
      route: "Ludhiana to Bathinda Highway",
      location: { lat: 30.901, lng: 75.8573 }, // Ludhiana coordinates
      status: "on-time",
      passengers: 35,
      capacity: 60,
      eta: 15,
      speed: 70,
      heading: 90,
      lastUpdate: new Date(),
      driver: {
        name: "Harjeet Singh",
        id: "PB-2024-004",
        phone: "+91-98765-43213",
        rating: 4.7,
        experience: "6 years",
        photo: "/placeholder-vj3kt.png",
      },
    },
    {
      id: "PB-515",
      route: "Jalandhar to Kapurthala Express",
      location: { lat: 31.326, lng: 75.5762 }, // Jalandhar coordinates
      status: "on-time",
      passengers: 22,
      capacity: 40,
      eta: 6,
      speed: 60,
      heading: 135,
      lastUpdate: new Date(),
      driver: {
        name: "Simran Kaur",
        id: "PB-2024-005",
        phone: "+91-98765-43214",
        rating: 4.8,
        experience: "4 years",
        photo: "/placeholder-mztmq.png",
      },
    },
  ])

  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [gpsEnabled, setGpsEnabled] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [selectedBus, setSelectedBus] = useState<string | null>(null)

  const enableGPS = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      return
    }

    setIsTracking(true)
    setLocationError(null)

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        setUserLocation({
          lat: latitude,
          lng: longitude,
          accuracy: accuracy,
        })
        setGpsEnabled(true)
        setIsTracking(false)
        console.log("[v0] GPS location obtained:", { latitude, longitude, accuracy })
      },
      (error) => {
        setLocationError(`GPS Error: ${error.message}`)
        setIsTracking(false)
        console.log("[v0] GPS error:", error)
      },
      options,
    )
  }

  useEffect(() => {
    let watchId: number | null = null

    if (gpsEnabled && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords
          setUserLocation({
            lat: latitude,
            lng: longitude,
            accuracy: accuracy,
          })
          console.log("[v0] GPS position updated:", { latitude, longitude })
        },
        (error) => {
          console.log("[v0] GPS watch error:", error)
          setLocationError(`GPS tracking error: ${error.message}`)
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 30000,
        },
      )
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [gpsEnabled])

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus) => {
          const speedKmh = bus.speed
          const speedMs = speedKmh * 0.000277778
          const headingRad = (bus.heading * Math.PI) / 180

          const newLat = bus.location.lat + speedMs * Math.cos(headingRad) * 0.05
          const newLng = bus.location.lng + speedMs * Math.sin(headingRad) * 0.05

          return {
            ...bus,
            location: { lat: newLat, lng: newLng },
            eta: Math.max(0, bus.eta - 0.1),
            passengers: Math.max(0, bus.passengers + Math.floor(Math.random() * 3) - 1),
            speed: Math.max(30, bus.speed + Math.floor(Math.random() * 10) - 5),
            heading: (bus.heading + Math.floor(Math.random() * 20) - 10 + 360) % 360,
            lastUpdate: new Date(),
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "bg-chart-1"
      case "delayed":
        return "bg-chart-3"
      case "early":
        return "bg-chart-2"
      default:
        return "bg-muted"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-time":
        return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">On Time</Badge>
      case "delayed":
        return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Delayed</Badge>
      case "early":
        return <Badge className="bg-chart-2/20 text-chart-2 border-chart-2/30">Early</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Satellite className="w-5 h-5 text-chart-1" />
            <h3 className="font-medium">GPS Tracking</h3>
          </div>
          <Button onClick={enableGPS} disabled={isTracking} size="sm" className={gpsEnabled ? "bg-chart-1" : ""}>
            {isTracking ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : gpsEnabled ? (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                GPS Active
              </>
            ) : (
              <>
                <Satellite className="w-4 h-4 mr-2" />
                Enable GPS
              </>
            )}
          </Button>
        </div>

        {locationError && <div className="text-sm text-chart-3 bg-chart-3/10 p-2 rounded">{locationError}</div>}

        {userLocation && (
          <div className="text-sm text-muted-foreground">
            <p>
              Your Location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </p>
            <p>Accuracy: ±{Math.round(userLocation.accuracy)}m</p>
          </div>
        )}
      </Card>

      <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-green-500/20"></div>
        <div className="text-center z-10">
          <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Punjab Bus Network Map</p>
          <p className="text-xs text-muted-foreground">Real-time locations across Punjab</p>
        </div>

        {userLocation && (
          <div
            className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse z-20"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          </div>
        )}

        {buses.map((bus, index) => (
          <div key={bus.id} className="absolute z-10">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(bus.status)} animate-pulse cursor-pointer`}
              style={{
                left: `${15 + index * 18}%`,
                top: `${25 + index * 12}%`,
                transform: `rotate(${bus.heading}deg)`,
              }}
              onClick={() => setSelectedBus(selectedBus === bus.id ? null : bus.id)}
            />
            <div className="absolute -top-6 -left-8 text-xs bg-black/70 text-white px-1 rounded">{bus.speed}km/h</div>
            {selectedBus === bus.id && (
              <div className="absolute top-6 left-0 bg-white border rounded-lg p-2 shadow-lg min-w-48 z-20">
                <p className="font-medium text-xs">{bus.route}</p>
                <p className="text-xs text-muted-foreground">Driver: {bus.driver.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {buses.map((bus) => (
          <Card key={bus.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(bus.status)}`} />
                <div>
                  <h4 className="font-medium">{bus.route}</h4>
                  <p className="text-sm text-muted-foreground">Bus ID: {bus.id}</p>
                  <p className="text-xs text-muted-foreground">
                    GPS: {bus.location.lat.toFixed(4)}, {bus.location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(bus.status)}
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Clock className="w-3 h-3" />
                    {Math.ceil(bus.eta)} min
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {bus.passengers}/{bus.capacity} passengers
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {bus.speed}km/h •{" "}
                    {userLocation
                      ? `${calculateDistance(userLocation.lat, userLocation.lng, bus.location.lat, bus.location.lng).toFixed(1)}km away`
                      : "Enable GPS for distance"}
                  </div>
                  <div className="text-xs text-muted-foreground">Updated: {bus.lastUpdate.toLocaleTimeString()}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                <img
                  src={bus.driver.photo || "/placeholder.svg"}
                  alt={bus.driver.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium text-sm">{bus.driver.name}</h5>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{bus.driver.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    License: {bus.driver.id} • {bus.driver.experience} experience
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                    <Phone className="w-3 h-3 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" className="h-8 bg-chart-1 hover:bg-chart-1/90">
                    Book Seat
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
