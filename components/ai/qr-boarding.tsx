"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { QrCode, Scan, UserCheck, Shield, Clock, CheckCircle } from "lucide-react"

interface BoardingSession {
  id: string
  busId: string
  route: string
  timestamp: string
  passengersBoarded: number
  verificationRate: number
}

export function QRBoarding() {
  const [currentSession, setCurrentSession] = useState<BoardingSession>({
    id: "QR-2024-001",
    busId: "BUS-042",
    route: "Route 42 - Downtown",
    timestamp: new Date().toLocaleTimeString(),
    passengersBoarded: 12,
    verificationRate: 94,
  })

  const [qrCode, setQrCode] = useState("QR_BUS042_20240115_1630")
  const [scanResult, setScanResult] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const generateNewQR = () => {
    const timestamp = Date.now()
    const newCode = `QR_${currentSession.busId}_${timestamp}`
    setQrCode(newCode)
  }

  const simulateScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setScanResult("VERIFIED: Passenger ID #P789456")
      setCurrentSession((prev) => ({
        ...prev,
        passengersBoarded: prev.passengersBoarded + 1,
        verificationRate: Math.min(100, prev.verificationRate + 1),
      }))
      setIsScanning(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-secondary" />
            QR-Based Secure Boarding
          </CardTitle>
          <p className="text-sm text-muted-foreground">Contactless identity verification and boarding system</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Generation */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                Bus QR Code
              </h4>

              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-muted-foreground/30 text-center">
                <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                </div>
                <p className="text-sm font-mono text-muted-foreground mb-2">{qrCode}</p>
                <Badge variant="secondary" className="mb-4">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
              </div>

              <Button onClick={generateNewQR} className="w-full">
                Generate New QR Code
              </Button>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• QR codes refresh every 5 minutes for security</p>
                <p>• Encrypted passenger verification</p>
                <p>• Contactless boarding process</p>
              </div>
            </div>

            {/* Scanning Interface */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Scan className="w-4 h-4" />
                Passenger Verification
              </h4>

              <div className="space-y-3">
                <Input
                  placeholder="Scan passenger QR code or enter ID..."
                  value={scanResult}
                  onChange={(e) => setScanResult(e.target.value)}
                />

                <Button
                  onClick={simulateScan}
                  disabled={isScanning}
                  className="w-full"
                  variant={isScanning ? "secondary" : "default"}
                >
                  {isScanning ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4 mr-2" />
                      Scan QR Code
                    </>
                  )}
                </Button>

                {scanResult && !isScanning && (
                  <div className="p-3 bg-chart-1/10 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-chart-1" />
                    <span className="text-sm font-medium text-chart-1">{scanResult}</span>
                  </div>
                )}
              </div>

              {/* Session Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-3">
                    <div className="text-sm text-muted-foreground">Boarded</div>
                    <div className="text-lg font-bold text-chart-2">{currentSession.passengersBoarded}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-3">
                    <div className="text-sm text-muted-foreground">Verified</div>
                    <div className="text-lg font-bold text-chart-1">{currentSession.verificationRate}%</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Current Session Info */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h5 className="font-medium mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Current Boarding Session
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Session ID:</span>
                <p className="font-medium">{currentSession.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Bus:</span>
                <p className="font-medium">{currentSession.busId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Route:</span>
                <p className="font-medium">{currentSession.route}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Started:</span>
                <p className="font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentSession.timestamp}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">QR Boarding Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-chart-1 mt-0.5" />
              <div>
                <p className="font-medium">Enhanced Security</p>
                <p className="text-muted-foreground">Encrypted passenger verification</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-chart-2 mt-0.5" />
              <div>
                <p className="font-medium">Faster Boarding</p>
                <p className="text-muted-foreground">Contactless verification process</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <UserCheck className="w-4 h-4 text-chart-3 mt-0.5" />
              <div>
                <p className="font-medium">Identity Tracking</p>
                <p className="text-muted-foreground">Secure passenger identification</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
