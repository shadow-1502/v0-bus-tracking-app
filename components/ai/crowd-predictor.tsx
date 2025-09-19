"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, Clock } from "lucide-react"

interface CrowdPrediction {
  route: string
  currentLoad: number
  predictedLoad: number
  capacity: number
  confidence: number
  recommendation: string
  timeframe: string
}

export function CrowdPredictor() {
  const [predictions, setPredictions] = useState<CrowdPrediction[]>([
    {
      route: "Route 42",
      currentLoad: 24,
      predictedLoad: 38,
      capacity: 50,
      confidence: 87,
      recommendation: "Deploy additional bus in 15 minutes",
      timeframe: "Next 30 minutes",
    },
    {
      route: "Route 15",
      currentLoad: 38,
      predictedLoad: 45,
      capacity: 45,
      confidence: 92,
      recommendation: "At capacity - consider express service",
      timeframe: "Next 20 minutes",
    },
    {
      route: "Route 28",
      currentLoad: 12,
      predictedLoad: 18,
      capacity: 55,
      confidence: 78,
      recommendation: "Normal service adequate",
      timeframe: "Next 45 minutes",
    },
  ])

  // Simulate AI predictions updating
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions((prev) =>
        prev.map((prediction) => ({
          ...prediction,
          predictedLoad: Math.max(
            0,
            Math.min(prediction.capacity, prediction.predictedLoad + Math.floor(Math.random() * 6) - 3),
          ),
          confidence: Math.max(70, Math.min(95, prediction.confidence + Math.floor(Math.random() * 6) - 3)),
        })),
      )
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const getLoadColor = (load: number, capacity: number) => {
    const percentage = (load / capacity) * 100
    if (percentage < 50) return "text-chart-1"
    if (percentage < 80) return "text-chart-3"
    return "text-chart-4"
  }

  const getRecommendationBadge = (recommendation: string) => {
    if (recommendation.includes("additional")) {
      return <Badge className="bg-chart-3/20 text-chart-3 border-chart-3/30">Action Needed</Badge>
    }
    if (recommendation.includes("capacity")) {
      return <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">Critical</Badge>
    }
    return <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">Normal</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary" />
          AI Crowd Prediction
        </CardTitle>
        <p className="text-sm text-muted-foreground">Machine learning-powered passenger load forecasting</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{prediction.route}</h4>
                {getRecommendationBadge(prediction.recommendation)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Load</p>
                  <p className={`text-lg font-bold ${getLoadColor(prediction.currentLoad, prediction.capacity)}`}>
                    {prediction.currentLoad}/{prediction.capacity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Predicted Load</p>
                  <p className={`text-lg font-bold ${getLoadColor(prediction.predictedLoad, prediction.capacity)}`}>
                    {prediction.predictedLoad}/{prediction.capacity}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Prediction Confidence</span>
                  <span className="text-sm font-medium">{prediction.confidence}%</span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">AI Recommendation</p>
                    <p className="text-xs text-muted-foreground">{prediction.recommendation}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {prediction.timeframe}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
