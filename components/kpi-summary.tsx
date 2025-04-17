"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUpIcon, TrendingDownIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"

interface KpiSummaryProps {
  kpis: {
    title: string
    value: string | number
    previousValue?: string | number
    change?: number
    status?: "positive" | "negative" | "neutral" | "warning"
    unit?: string
  }[]
}

export default function KpiSummary({ kpis }: KpiSummaryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      case "warning":
        return "text-amber-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "positive":
        return <TrendingUpIcon className="h-4 w-4 mr-1" />
      case "negative":
        return <TrendingDownIcon className="h-4 w-4 mr-1" />
      case "warning":
        return <AlertTriangleIcon className="h-4 w-4 mr-1" />
      default:
        return <CheckCircleIcon className="h-4 w-4 mr-1" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800">Positif</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800">Négatif</Badge>
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Attention</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Stable</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résumé des KPIs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-medium text-gray-500">{kpi.title}</div>
                {kpi.status && getStatusBadge(kpi.status)}
              </div>
              <div className="text-2xl font-bold mb-1">
                {kpi.value}
                {kpi.unit && <span className="text-sm font-normal ml-1">{kpi.unit}</span>}
              </div>
              {kpi.change !== undefined && (
                <div className={`flex items-center text-sm ${getStatusColor(kpi.status || "neutral")}`}>
                  {kpi.status && getStatusIcon(kpi.status)}
                  <span>
                    {kpi.change > 0 ? "+" : ""}
                    {kpi.change}
                    {kpi.unit && kpi.unit}
                    {kpi.previousValue && ` (vs ${kpi.previousValue}${kpi.unit || ""})`}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
