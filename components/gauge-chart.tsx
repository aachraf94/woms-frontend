"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface GaugeChartProps {
  value: number
  min?: number
  max?: number
  title: string
  description?: string
  unit?: string
  colorScheme?: "default" | "success" | "warning" | "danger"
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  animated?: boolean
}

export default function GaugeChart({
  value,
  min = 0,
  max = 100,
  title,
  description,
  unit = "%",
  colorScheme = "default",
  size = "md",
  showValue = true,
  animated = true,
}: GaugeChartProps) {
  const [currentValue, setCurrentValue] = useState(0)

  // Normaliser la valeur entre 0 et 100
  const normalizedValue = ((value - min) / (max - min)) * 100

  // Déterminer la couleur en fonction du schéma de couleur
  const getColor = () => {
    if (colorScheme === "success") return "#10B981"
    if (colorScheme === "warning") return "#F59E0B"
    if (colorScheme === "danger") return "#EF4444"
    return "#ED8D31" // default
  }

  // Déterminer la taille
  const getSize = () => {
    if (size === "sm") return 120
    if (size === "lg") return 200
    return 160 // md
  }

  // Animation de la valeur
  useEffect(() => {
    if (!animated) {
      setCurrentValue(normalizedValue)
      return
    }

    const timer = setTimeout(() => {
      if (currentValue < normalizedValue) {
        setCurrentValue((prev) => Math.min(prev + 1, normalizedValue))
      }
    }, 10)

    return () => clearTimeout(timer)
  }, [currentValue, normalizedValue, animated])

  // Calculer les coordonnées de l'arc
  const radius = getSize() / 2 - 10
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (currentValue / 100) * circumference * 0.75
  const startAngle = -135
  const endAngle = 135

  // Calculer les points de l'arc
  const startX = getSize() / 2 + radius * Math.cos((startAngle * Math.PI) / 180)
  const startY = getSize() / 2 + radius * Math.sin((startAngle * Math.PI) / 180)
  const endX = getSize() / 2 + radius * Math.cos((endAngle * Math.PI) / 180)
  const endY = getSize() / 2 + radius * Math.sin((endAngle * Math.PI) / 180)

  // Créer le chemin d'arc
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1
  const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div style={{ width: getSize(), height: getSize() }} className="relative">
          {/* Fond de la jauge */}
          <svg width="100%" height="100%" viewBox={`0 0 ${getSize()} ${getSize()}`}>
            <path d={pathData} fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
            {/* Arc de valeur */}
            <path
              d={pathData}
              fill="none"
              stroke={getColor()}
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={circumference * 0.75}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(${startAngle}, ${getSize() / 2}, ${getSize() / 2})`}
            />
          </svg>

          {/* Valeur au centre */}
          {showValue && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
